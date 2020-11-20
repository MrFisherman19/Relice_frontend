<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-row no-gutters align="center" justify="center">
            <v-col cols="12">
                <v-text-field v-model="floor.name" outlined dense color="#990033" label="Name" class="ml-2 mr-2"></v-text-field>
                <v-text-field v-model="floor.description" outlined dense color="#990033" label="Description" class="ml-2 mr-2"></v-text-field>
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
    name: 'NewFloorForm',
    props:['title'],
    data:()=>({
        floor: {
            name: '',
            description: '',
            building: {
                id: ''
            }
        },
        defaultFloor: {
            name: '',
            description: '',
            building: {
                id: ''
            }
        },
    }),
    methods:{
        save() {
            this.$emit('createFloor', this.floor);
            this.clearFields();
        },
        close() {
            this.$emit('close');
            this.clearFields();
        },
        clearFields() {
            this.floor = JSON.parse(JSON.stringify(this.defaultFloor));
        }
    },
}
</script>