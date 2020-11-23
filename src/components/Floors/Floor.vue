<template>
    <v-list-item>
        <v-list-item-avatar class="text-center" size="60"><v-img :src="require('../../assets/floor2.png')"></v-img></v-list-item-avatar>
        <v-list-item-content>
            <v-row align="center">
                <v-col class="text-center">
                    {{ floorProperties.name }}
                </v-col>
                <v-col class="text-center">
                    {{ floorProperties.description }}
                </v-col>
                <v-col class="text-right">
                    <v-btn icon @click="$emit('shouldshowmappreview')"><v-icon color="green darken-3">mdi-eye</v-icon></v-btn>
                    <v-btn icon><v-icon color="purple darken-3">mdi-chart-line</v-icon></v-btn>
                    <v-btn icon><v-icon color="yellow darken-3">mdi-pencil</v-icon></v-btn>
                    <v-btn icon @click="deleteFloor"><v-icon color="red darken-3">mdi-delete</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item>
</template>
<script>
export default {
    name: 'Floor',
    props:['floorProperties'],
    methods: {
        deleteFloor() { 
            this.$emit('deleteFloor', this.floorProperties);
        }
    },
}
</script>
