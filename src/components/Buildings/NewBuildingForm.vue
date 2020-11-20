<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-row no-gutters align="center" justify="center">
            <v-col cols="12">
                <v-text-field v-model="building.name" outlined dense color="#990033" label="Name" class="ml-2 mr-2"></v-text-field>
                <v-text-field v-model="building.owner" outlined dense color="#990033" label="Owner" class="ml-2 mr-2"></v-text-field>
                <v-text-field v-model="building.imageUrl" outlined dense color="#990033" label="Image url" class="ml-2 mr-2"></v-text-field>

                <v-text-field v-model="building.address.streetName" outlined dense color="#990033" label="Street" class="ml-2 mr-2"></v-text-field>
                <v-text-field v-model="building.address.numberOnStreet" outlined dense color="#990033" label="Number on street" class="ml-2 mr-2"></v-text-field>
                <v-text-field v-model="building.address.zipCode" outlined dense color="#990033" label="Zip code" class="ml-2 mr-2"></v-text-field>
                <v-text-field v-model="building.address.city" outlined dense color="#990033" label="City" class="ml-2 mr-2"></v-text-field>   
                <v-text-field v-model="building.address.country" outlined dense color="#990033" label="Country" class="ml-2 mr-2"></v-text-field>  

                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn icon><v-icon color="gray darken-3" @click="close">mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon color="green darken-3" @click="save">mdi-content-save</v-icon></v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
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