<template>
    <v-card class="mx-auto ma-2" max-width="400">
        <v-img class="align-end" height="150px" src="https://cdn.redshift.autodesk.com/2018/08/future-of-buildings-header.jpg">
           <v-card-title> 
                <v-card flat class="pr-2 pl-2" style="border: 1px solid #990033">
                    <v-card-title class="pa-1">
                        {{ name }}
                    </v-card-title>
                </v-card>
            </v-card-title>
        </v-img>
        <v-card-actions>
            <v-btn @click="downloadReport" small color="blue darken-3 text-capitalize white--text">
                Download<v-icon small>mdi-download</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import api from '../Api.js'
export default {
    name: 'Report',
    props:["name","url"],
    methods: {
        downloadReport() {
            api.downloadReport(this.url)
            .then(data => {
                    let blob = new Blob([data], { type: 'application/pdf' });
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.name + '.pdf';
                    link.click();
            }).catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>
<style scoped>
   
</style>