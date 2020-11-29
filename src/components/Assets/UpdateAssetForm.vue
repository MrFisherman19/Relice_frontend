<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-container>
                <v-form v-model="isFormValid">
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
                        <v-select v-model="editedItem.assetLocationState" :rules="[rules.required]" :items="locationStates" label="Location state" dense color="#990033"></v-select>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-row>
                            <v-col>
                                <v-text-field v-model="editedItem.assetMapDetails.dimensions.width" label="Width" dense color="#990033"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="editedItem.assetMapDetails.dimensions.height" label="Height" dense color="#990033"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="editedItem.localization.coordinates.zaxis" label="Z-index" dense color="#990033"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>                            
                </v-row>
                </v-form>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn icon><v-icon color="gray darken-3" @click="close">mdi-close</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon color="green darken-3" @click="save" :disabled="!isFormValid">mdi-content-save</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: 'UpdateAssetForm',
    props:['editedItem','title'],
    data:()=>({
        conditionStates:[],
        locationStates:[],
        assetTypes:[],
        isFormValid: false,
        rules: {
            required: value => !!value || 'Required.',
        }
    }),
    methods:{
        setAllSelectableOptions() {
          this.assetTypes = JSON.parse(window.localStorage.getItem('assetTypes'));
          this.conditionStates = JSON.parse(window.localStorage.getItem('assetConditionStates'));
          this.locationStates = JSON.parse(window.localStorage.getItem('assetLocationStates'));
        },
        save() {
            this.$emit('updateItem', this.editedItem);
        },
        close() {
            this.$emit('close');
        }
    },
    mounted() {
        this.setAllSelectableOptions();
    }
}
</script>