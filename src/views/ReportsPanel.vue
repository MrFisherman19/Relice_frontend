<template>
    <v-container fluid>
        <v-row no-gutters justify="end" align="center">
            <v-col cols="10" md="10">
                <v-row no-gutters>
                    <v-col v-for="(report,index) in reports" :key="index">
                        <Report :name="report.name" :url="report.url"></Report>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Report from '../components/Report.vue'
export default {
    name: 'ReportsPanel',
    data:()=>({
        reports:[
            {
                name: 'Office health report',
                url: 'http://localhost:8081/report/getAssetsConditionReport'
            },
            {
                name: 'Asset relocation report',
                url: ''
            },
            {
                name: 'Fixed assets inventory report',
                url: ''
            },
        ]
    }),
    components: {
        Report
    },
}
</script>