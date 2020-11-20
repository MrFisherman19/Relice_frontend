<template>
    <v-container>
        <v-text-field v-model="email" placeholder="Email address">asf</v-text-field><v-btn @click="getUserDetails()">Pokaż dane</v-btn>
        <v-card>
            <v-card-title>{{ this.userData.name }}</v-card-title>
            <v-card-subtitle>{{ this.userData.username }}</v-card-subtitle>
            <v-card-text>{{ this.userData.serRole }}</v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import api from '../Api.js';
  export default {
    name: 'UserDetails',
    data:function() {
        return {
            email:'bartex1010.xdxd@gmail.com',
            userData: {
                name: '',
                username: '',
                userRole: '',
            }
        }
    },
    methods: {
      getUserDetails() {
        api.getUserDetailsByEmail(this.email)
        .then(data=> {
          this.userData = data;
        })
        .catch(error=> {
          console.log(error.response);
        });
      }
    }
  }
</script>