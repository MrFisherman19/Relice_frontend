<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
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
            <v-btn icon><v-icon color="gray darken-3" @click="close">mdi-close</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon color="green darken-3" @click="save">mdi-content-save</v-icon></v-btn>
        </v-card-actions>
        </v-card>
</template>
<script>
export default {
    name: 'NewBuildingForm',
    props:['title'],
    data:()=>({
        building: {
            name: '',
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
        defaultBuilding: {
            name: '',
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
    methods:{
        save() {
            this.$emit('createBuilding', this.building);
            this.clearFields();
        },
        close() {
            this.$emit('close');
            this.clearFields();
        },
        clearFields() {
            this.building = JSON.parse(JSON.stringify(this.defaultBuilding));
        }
    },
}
</script>