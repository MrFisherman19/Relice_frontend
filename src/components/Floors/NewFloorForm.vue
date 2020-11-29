<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-container>
                <v-form v-model="isFormValid">
                <v-row>
                    <v-col cols="12">
                        <v-text-field :rules="[rules.required]" v-model="floor.name" dense color="#990033" label="Name" class="ml-2 mr-2"></v-text-field>
                    </v-col>    
                    <v-col cols="12">
                        <v-text-field v-model="floor.description" dense color="#990033" label="Description" class="ml-2 mr-2"></v-text-field>
                    </v-col>
                </v-row>
                </v-form>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn icon><v-icon color="gray darken-3" @click="close">mdi-close</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon color="green darken-3" @click="save" :disabled="!isFormValid">mdi-content-save</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: 'NewFloorForm',
    props:['title','floor'],
    data:()=>({
        isFormValid: false,
        rules: {
            required: value => !!value || 'Required.'
        },
    }),
    methods:{
        save() {
            this.$emit('saveFloor', this.floor);
            this.clearFields();
        },
        close() {
            this.$emit('close');
            this.clearFields();
        },
        clearFields() {
            this.$emit('setDefault');
        }
    },
}
</script>