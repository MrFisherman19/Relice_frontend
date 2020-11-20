<template>
    <v-container>
        <v-row v-if="!loading" no-gutters justify="end" align="center">
            <v-col cols="10" md="11">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-dialog
                        persistent
                        v-model="newBuildingDialog"
                        max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small
                            v-bind="attrs"
                            v-on="on"
                            color="green darken-3"
                            class="white--text text-capitalize">
                            New building<v-icon small>mdi-plus</v-icon>
                            </v-btn>
                            </template>
                            <NewBuildingForm v-on:close="newBuildingDialog = false" v-on:createBuilding="createBuilding" title="Create building"></NewBuildingForm>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" v-for="building in listOfBuildings" :key="building.id">
                        <v-lazy :options="{threshold:0.5}" transition="fade-transition">
                        <Building :buildingProperties='building' v-on:deleteBuilding="deleteBuilding"></Building>
                        </v-lazy>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <ProgressCircle v-else></ProgressCircle>
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
import api from '../Api.js';
import Building from '../components/Buildings/Building.vue'
import ProgressCircle from '../components/ProgressCircle.vue'
import NewBuildingForm from '../components/Buildings/NewBuildingForm.vue'
export default {
    name: 'BuildingPanel.vue',
    components: {
        Building,
        ProgressCircle,
        NewBuildingForm
    },
    data: () => ({
        errorSnackbar: false,
        errorMessage: '',
        listOfBuildings: [],
        loading: true,
        newBuildingDialog: false
    }),
    mounted:function() {
        this.getAllBuildings();
    },
    methods: {
      getAllBuildings() {
        api.getAllBuildings()
        .then(data=> {
          this.listOfBuildings = data;
          this.loading = false;
        });
      },
      createBuilding(building) {
          api.createBuilding(building)
          .then(data=>{
              building.id = data;
              this.listOfBuildings.push(building);
          });
          this.newBuildingDialog = false;
      },
      deleteBuilding(building) {
        var indexOfBuilding = this.listOfBuildings.indexOf(building);
        confirm('Are you sure that you want to delete building with id ' + building.id + ' ?') 
        && api.deleteBuilding(building.id)
        .then(()=>{this.listOfBuildings.splice(indexOfBuilding, 1)})
        .catch(error=>{
            this.errorMessage = error.response.data.message;
            this.errorSnackbar = true;
        })
      }
    },
}
</script>