<template>  
    <div @mousemove="onMouseMove">
        <v-row justify="end" align="end">
            <v-col cols="10" md="5"> 
                <v-card class="printable">
                    <v-card-title>Map of: 
                        <v-select v-model="floorFrom" color="#990033" :items="this.listOfFloors" class="ma-2 mt-4" :style="{'z-index':`999`}" @change="setAssetsForCurrentFloor($event, assetsField1)">
                            <template slot="item" slot-scope="data">
                            {{ data.item.name }}<span :style="{'color':`#BBBBBB`}">{{ data.item.building.name }}</span>
                            </template>
                            <template slot="selection" slot-scope="data">
                                {{ data.item.name }}<span :style="{'color':`#BBBBBB`}">{{ data.item.building.name }}</span>
                            </template>
                        </v-select>
                    </v-card-title>
                    <v-card-text>
                        <Map id="field1" :zoom="0.59" :currentGridSize="40" :items="assetsField1" :showDots="true" v-on:currentItem="addNewConnection" v-on:removeItemConnection="removeConnection" :movable="false"></Map>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="10" md="5">
                <v-card class="printable">
                    <v-card-title>Map of: 
                        <v-select v-model="floorTo" color="#990033" :items="this.listOfFloors" class="ma-2 mt-4" :style="{'z-index':`999`}" @change="setAssetsForCurrentFloor($event, assetsField2)">
                            <template slot="item" slot-scope="data">
                            {{ data.item.name }}<span :style="{'color':`#BBBBBB`}">{{ data.item.building.name }}</span>
                            </template>
                            <template slot="selection" slot-scope="data">
                                {{ data.item.name }}<span :style="{'color':`#BBBBBB`}">{{ data.item.building.name }}</span>
                            </template>
                        </v-select>
                    </v-card-title>
                    <v-card-text>
                        <Map id="field2" :zoom="0.59" :currentGridSize="40" :items="assetsField2" :showDots="true" v-on:mapClicked="chooseElementPosition" :movable="false"></Map>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div :style="{'position':`absolute`,'width':`100%`,'height':`100%`, 'top':'0', 'pointer-events':`none`, 'z-index':99}"> 
            <svg id="svg" width='100%' height='100%' style="'pointer-events':`none`">
                <defs>
                    <marker id="arrowend" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" >
                        <polygon points="0 0, 10 3.5, 0 7" fill="white" stroke="black"></polygon>
                    </marker>
                    <marker id="arrowstart" viewBox="0 0 16 16" refX="8" refY="8" markerWidth="8" markerHeight="8">
                        <circle cx="8" cy="8" r="6" stroke="black" fill="white"></circle>
                    </marker>
                </defs>
                <line class="line" marker-start="url(#arrowstart)" marker-end="url(#arrowend)" v-for="(line, index) in lines" :key="index" :x1='line.x1' :y1='line.y1' :x2='line.x2' :y2='line.y2' style="stroke:rgb(255,0,0);stroke-width:1"/>
            </svg>
        </div>
    </div>
