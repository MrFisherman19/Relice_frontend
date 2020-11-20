<template>
    <div @click="mapClicked" class="map" :id='id' style="height: 2400px; width: 1000px; border: 1px solid #990033;" 
      :style="{'zoom':`${zoom}`,'background-size':`${currentGridSize}px ${currentGridSize}px`, 'background-color':selectedColor }">
          <vue-draggable-resizable class="draggableComponent" v-for="(item,index) in items" :key="index" :id="item.id"
           :style="styleItem(item)"
           @activated="updateCurrentItemInfo(item) && on"  
           :min-width="1"
           :min-height="1"
           :active="item.active"
           :w="item.assetMapDetails.dimensions.width"
           :h="item.assetMapDetails.dimensions.height"
           :x="item.localization.coordinates.xaxis" 
           :y="item.localization.coordinates.yaxis"
           :z="item.localization.coordinates.zaxis"
           @dragstop="onDragStop" 
           @resizestop="onResizeStop" 
           :parent="true"
           :draggable="movable"
           :resizable="movable">
          
           <span v-if="showLetters" v-on="on" style="display:block; height:100%" class="white--text">{{item.assetType.charAt(0)}}</span>
           <v-tooltip right>
               <template v-slot:activator="{ on }">
                    <span v-if="showDots" v-on="on" style="display:block; height:100%" @click="pickItemToRelocation" @dblclick="removeItemConnection"></span>
               </template>
               <span>
                    <v-icon class="white--text mb-0">mdi-map-marker</v-icon>Planned localization:<br><hr>
                        Building: {{ getBuildingName(item.localization.floor_planned) }}<br>
                        Floor: {{ getFloorName(item.localization.floor_planned) }}<br>
                    <v-icon class="white--text mb-0">mdi-map-marker</v-icon>Previous localization:<br><hr>
                        Building: {{ getBuildingName(item.localization.floor_previous) }}<br>
                        Floor: {{ getFloorName(item.localization.floor_previous) }}<br>
                    <v-icon class="white--text mb-0">mdi-note-outline</v-icon>Additional note:<br><hr>
                    {{ item.additionalNote }}
                </span>
           </v-tooltip>
          </vue-draggable-resizable>
      </div>
</template>
<script>
import api from '../Api.js'
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
    props:["id","items","currentGridSize","selectedColor","zoom","saveDisableStatus","showLetters","showDots","movable"],
    name: "Map",
    components: {
        VueDraggableResizable
    },
    data:()=>({
        itemsToUpdate:[],
        currentItem: {
            id: 0,
            localization: {
                coordinates:{
                    xaxis: 0,
                    yaxis: 0,
                    zaxis: 0,
                },
                coordinates_planned:{
                    xaxis: 0,
                    yaxis: 0,
                    zaxis: 0,
                }
            },
            assetMapDetails: {
            dimensions: {
                width: 1,
                height: 1
            },
            color: {
                hexColor:''
            }
            },
        },
    }),
    mounted() {
        if (this.$route.params.assetId != null) {
            api.getAssetById(this.$route.params.assetId).then(response=>{
                this.currentItem = response;
                var item = this.items.find(x => x.id == this.$route.params.assetId);

                item.active = true;
                
                this.items.splice(this.items.indexOf(item), 1);
                this.items.push(item);
            });
            var elem = document.getElementById(this.$route.params.assetId);
            elem.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
    },
    methods: {
        pickItemToRelocation() {
            var tempItem = JSON.parse(JSON.stringify(this.currentItem));
            this.$emit('currentItem', tempItem);
        },
        onResizeStop: function (x, y, width, height) {
            let item = this.items.find(x => x.id == this.currentItem.id);
            item.localization.coordinates.xaxis = x;
            item.localization.coordinates.yaxis = y;
            item.assetMapDetails.dimensions.width = width;
            item.assetMapDetails.dimensions.height = height;
        },
        onDragStop: function (x, y) {
            let item = this.items.find(x => x.id == this.currentItem.id);
            item.localization.coordinates.xaxis = x;
            item.localization.coordinates.yaxis = y;
        },
        updateCurrentItemInfo(item) {
            if (this.saveDisableStatus == true) {
                this.$emit('update:disableSave', false);
                this.itemsToUpdate = [];
            }

            this.currentItem = item;
            this.$emit('update:currentItem', this.currentItem);
            this.itemsToUpdate.push(this.currentItem);
            this.$emit('update:itemsToUpdate', this.itemsToUpdate);
        },
        removeItemConnection() {
            this.$emit('removeItemConnection', this.currentItem);
        },
        styleItem:function(item) {
            var color = item.assetMapDetails.color.hexColor;
            var height = item.assetMapDetails.dimensions.height;
            return {
                backgroundColor: `${color}`,
                lineHeight: `${height / 16}`
            };
        },
        mapClicked(item) {
            this.$emit('mapClicked', item);
        },
        getBuildingName:function(item) {
            return item != null ? item.building.name : 'Not defined yet'; 
        },
        getFloorName: function(item) {
            return item != null ? item.name : 'Not defined yet'; 
        }
    },
}
</script>
<style scoped>
.map {
  background-image:
    linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
  background-repeat: repeat;
  border-radius: 5px;
}
.draggableComponent {
  text-align: center;
  vertical-align: center;
}
hr {
    border: none;
    border-top: 1px dashed white;
}
@media print {
  .map {
    position: absolute;
    left: 75px;
  }
}
</style>