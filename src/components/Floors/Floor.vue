<template>        
    <v-row align="center" no-gutters>
        <v-col cols="1" md="1">
            <v-avatar size="60"><v-img :eager="true" :src="require('../../assets/floor2.png')"></v-img></v-avatar>
        </v-col>
        <v-col cols="2" md="2" class="text-center">
            {{ floorProperties.name }}
        </v-col>
        <v-col cols="7" md="7" class="text-center">
            {{ floorProperties.description }}
        </v-col>
        <v-col cols="2" md="2">
            <v-btn icon @click="$emit('shouldshowmappreview')"><v-icon color="green darken-3">mdi-eye</v-icon></v-btn>
            <v-dialog
            persistent
            v-model="updateFloorDialog"
            max-width="500px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="yellow darken-3">mdi-pencil</v-icon>
                </v-btn>
                </template>
                <NewFloorForm :floor="floorProperties" v-on:close="updateFloorDialog = false" v-on:saveFloor="updateFloor" title="Update floor"></NewFloorForm>
            </v-dialog>
            <v-btn icon @click="deleteFloor"><v-icon color="red darken-3">mdi-delete</v-icon></v-btn>
        </v-col>
    </v-row>
</template>
<script>
import api from '../../Api.js'
import NewFloorForm from '../Floors/NewFloorForm.vue'
export default {
    name: 'Floor',
    props:['floorProperties'],
    data:()=>({
        updateFloorDialog: false,
    }),
    components: {
        NewFloorForm
    },
    methods: {
        deleteFloor() { 
            this.$emit('deleteFloor', this.floorProperties);
        },
        updateFloor(floor) {
            api.updateFloor(floor).then(()=>{
                this.updateFloorDialog = false;
            });
        }
    },
}
</script>
