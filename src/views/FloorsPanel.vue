<template>
    <v-container fluid>
        <v-row no-gutters justify="end" align="center">
            <v-col cols="10" md="10">
                <v-row>
                    <v-col cols="12" md="12">
                        <v-dialog
                        persistent
                        v-model="newFloorDialog"
                        max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small
                            v-bind="attrs"
                            v-on="on"
                            color="green darken-3"
                            class="white--text text-capitalize">
                            New floor<v-icon small>mdi-plus</v-icon>
                            </v-btn>
                            </template>
                            <NewFloorForm v-on:close="newFloorDialog = false" v-on:createFloor="createFloor" title="Create floor"></NewFloorForm>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-card v-if="!loading & floors.length != 0" flat>
                            <v-card-title>Floors</v-card-title>
                            <v-divider></v-divider>
                            <v-list>
                                <transition-group name="slide-fade" mode="out-in">
                                    <v-list-item v-for="floor in floors" :key="floor.id">
                                        <v-list-item-content> 
                                            <Floor v-on:deleteFloor="deleteFloor" v-on:shouldshowmappreview='$router.push("/mapViewer/" + floor.id)' :floorProperties="floor"></Floor>
                                        </v-list-item-content>
                                    </v-list-item>
                                </transition-group>
                            </v-list>
                        </v-card>
                        <v-card v-else-if="floors.length == 0 && loading == false">
                            <v-card-text class="text-center">
                                There are no defined floors for this building. Feel free to create a new one!
                            </v-card-text>
                        </v-card>
                        <ProgressCircle v-else></ProgressCircle>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-snackbar v-model="errorSnackbar">{{ errorMessage }}
                <template v-slot:action = "{ attrs }">
                    <v-btn
                        text
                        v-bind="attrs"
                        color="red darken-3"
                        @click="errorSnackbar = false">
                        <v-icon color="red darken-3">
                            mdi-close
                        </v-icon>
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
    </v-container>
</template>
<script>
import api from '../Api.js'
import Floor from '../components/Floors/Floor.vue'
import ProgressCircle from '../components/ProgressCircle.vue'
import NewFloorForm from '../components/NewFloorForm.vue'
export default {
    components: {
        Floor,
        ProgressCircle,
        NewFloorForm
    },
    data:() => ({
        errorSnackbar: false,
        errorMessage: '',
        floors: [],
        id: 0,
        loading:true,
        newFloorDialog: false
    }),
    mounted:function() {
        this.loading = true,
        this.loadFloorsForBuilding();
    },
    methods: {
        loadFloorsForBuilding() {
            this.id = this.$route.params.id;
            api.getAllFloorsByBuilding(this.id).then(data=>{
                this.floors = data;
                this.loading = false;
            })
        },
        createFloor(floor) {
          floor.building.id = this.$route.params.id;
          api.createFloor(floor)
          .then(data=>{
              floor.id = data;
              this.floors.push(floor);
          });
          this.newFloorDialog = false;
        },
        deleteFloor(floor) {
            var indexInFloors = this.floors.indexOf(floor);
            confirm('Are you sure that you want to delete floor with id ' + floor.id + ' ?') 
            && api.deleteFloor(floor.id)
            .then(()=>{this.floors.splice(indexInFloors, 1)})
            .catch(error=>{
                this.errorMessage = error.response.data.message;
                this.errorSnackbar = true;
            })
        }
    }
}
</script>