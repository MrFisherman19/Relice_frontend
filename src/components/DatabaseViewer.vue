<template>
    <v-container fluid>
        <v-row no-gutters justify="end" align="center">
            <v-col cols="10" md="10">
                <v-card>
                    <v-card-title>
                        Asset Database
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            label="Search"
                            append-icon="mdi-magnify"
                            single-line
                            hide-details
                            color="#990033">
                        </v-text-field>
                    </v-card-title>
                    <v-data-table
                        v-model="selectedAssets" 
                        :headers="headers"
                        :items="assetList"
                        :items-per-page="10"
                        :search="search"
                        :dense="isDense"
                        item-key="id"
                        multi-sort
                        show-select>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon
                                small
                                class="ma-2"
                                color="green darken-3"
                                @click="$router.push('/mapViewer/' + item.localization.floor.id + '/' + item.id)">
                                mdi-eye
                            </v-icon>
                            <v-icon
                                small
                                class="ma-2"
                                color="yellow darken-3"
                                @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                class="ma-2"
                                color="red darken-3"
                                @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:top>
                            <v-dialog
                                v-model="dialog"
                                max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        color="#009933"
                                        class="ml-2 mb-2 text-capitalize white--text"
                                        small>
                                        New asset
                                        <v-icon small>mdi-database-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>{{ editedTitle }}</v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-text-field v-model="editedItem.name" label="Name of asset" dense color="#990033"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-select v-model="editedItem.assetType" :rules="[rules.required]" :items="assetTypes" label="Type" dense color="#990033"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-text-field v-model="editedItem.additionalNote" label="Additional note" dense color="#990033"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-select v-model="editedItem.assetConditionState" :rules="[rules.required]" :items="conditionStates" label="Condition state" dense color="#990033"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <FloorSelector v-on:choosenFloor="chooseFloor" label="Floor" :dense='true' color="#990033"></FloorSelector>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-select v-model="editedItem.assetLocationState" :rules="[rules.required]" :items="locationStates" label="Location state" dense color="#990033"></v-select>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn icon><v-icon color="gray darken-3" @click="close">mdi-close</v-icon></v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn icon><v-icon color="green darken-3" @click="save">mdi-content-save</v-icon></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-btn 
                                @click="downloadBarcodesFile"
                                :disabled="selectedAssets.length == 0"
                                color="#990033"
                                class="ml-2 mb-2 text-capitalize white--text"
                                small>
                                Barcodes ({{ selectedAssets.length }})
                                <v-icon small>mdi-download</v-icon>
                            </v-btn>
                            <v-btn @click="relocateSelected" :disabled="selectedAssets.length == 0" color="green" class="ml-2 mb-2 text-capitalize white--text" small>
                                Mark as relocated
                                <v-icon small>
                                    mdi-check
                                </v-icon>
                            </v-btn>
                            <v-btn @click="deleteSelected" :disabled="selectedAssets.length == 0" color="red darken-3" class="ml-2 mb-2 text-capitalize white--text" small>
                                Delete selected
                                <v-icon small>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:footer>
                            <v-switch v-model="isDense" label="Dense" class="pa-3" color="#990033"></v-switch>
                        </template>
                        <template v-slot:[`item.data-table-select`] = "{ isSelected, select }">
                            <v-simple-checkbox
                                :value="isSelected"
                                @input="select($event)"
                                color = "#990033"
                                :ripple = "false">
                            </v-simple-checkbox>
                        </template>
                        <template v-slot:[`item.assetConditionState`] = "{ item }">
                            <span v-if='item.assetConditionState==="BROKEN"' class="red--text">{{item.assetConditionState}}</span>
                            <span v-if='item.assetConditionState==="GOOD_CONDITION"' class="green--text">{{item.assetConditionState}}</span>
                            <span v-if='item.assetConditionState==="TO_BE_FIXED"' class="orange--text">{{item.assetConditionState}}</span>
                            <span v-if='item.assetConditionState==="TO_BE_THROWN_AWAY"' class="black--text">{{item.assetConditionState}}</span>
                        </template>
                        <template v-slot:[`item.assetLocationState`] = "{ item }" >
                            <span v-if='item.assetLocationState==="TO_RELOCATION"' class="red--text">{{item.assetLocationState}}</span>
                            <span v-if='item.assetLocationState==="RIGHT_PLACE"' class="green--text">{{item.assetLocationState}}</span>
                            <span v-if='item.assetLocationState==="TEMPORARY_PLACE"' class="orange--text">{{item.assetLocationState}}</span>
                            <v-tooltip right>    
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        small
                                        class="ma-2"
                                        color="blue darken-3"
                                        v-on="on">
                                        mdi-information-outline
                                    </v-icon>   
                                </template>
                                <TooltipContent :item="item" :note="false"></TooltipContent>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import api from '../Api.js'