</template>
<script>
import Map from '../components/Map.vue'
import api from '../Api.js'
export default {
    name: "RelocationViewer",
    components: {
        Map,
    },
    data:()=>({
        listOfFloors:[],
        loading: false,
        lines:[],
        currentLine: '',
        lineInProgress: false,
        currentX: '',
        currentY: '',
        floorFrom:'',
        floorTo:'',
        currentItem: {id: 0, assetConditionState: "GOOD_CONDITION", assetLocationState: "RIGHT_PLACE", localization: {floor: {id: 0}, coordinates: {xaxis: 10,yaxis: 10,zaxis: 10}},assetMapDetails: {dimensions: {width: 100,height: 100},color: {hexColor: '#00FF00'}},},
        assetsField1: [],
        assetsField2: [],
    }),
    mounted() {
        this.getAllFloors();
    },
    watch: {
    // whenever question changes, this function will run
        floorFrom: function () {
           this.showAssetConnections(this.assetsField1);
        },
        floorTo: function () {
           this.showAssetConnections(this.assetsField1);
        }
    },
    methods: {
        setAssetsForCurrentFloor(floor, array) {
            this.loading = true;
            this.lines = [];
            array.splice(0, array.length);
            api.getAssetsForGivenFloor(floor.id).then(data=> {
                for (var i = 0; i < data.length; i++) {
                    array.push(data[i]);
                }
                this.loading = false;
            }).catch(error=> {
                console.log(error);
            });                
        },
        
        getPosition:function(el) {
            var xPos = 0;
            var yPos = 0;
            
            while (el) {
                if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
            
                xPos += (el.offsetLeft - xScroll + el.pageLeft);
                yPos += (el.offsetTop - yScroll + el.pageTop);
                } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                }
            
                el = el.offsetParent;
            }
            return {
                x: xPos,
                y: yPos
            };
        },
        countOffset:function(item) {
            var top = 0, left = 0;
            do {
                top += item.offsetTop  || 0;
                left += item.offsetLeft || 0;
                item = item.offsetParent;
            } while(item);

            return {
                y: top,
                x: left
            };
        },
        showAssetConnections(assets) {
            var currentLines = [];
            var currentFloor = this.floorTo;

            var field1 = document.getElementById('field1');
            var field1Offset = this.countOffset(field1);

            var field2 = document.getElementById('field2');
            var field2Offset = this.countOffset(field2);

            assets.forEach(function(asset) {
                if (asset.localization.coordinates_planned && asset.localization.floor_planned) {
                    if(asset.localization.floor_planned.id === currentFloor.id) {
                        var line = {
                            id: asset.id,
                            x1: field1Offset.x + (asset.localization.coordinates.xaxis + asset.assetMapDetails.dimensions.width / 2) * 0.59 - 10,
                            y1: field1Offset.y + (asset.localization.coordinates.yaxis + asset.assetMapDetails.dimensions.height / 2) * 0.59 - 65,
                            x2: field2Offset.x + (asset.localization.coordinates_planned.xaxis + asset.assetMapDetails.dimensions.width / 2) * 0.59 - 10,
                            y2: field2Offset.y + (asset.localization.coordinates_planned.yaxis + asset.assetMapDetails.dimensions.height / 2) * 0.59 - 65,
                        };
                        currentLines.push(line);
                    }
                }
            });
            this.lines = currentLines.map((x)=>x);  
        },
        getAllFloors() {
            api.getAllFloors().then(data=>{
                this.listOfFloors = data.filter(function(e) {
                    return e.building != null;
                })
            })
        },
        addNewConnection(item) {
            this.currentItem = item;
            
            var field1 = document.getElementById('field1');
            var field1Offset = this.countOffset(field1);

            this.currentLine = { 
                id: this.currentItem.id,
                x1: field1Offset.x + (this.currentItem.localization.coordinates.xaxis + this.currentItem.assetMapDetails.dimensions.width / 2) * 0.59 - 10,
                y1: field1Offset.y + (this.currentItem.localization.coordinates.yaxis + this.currentItem.assetMapDetails.dimensions.height / 2) * 0.59 - 65}
        },
        removeConnection(item) {
            var index = this.lines.findIndex(e => e.id === item.id);
            if (index > -1) {
                this.lines.splice(index,1);
            }
            item.localization.floor_planned = null;
            item.localization.coordinates_planned = null;
            api.updateAsset(item);
        },
        chooseElementPosition() {
            this.currentLine.x2 = this.currentX;
            this.currentLine.y2 = this.currentY - 65;
            this.lines.push(this.currentLine);

            var rect = document.getElementById('field2');
            var obj = this.countOffset(rect);

            this.currentItem.localization.floor_planned = this.floorTo;
            this.currentItem.localization.coordinates_planned = { 
                xaxis: (this.currentX - obj.x) / 0.59 - this.currentItem.assetMapDetails.dimensions.width / 2 + 20, 
                yaxis: (this.currentY - obj.y) / 0.59 - this.currentItem.assetMapDetails.dimensions.height / 2,
                zaxis: this.currentItem.localization.coordinates.zaxis};
            api.addConnection(this.currentItem);
            this.currentLine = '';
            this.currentItem = {};
        },
        onMouseMove(event) {
            this.currentX = event.pageX;
            this.currentY = event.pageY;
        },
    },
}
</script>
<style scoped>
span {
    padding-left: 5px;
}
.line {
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: dash 2s linear forwards;
}
@keyframes dash {
    to {
        stroke-dashoffset: 0;
    }
}
</style>
