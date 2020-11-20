<template>
    <v-card>
        <v-card-title>{{ buildingProperties.name }}</v-card-title>
        <v-card-subtitle>{{ buildingProperties.owner}} </v-card-subtitle>
        <v-img class="afterScaling" max-height="194" :src="buildingProperties.imageUrl" position="center">
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
                <v-row no-gutters align="center" justify="center">
                    <v-col cols="12">
                        <v-text-field v-model="building.name" outlined dense color="#990033" label="Name" :value="buildingProperties.name" class="ml-2 mr-2"></v-text-field>
                        <v-text-field v-model="building.owner" outlined dense color="#990033" label="Owner" :value="buildingProperties.owner" class="ml-2 mr-2"></v-text-field>
                        <v-text-field v-model="building.imageUrl" outlined dense color="#990033" label="Image url" :value="buildingProperties.imageUrl" class="ml-2 mr-2"></v-text-field>

                        <v-text-field v-model="building.address.streetName" outlined dense color="#990033" label="Street" :value="buildingProperties.address.streetName" class="ml-2 mr-2"></v-text-field>
                        <v-text-field v-model="building.address.numberOnStreet" outlined dense color="#990033" label="Number on street" :value="buildingProperties.address.numberOnStreet" class="ml-2 mr-2"></v-text-field>
                        <v-text-field v-model="building.address.zipCode" outlined dense color="#990033" label="Zip code" :value="buildingProperties.address.zipCode" class="ml-2 mr-2"></v-text-field>
                        <v-text-field v-model="building.address.city" outlined dense color="#990033" label="City" :value="buildingProperties.address.city" class="ml-2 mr-2"></v-text-field>   
                        <v-text-field v-model="building.address.country" outlined dense color="#990033" label="Country" :value="buildingProperties.address.country" class="ml-2 mr-2"></v-text-field>  

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn icon><v-icon color="gray darken-3" @click="updateRequest=false">mdi-close</v-icon></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon><v-icon color="green darken-3" @click="update">mdi-content-save</v-icon></v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
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
        }
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
        }
    }
}
</script>
<style scoped>

</style>