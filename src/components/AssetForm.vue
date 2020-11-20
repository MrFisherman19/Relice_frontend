<template> 
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-container>
                <v-row dense>
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
                            <v-col cols="3">
                                <v-text-field v-model="editedItem.assetMapDetails.dimensions.width" label="Width" dense color="#990033"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="editedItem.assetMapDetails.dimensions.height" label="Height" dense color="#990033"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                            Color on map:  
                            <v-dialog
                                v-model="colorDialog"
                                max-width="300px">
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn x-small
                                    v-bind="attrs"
                                    v-on="on"
                                    :color="getCurrentItemColor()"
                                    class="white--text text-capitalize mb-3 mr-2">
                                    {{getCurrentItemColor()}}
                                    </v-btn>
                                </template>
                                <v-card>
                                <v-card-title>Select item color</v-card-title>
                                <v-card-text class="text-center">
                                    <v-color-picker
                                        v-model="editedItem.assetMapDetails.color.hexColor"
                                        dot-size="20"
                                        mode="hexa"
                                        show-swatches
                                        swatches-max-height="95">
                                    </v-color-picker>
                                </v-card-text>
                                </v-card>
                            </v-dialog>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-row align="end" dense>
                            <v-col cols="4">
                                <v-checkbox color="#990033" v-model="multipleItems" dense label="Multiple items"></v-checkbox>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field v-model="amount" placeholder="10" class="pt-2 pr-4 ml-1" :disabled="!multipleItems" label="Amount" dense color="#990033"></v-text-field>
                            </v-col>
                        </v-row>
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
    name: 'AssetForm',
    props:['editedItem', 'title'],
    data:()=>({
        items:[],
        conditionStates:[],
        locationStates:[],
        assetTypes:[],
        colorDialog:false,
        dialog: false,
        editedIndex: -1,
        multipleItems: false,
        amount: 1,
        rules: {
            required: value => !!value || 'Required.'
        }
    }),
    mounted() {
        this.setAllSelectableOptions();
    },
    methods: {
      setAllSelectableOptions() {
          this.assetTypes = JSON.parse(window.localStorage.getItem('assetTypes'));
          this.conditionStates = JSON.parse(window.localStorage.getItem('assetConditionStates'));
          this.locationStates = JSON.parse(window.localStorage.getItem('assetLocationStates'));
      },
      getCurrentItemColor() {
          return this.editedItem.assetMapDetails.color.hexColor;
      },
      save() {
          if (this.multipleItems) {
            this.$emit('saveItem', this.amount);
          } else {
              this.$emit('saveItem', 1);
          }
      },
      close() {
          this.$emit('close');
      }
    }
}
</script>
<style scoped>

</style>