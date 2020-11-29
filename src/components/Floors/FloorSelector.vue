<template>
    <v-select v-model="currentFloor" :dense="dense" :label="label" :color="color" :items="this.listOfFloors" :style="{'z-index':`999`}" @change="chooseFloor">
        <template slot="item" slot-scope="data">
           {{ data.item.name }}<span :style="{'color':`#BBBBBB`}">{{ data.item.building.name }}</span>
        </template>
        <template slot="selection" slot-scope="data">
            {{ data.item.name }}<span :style="{'color':`#BBBBBB`}">{{ data.item.building.name }}</span>
        </template>
    </v-select>
</template>
<script>
import api from '../../Api.js'
export default {
    name: 'FloorSelector',
    props: ["dense", "color", "label"],
    data:() => ({
        currentFloor: {},
        listOfFloors: []
    }),
    methods: {
        chooseFloor(item) {
            this.$emit('choosenFloor', item);
        },
        loadFloors() {
            api.getAllFloors().then(data=>{
                this.listOfFloors = data.filter(function(e) {
                    return e.building != null;
                });
                if (this.listOfFloors.length != 0) {
                    this.currentFloor = this.listOfFloors[0];
                }
                this.$emit('choosenFloor', this.currentFloor);
            })
        }
    },
    mounted() {
        this.loadFloors();
    }
}
</script>
<style scoped>
span {
    padding-left: 5px;
}
</style>