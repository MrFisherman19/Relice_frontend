<template>
    <v-card>
        <v-card-title>{{ buildingProperties.name }}</v-card-title>
        <v-card-subtitle>{{ buildingProperties.owner}} </v-card-subtitle>
        <v-img :eager="true" max-height="194" :src="buildingProperties.imageUrl">
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="#990033"></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <v-list dense>
            <v-list-item>
                Street:&nbsp; {{ buildingProperties.address.streetName }} {{ buildingProperties.address.numberOnStreet }}
            </v-list-item>
            <v-list-item>
                Zip code:&nbsp; {{ buildingProperties.address.zipCode }}
            </v-list-item>
            <v-list-item>
                City:&nbsp; {{ buildingProperties.address.city }} in {{ buildingProperties.address.country }}
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn @click="$router.push({name: 'floorList', params: { id: buildingProperties.id }})" depressed class="text--#990033">
                Floors ({{buildingProperties.numberOfFloors}})
            </v-btn> 
            <v-spacer></v-spacer>
            <v-btn icon @click="updateRequest = true"><v-icon color="yellow darken-3">mdi-pencil</v-icon></v-btn>
            <v-btn icon @click="deleteBuilding"><v-icon color="red darken-3">mdi-delete</v-icon></v-btn>
        </v-card-actions>
        <v-dialog v-model='updateRequest' max-width="500" persistent>
            <v-card>
                <v-card-title>Update Building Properties</v-card-title>
                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="building.name" dense color="#990033" label="Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="building.owner" dense color="#990033" label="Owner"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="building.imageUrl" dense color="#990033" label="Image url"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">    
                                <v-text-field v-model="building.address.streetName" dense color="#990033" label="Street"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">    
                                <v-text-field v-model="building.address.numberOnStreet" dense color="#990033" label="Number on street"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">    
                                <v-text-field v-model="building.address.zipCode" dense color="#990033" label="Zip code"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">    
                                <v-text-field v-model="building.address.city" dense color="#990033" label="City"></v-text-field>   
                            </v-col>
                            <v-col cols="12" md="12">    
                                <v-text-field v-model="building.address.country" dense color="#990033" label="Country"></v-text-field>  
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn icon><v-icon color="gray darken-3" @click="updateRequest=false">mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon color="green darken-3" @click="update">mdi-content-save</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>    
</template>
<script>
import api from '../../Api.js';
export default {
    name:'Building',
    props:['buildingProperties'],
    data:() => ({
        updateRequest: false,
        building: {
            id: '',
            nameOfBuilding: '',
            owner: '',
            imageUrl: '',
            address: {
                streetName: '',
                numberOnStreet: '',
                zipCode: '',
                city: '',
                country: ''
            }
        },
    }),
    created(){
        this.building = this.buildingProperties;
    },
    methods: {
        update() {
            this.loading = true;
            api.updateBuilding(this.building)
            .then(()=>{
                this.updateRequest = false;
                this.loading = false;
            });
        },
        deleteBuilding() { 
            this.$emit('deleteBuilding', this.building);
        },
        imageLoaded() {
            console.log('loaded');
            this.loaded = true;
        }
    }
}
</script>
<style scoped>

</style>