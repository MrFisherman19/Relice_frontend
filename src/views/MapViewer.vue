<template>
<div>
  <v-container fluid v-if="!loading">
    <v-row justify="end" align="end" dense>
      <v-col cols="10" md="2">
        <v-card class="pb-4">
          <v-card-title>Map of: {{ this.currentFloor.name }}
            <v-progress-circular :size="16" width="2" class="ma-2" v-show="saving" :indeterminate="saving" color="#990033"></v-progress-circular>
          </v-card-title>
          <v-card-subtitle>Current items: {{ items.length }}</v-card-subtitle>
          <v-card-text>
            <v-btn block @click="saveMap" :disabled="disableSave" class="white--text text-capitalize" color="blue darken-3" small>Save map<v-icon small>mdi-content-save</v-icon></v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" md="8">
        <v-card class="nonPrintable" >
          <v-card-title>Item info: {{ currentItem.name }}</v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12" md="2">
                  Item id: {{ currentItem.id }}
                </v-col>
                <v-col cols="12" md="4">
                  Condition state: {{ currentItem.assetConditionState }}
                </v-col>
                <v-col cols="12" md="2">
                  X: {{ currentItem.localization.coordinates.xaxis }} Y:{{ currentItem.localization.coordinates.yaxis }}
                </v-col>
                <v-col cols="12" md="4">
                  Color on map (HEX):  
                  <v-dialog
                    v-model="itemColorDialog"
                    max-width="300px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn x-small
                        v-bind="attrs"
                        v-on="on"
                        :color="getCurrentColor()"
                        class="white--text text-capitalize mb-3 mr-2 mt-2">
                        {{getCurrentColor()}}
                        </v-btn>
                      </template>
                    <v-card>
                      <v-card-title>Select item color</v-card-title>
                      <v-card-text class="text-center">
                        <v-color-picker
                            v-model="currentItem.assetMapDetails.color.hexColor"
                            dot-size="20"
                            mode="hexa"
                            show-swatches
                            swatches-max-height="95">
                        </v-color-picker>
                      </v-card-text>
                    </v-card>
                </v-dialog>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" md="2">
                  Type: {{ currentItem.assetType }}
                </v-col>
                <v-col cols="12" md="4">
                  Location state: {{ currentItem.assetLocationState }}
                  <v-tooltip right z-index="9999">
                    <template v-slot:activator="{ on }">
                        <v-icon
                            small
                            class="mb-1"
                            color="blue darken-3"
                            v-on="on">
                            mdi-information-outline
                        </v-icon>   
                    </template>
                    <TooltipContent :item="currentItem" :note="true"></TooltipContent>
                  </v-tooltip>
                </v-col>
                <v-col cols="12" md="2">
                  Width: {{ currentItem.assetMapDetails.dimensions.width }} Height {{ currentItem.assetMapDetails.dimensions.height }}
                </v-col >
                <v-col cols="12" md="4">
                  <v-card outlined class="stick pt-1">
                  <v-btn x-small
                  :disabled="items.length === 0"
                  color="blue darken-3"
                  @click="rotateCurrentItem"
                  class="white--text text-capitalize mb-1 mr-2 ml-2">
                  <v-icon x-small>mdi-refresh</v-icon>
                  </v-btn>
                  <v-btn x-small
                    :disabled="items.length === 0"
                    @click="duplicateItem"
                    class="white--text text-capitalize mb-1 mr-2"
                    color="pink darken-2">
                    <v-icon x-small>mdi-content-copy</v-icon>
                  </v-btn>
                  <v-dialog
                      persistent
                      v-model="updateDialog"
                      max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn x-small
                          :disabled="items.length === 0"
                          v-bind="attrs"
                          v-on="on"
                          color="yellow darken-3"
                          class="white--text text-capitalize mb-1 mr-2"
                          >
                          Update<v-icon x-small>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                    <UpdateAssetForm v-on:close="updateDialog = false" v-on:updateItem="updateItem" title="Update asset" :editedItem="currentItem"></UpdateAssetForm>
                  </v-dialog>
                  <v-btn x-small
                    :disabled="items.length === 0"
                    color="red darken-3"
                    class="white--text text-capitalize mb-1 mr-2"
                    @click="deleteCurrentItem()">
                    Delete<v-icon x-small>mdi-delete</v-icon>
                  </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row> 
    <v-row justify="end">
      <v-col cols="10" md="2">
        <v-card id="lol" class="nonPrintable mb-2">
          <v-card-title>Configuration</v-card-title>
          <v-card-text>
            <v-dialog
                v-model="backgroundColorDialog"
                max-width="300px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn block
                    v-bind="attrs"
                    v-on="on"
                    color="#990033"
                    class="white--text text-capitalize mb-3 mr-2"
                    small>
                    Background
                    </v-btn>
                  </template>
                 <v-card>
                   <v-card-title>Select background color</v-card-title>
                   <v-card-text class="text-center">
                     <v-color-picker
                        v-model="selectedColor"
                        dot-size="20"
                        mode="hexa"
                        show-swatches
                        swatches-max-height="95">
                     </v-color-picker>
                   </v-card-text>
                 </v-card>
            </v-dialog>
            <v-select 
              v-model="currentGridSize"
              :items="gridSizes"
              color="#990033"
              dense
              solo
              label="Grid size">
            </v-select>
            <v-slider
              label="Size"
              color="#990033"
              track-color="#990033"
              thumb-label
              v-model="mapZoom"
              max=100
              min=45>
            </v-slider>
            <v-switch
              v-model="showLetters"
              label="Show assets letters"
              color="#990033"
              inset>
            </v-switch>
          </v-card-text>
        </v-card>
        <v-card class="nonPrintable mb-2">
          <v-card-title>New item</v-card-title>
          <v-card-text>
            <v-dialog
                persistent
                v-model="newItemDialog"
                max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn block small
                    v-bind="attrs"
                    v-on="on"
                    color="green darken-3"
                    class="white--text text-capitalize mb-3 mr-2"
                    >
                    New item<v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </template>
              <AssetForm v-on:close="close()" v-on:saveItem="save" title="Create new asset" :editedItem="editedItem"></AssetForm>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" md="8" class="pa-0 pt-3">
        <Map
        :items="items" 
        :itemsToUpdate.sync="itemsToUpdate" 
        :showLetters="showLetters" 
        :saveDisableStatus="disableSave" 
        :disableSave.sync="disableSave" 
        :currentItem.sync="currentItem" 
        :zoom="mapZoom/100" 
        :currentGridSize="currentGridSize" 
        :selectedColor="selectedColor"></Map>
      </v-col>
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
    </v-row>
  </v-container>
  <v-container v-else fluid> 
    <ProgressCircle></ProgressCircle>
  </v-container> 
  </div>
