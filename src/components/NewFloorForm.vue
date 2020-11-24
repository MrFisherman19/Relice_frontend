<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="floor.name" dense color="#990033" label="Name" class="ml-2 mr-2"></v-text-field>
                    </v-col>    
                    <v-col cols="12">
                        <v-text-field v-model="floor.description" dense color="#990033" label="Description" class="ml-2 mr-2"></v-text-field>
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