import FloorSelector from '../components/FloorSelector.vue'
import TooltipContent from '../components/TooltipContent.vue'
export default {
    name: 'DatabaseViewer',
    components: {
        FloorSelector,
        TooltipContent
    },
    data:()=>({
        headers:[
            { text: 'Barcode', sortable: true, align:'start', value: 'barcode'},
            { text: 'Name', sortable: true, value: 'name'},
            { text: 'Type', sortable: true, value: 'assetType'},
            { text: 'Additional note', sortable: false, value: 'additionalNote'},
            { text: 'Condition state', sortable: true, value: 'assetConditionState'},
            { text: 'Location state', sortable: true, value: 'assetLocationState'},
            { text: 'Building', sortable: true, value: 'localization.floor.building.name'},
            { text: 'Floor', sortable: true, value: 'localization.floor.name'},
            { text: 'Actions', sortable: false, align:'center', value: 'actions'},
        ],
        assetList:[],
        selectedAssets:[],
        conditionStates:[],
        locationStates:[],
        assetTypes:[],
        allFloors:[],
        editedItem: {
            id:'',
            additionalNote: '',
            assetConditionState: '',
            assetLocationState: '',
            assetType:'',
            localization: {
                floor: {},
                coordinates:{
                    xaxis: 0,
                    yaxis: 0,
                    zaxis: 0,
                },
                floor_planned: {},
                coordinates_planned: {
                    xaxis: 0,
                    yaxis: 0,
                    zaxis: 0,
                }
            },
            assetMapDetails: {
            dimensions: {
                width: 100,
                height: 100,
                depth: 1
            },
            color: {
                hexColor:'#00FF00'
            }
        }
        },
        defaultItem: {
            id:'',
            additionalNote: '',
            assetConditionState: '',
            assetLocationState: '',
            assetType:'',
            localization: {
                floor: {},
                coordinates:{
                    xaxis: 0,
                    yaxis: 0,
                    zaxis: 0,
                },
                floor_planned: {},
                coordinates_planned: {
                    xaxis: 0,
                    yaxis: 0,
                    zaxis: 0,
                }
            },
            assetMapDetails: {
            dimensions: {
                width: 100,
                height: 100,
                depth: 1
            },
            color: {
                hexColor:'#00FF00'
            }
            }
        },
        editedIndex: -1,
        search:'',
        dialog:false,
        isDense:true,
        errorSnackbar:false,
        errorMessage:'',
        rules: {
            required: value => !!value || 'Required.'
        }
    }),
    mounted() {
        this.getAllFloors();
        this.setAllSelectableOptions();
        this.getAllAssets();
    },
    computed: {
        editedTitle() {
            return this.editedIndex === -1 ? 'New asset' : 'Edit asset';
        }
    },
    methods: {
      setAllSelectableOptions() {
          this.assetTypes = JSON.parse(window.localStorage.getItem('assetTypes'));
          this.conditionStates = JSON.parse(window.localStorage.getItem('assetConditionStates'));
          this.locationStates = JSON.parse(window.localStorage.getItem('assetLocationStates'));
      },
      getAllAssets() {
        api.getAllAssets().then(data=> {
            this.assetList = data;
        }).catch(error=> {
            console.log(error);
        });
      },
      getAllFloors() {
        api.getAllFloors().then(data=>{
            this.allFloors = data.filter(function(e) {
                return e.building != null;
            })
        })
      },
      downloadBarcodesFile() {        
        let barcodeTexts = this.selectedAssets.map(item => {
            return item.barcode;
        });
        api.generateBarcodesPdf(JSON.stringify({ barcodeTexts: barcodeTexts }))
        .then(data => {
                let blob = new Blob([data], { type: 'application/pdf' });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'barcodes.pdf';
                link.click();
            }).catch(error=>{
                console.log(error);
            })
        },
      close() {
          this.dialog = false;
          this.$nextTick(()=>{
              this.editedItem = Object.assign({}, this.defaultItem);
              this.editedIndex = -1;
          });
      },
      save() {
          if (this.editedIndex > -1) {
              api.updateAsset(this.editedItem).catch(error=>{
                  this.errorMessage = error.response.data.message;
                  this.errorSnackbar = true;
                  return;
              })
            Object.assign(this.assetList[this.editedIndex], this.editedItem)
          } else {
              var index = this.assetList.push(this.editedItem) - 1;
              api.createAsset(this.editedItem).then(response=>{
                  this.assetList[index].id = response;
              })
              .catch(error=>{
                    this.assetList.pop();
                    this.errorMessage = error.response.data.message;
                    this.errorSnackbar = true;
              });   
          }
          this.close();
      },
      editItem(item) {
        this.editedIndex = this.assetList.indexOf(item);
        this.editedItem = Object.assign({},item);
        this.dialog = true;
      },
      deleteSelected() {
          var listToDelete = this.selectedAssets.map(x => x.id);
          var listOfIds = JSON.parse(JSON.stringify({listOfIds: listToDelete}));
          confirm('Are you sure that you want to delete items with ids: ' + listToDelete + ' ?')
          && api.deleteAssets(listOfIds).then(response=>{
              if (response.status != 403) {
                 for (var i = 0; i < listToDelete.length; i++) {
                     var b = this.assetList.filter(e => e.id === listToDelete[i]);
                     b.forEach(element => {
                        this.assetList.splice(this.assetList.findIndex(e=>e.id == element.id), 1);   
                        this.selectedAssets.splice(this.selectedAssets.findIndex(e=>e.id == element.id), 1);
                     });
                 }
              }
          })
      },
      relocateSelected() {
          var listToRelocate = this.selectedAssets.filter(x => x.assetLocationState != 'RIGHT_PLACE').map(x => x.id);
          var listOfIds = JSON.parse(JSON.stringify({listOfIds: listToRelocate}));
          console.log(listOfIds);
          api.relocateAssets(listOfIds).then(()=>{
              for (var i = 0; i < listToRelocate.length; i++) {
                  var b = this.assetList.filter(e => e.id === listToRelocate[i]);
                  b.forEach(element => {
                      element.assetLocationState = "RIGHT_PLACE";
                  })
              }
              this.selectedAssets = [];
          })
      },
      chooseFloor(floor) {
        this.editedItem.localization.floor = floor;
        this.defaultItem.localization.floor = floor;
      },
      deleteItem(item) {
        const indexInMainList = this.assetList.indexOf(item);
        const indexInSelectedList = this.selectedAssets.indexOf(item);
        confirm('Are you sure that you want to delete item with name ' + item.name + ' ?') 
        && api.deleteAsset(item.id)
        .then(response=>{
            if (response.status != 403) {
                this.assetList.splice(indexInMainList, 1)
                if (indexInSelectedList > -1) {
                    this.selectedAssets.splice(indexInSelectedList, 1)
                }
            }
        })
        .catch(error=>{
            this.errorMessage = error.response.data.message;
            this.errorSnackbar = true;
        })
        },
    }
}
</script>