</template>
<script>
import Map from '../components/Floors/Map.vue'
import ProgressCircle from '../components/ProgressCircle.vue'
import api from '../Api.js'
import AssetForm from '../components/Assets/AssetForm.vue'
import UpdateAssetForm from '../components/Assets/UpdateAssetForm.vue'
import TooltipContent from '../components/Floors/TooltipContent.vue'
export default {
  name: "MapViewer",
  components: {
    Map,
    ProgressCircle,
    AssetForm,
    UpdateAssetForm,
    TooltipContent
  },
  data: function () {
    return {
      currentFloorId: 0,
      currentItem: {
        id: 0,
        localization: {
          coordinates: {
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
            hexColor: '#FFFFFF'
          }
        },
      },
      currentFloor:{},
      defaultItem: {id: 0, assetConditionState: "GOOD_CONDITION", assetLocationState: "RIGHT_PLACE", localization: {floor: {id: 0}, coordinates:{xaxis: 10,yaxis: 10,zaxis: 10}, coordinates_planned:{xaxis:0, yaxis:0, zaxis: 0}},assetMapDetails: {dimensions: {width: 100, height: 100},color: {hexColor: '#00FF00'}},},
      editedItem: {id: 0, assetConditionState: "GOOD_CONDITION", assetLocationState: "RIGHT_PLACE", localization: {floor: {id: 0}, coordinates: {xaxis: 10,yaxis: 10,zaxis: 10}, coordinates_planned:{xaxis:0, yaxis:0, zaxis: 0}},assetMapDetails: {dimensions: {width: 100,height: 100},color: {hexColor: '#00FF00'}},},
      items:[],
      itemsToUpdate:[],
      gridSizes:[0, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 200],
      currentGridSize: 40,
      loading: true,
      backgroundColorDialog: false,
      itemColorDialog: false,
      selectedColor: '#FFFFFF',
      disableSave: true,
      mapZoom: 100,
      saving: false,
      showLetters: true,
      errorMessage:'',
      errorSnackbar:false,
      updateDialog: false,
      newItemDialog: false,
    }
  },
  created() {
    this.currentFloorId = this.$route.params.id;

    api.getFloorById(this.currentFloorId).then(response=>{
      this.currentFloor = response;
    }).catch(error=>{
        this.items.pop();
        this.errorMessage = error.response.data.message;
        this.errorSnackbar = true;
    });
    this.defaultItem.localization.floor.id = this.currentFloorId;
    this.editedItem.localization.floor.id = this.currentFloorId;
  },
  methods: {
    close() {
        this.newItemDialog = false;
        this.updateDialog = false;
        this.$nextTick(()=>{
          this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
      });
    },
    duplicateItem() {
      var duplicated = JSON.parse(JSON.stringify(this.currentItem));
      duplicated.localization.coordinates.xaxis = this.currentItem.localization.coordinates.xaxis + 10;
      duplicated.localization.coordinates.yaxis = this.currentItem.localization.coordinates.yaxis + 10;
      this.saveItem(duplicated);
      this.currentItem = duplicated;
    },
    saveItem(item) {
      item.id = '';
      var index = this.items.push(item) - 1;
      api.createAsset(item).then(response=>{
        this.items[index].id = response;
      })
      .catch(error=>{
          this.items.pop();
          this.errorMessage = error.response.data.message;
          this.errorSnackbar = true;
      });
    },
    save(amount) {
      if (amount == 1) {
        this.saveItem(this.editedItem);
      } else if (amount > 1) {
        var indexArray = [];
        for (var i = 0; i < amount; i++) {
          var item = JSON.parse(JSON.stringify(this.editedItem));
          indexArray.push(this.items.push(item) - 1);
        }
        api.createMultiplyAssets(this.editedItem, amount).then(response=>{
          for (var a = 0; a < indexArray.length; a++) {
             this.items[indexArray[a]].id = response[a];
             console.log(this.items[indexArray[a]].id)
          }
        }).catch(error=>{
          this.items.splice(this.items.length - amount);
          this.errorMessage = error.response.data.message;
          this.errorSnackbar = true;
        });
      }   
          
      this.close();
    },
    updateItem(item) {
      this.itemsToUpdate.push(item);
      this.updateDialog = false;
      this.disableSave = false;
    },
    getCurrentColor() {
      return this.currentItem.assetMapDetails.color.hexColor;
    },
    getAssetsForCurrentFloor() {
      this.loading = true;
      this.items = [];
        api.getAssetsForGivenFloor(this.currentFloorId).then(data=> {
            this.items = data;
            this.loading = false;
        }).catch(error=> {
            console.log(error);
      });
    },
    deleteCurrentItem() {
      const indexInItemList = this.items.indexOf(this.currentItem);
      const indexInUpdateList = this.itemsToUpdate.indexOf(this.currentItem);
      confirm('Are you sure that you want to delete item with name ' + this.currentItem.name + ' ?') 
        && api.deleteAsset(this.currentItem.id).then(response=>{
          if (response.status != 403) {
            this.items.splice(indexInItemList, 1);
            this.itemsToUpdate.splice(indexInUpdateList, 1);
          }
        }).catch(error=>{
            this.errorMessage = error.response.data.message;
            this.errorSnackbar = true;
        })
    },
    rotateCurrentItem() {
      let tempValue = this.currentItem.assetMapDetails.dimensions.width;
      this.currentItem.assetMapDetails.dimensions.width = this.currentItem.assetMapDetails.dimensions.height;
      this.currentItem.assetMapDetails.dimensions.height = tempValue; 
    },
    saveMap() { 
      this.saving = true;
      this.disableSave = true;
      api.updateAssets(this.itemsToUpdate).then(()=>{this.itemsToUpdate = []; this.saving = false;})
      .catch(error=>{
        this.errorMessage = error.response.data.message;
        this.errorSnackbar = true;
        return;
      })
    },
  },
  mounted() {
    this.getAssetsForCurrentFloor();

    this.interval1 = setInterval(()=>{
      if (this.disableSave == false) {
        this.saveMap();
      }
    }, 60000)
  },
}
</script>
<style scoped>
.stick {
  position: fixed;
  z-index: 1000;
}
@media print {
  .nonPrintable {
    display: none;
  }
}
</style>