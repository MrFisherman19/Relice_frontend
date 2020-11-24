<template>        
    <v-row align="center" no-gutters>
        <v-col cols="1" md="1">
            <v-avatar size="60"><v-img :src="require('../../assets/floor2.png')"></v-img></v-avatar>
        </v-col>
        <v-col cols="2" md="2" class="text-center">
            {{ floorProperties.name }}
        </v-col>
        <v-col cols="7" md="7" class="text-center">
            {{ floorProperties.description }}
        </v-col>
        <v-col cols="2" md="2">
            <v-btn icon @click="$emit('shouldshowmappreview')"><v-icon color="green darken-3">mdi-eye</v-icon></v-btn>
            <v-btn icon><v-icon color="yellow darken-3">mdi-pencil</v-icon></v-btn>
            <v-btn icon @click="deleteFloor"><v-icon color="red darken-3">mdi-delete</v-icon></v-btn>
        </v-col>
    </v-row>
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
