<template>
    <v-alert v-model='this.shouldShow' class="mt-1" type="error">
        {{ this.message }}
    </v-alert>
</template>
<script>
export default {
    name: 'ErrorAlert',
    props:['message','shouldShow']
}
</script>
