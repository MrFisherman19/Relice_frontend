<template>
    <span>
        <span>
            <v-icon class="white--text mb-0">mdi-map-marker</v-icon>Planned localization:<br><hr>
                Building: {{ getBuildingName(item.localization.floor_planned) }}<br>
                Floor: {{ getFloorName(item.localization.floor_planned) }}<br>
        </span>
        <span>
            <v-icon class="white--text mb-0">mdi-map-marker</v-icon>Previous localization:<br><hr>
                Building: {{ getBuildingName(item.localization.floor_previous) }}<br>
                Floor: {{ getFloorName(item.localization.floor_previous) }}<br>
        </span>
        <span v-if="note">
            <v-icon class="white--text mb-0">mdi-note-outline</v-icon>Additional note:<br><hr>
            {{ item.additionalNote }}
        </span>
    </span>
</template>
<script>
export default {
    props:["item","note"],
    name: 'TooltipContent',
    methods: {
        getBuildingName:function(item) {
            return item != null ? item.building.name : '---'; 
        },
        getFloorName: function(item) {
            return item != null ? item.name : '---'; 
        }
    }
}
</script>