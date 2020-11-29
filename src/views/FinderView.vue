<template>
    <v-container fluid>
        <v-row justify="end" dense>
            <v-col cols="10" md="4">
                <v-card>
                    <v-card-title>Asset finder</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row dense>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="search" dense color="#990033" label="Barcodes" prepend-icon="mdi-magnify"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" md="12">
                                    <v-chip-group column color="#990033">
                                        <transition-group name="slide-down-fade" mode="out-in">
                                            <v-chip v-for="asset in foundAssets" :key="asset.id"
                                            color="yellow darken-3" @click:close="foundAssets.splice(index, 1)" dark close>
                                                {{ asset.barcode }}
                                            </v-chip>
                                        </transition-group>
                                    </v-chip-group>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="10" md="6">
                <v-card flat>
                    <v-card-title>Found assets</v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <transition-group name="slide-fade" mode="out-in">
                            <v-card v-for="asset in foundAssets" :key="asset.id" class="mb-2">
                                <v-container fluid>
                                <v-row justify="center">
                                    <v-col cols="12" md="12">
                                        <b>{{ asset.barcode }}</b>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        Name: {{ asset.name }}
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        Type: {{ asset.assetType }}
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        Location status: {{ asset.assetLocationState }}
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        Condition state: {{ asset.assetConditionState }}
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-icon>mdi-map-marker</v-icon><b>Current location</b><br>
                                        Floor: {{ asset.localization.floor.name }}<br>
                                        Building: {{ asset.localization.floor.building.name}}
                                    </v-col>
                                    <v-col cols="6" md="6" v-if="asset.localization.floor_planned != null">
                                        <v-icon>mdi-map-marker</v-icon><b>Planned location</b><br>
                                        Floor: {{ asset.localization.floor_planned.name }}<br>
                                        Building: {{ asset.localization.floor_planned.building.name}}
                                    </v-col>
                                    <v-col cols="6" md="6" v-else>
                                        <v-icon>mdi-map-marker</v-icon><b>Planned location</b><br>
                                        not planned yet
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <b>Additional note</b><br>
                                        {{ asset.additionalNote }}
                                    </v-col>
                                    <v-col cols="12" md="12" v-if="asset.localization.floor_previous != null">
                                        <v-icon>mdi-map-marker</v-icon><b>Previous location</b><br>
                                        Floor: {{ asset.localization.floor_previous.name }}<br>
                                        Building: {{ asset.localization.floor_previous.building.name}}
                                    </v-col>
                                    <v-col cols="12" md="12" v-else>
                                        <v-icon>mdi-map-marker</v-icon><b>Previous location</b><br>
                                        There is no previous location for this asset
                                    </v-col>
                                </v-row>
                                </v-container>                                  
                            </v-card>
                        </transition-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import api from '../Api.js'
export default {
    name: 'FinderView',
    data:()=>({
        search: "",
        awaitingSearch: false,
        foundAssets:[],
        barcodeRegex: /[A-Z]{3}-[0-9]+/g
    }),
    watch: {
        search:function() {
            if (!this.awaitingSearch) {
                setTimeout(()=>{
                    this.checkBarcode();
                    this.awaitingSearch = false; 
                }, 100);
            }
            this.awaitingSearch = true;
        }
    },
    methods: {
        checkBarcode() {
            if (this.search.match(this.barcodeRegex)) {
                api.getAssetById(this.search.substring(this.search.indexOf('-') + 1)).then(response => {
                    this.foundAssets.unshift(response);
                    this.search = "";
                }).catch(error=>{console.log(error);})
            }
        }
    }
}
</script>
<style scoped>
  .slide-down-fade-enter-active {
    opacity: 1;
    transition: all 0.5s ease-out;
  }
  .slide-down-fade-leave-active {
    opacity: 1;
    transition: all 0.5s ease-out;
  }
  .slide-down-fade-enter {
    opacity: 0;
    transform:translateY(-50px);
  }
  .slide-down-fade-leave-to {
    opacity: 0;
    transform:translateY(50px);
  }
</style>