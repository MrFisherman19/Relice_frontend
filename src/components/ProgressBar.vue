<template>
    <v-progress-linear color="#990033" :active="this.shouldShow" :indeterminate="this.shouldShow"></v-progress-linear>
</template>
<script>
export default {
    name:'ProgressBar',
    props:['shouldShow']
}
</script>