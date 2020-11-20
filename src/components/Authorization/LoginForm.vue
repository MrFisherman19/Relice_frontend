<template>
  <v-container class="mainContainer fill-height" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Sign in</v-card-title>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-img
                :src="require('../../assets/officeLogo.png')"
                contain
                height="256"
              />
            </v-col>
            <v-col cols="8" class="text-center">
              <v-form @keyup.enter.native="signIn">
                <v-text-field dense label="Username" v-model="username" outlined :rules="[rules.required]" color="#990033"></v-text-field>
                <v-text-field dense label="Password" type="password" autocomplete="on" outlined v-model="password" color="#990033"></v-text-field>
                <v-btn class="mb-4 ma-0 text-capitalize" color="#990033" @click="signIn" dark>Sign in</v-btn>
                <div>Don't have an account yet? <router-link to="/sign-up">Register now</router-link></div>
              </v-form>
            </v-col>
          </v-row>
          <ProgressBar :shouldShow='loading'></ProgressBar>
        </v-card>
        <ErrorAlert :shouldShow='wrongCredentialsError' :message='errorMessage'></ErrorAlert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import api from '../../Api.js';
  import ErrorAlert from '../ErrorAlert'
  import ProgressBar from '../ProgressBar.vue'
  export default {
    name: 'LoginForm',
    components: {
      ErrorAlert,
      ProgressBar
    },
    data: () => ({
      username:'',
      password:'',
      errorMessage:'',
      wrongCredentialsError:false,
      loading: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }),
    created() {
      var value = window.localStorage.getItem('darkMode');
      this.$vuetify.theme.dark = JSON.parse(value);
    },
    methods: {
      signIn() {
        this.loading = true;
        this.wrongCredentialsError = false;
        api.signIn(JSON.stringify({username: this.username, password: this.password }))
        .then(data=> {
          window.localStorage.setItem("reliceToken", data.token);
          this.loading = false;
          this.$router.push('/assetList');
        })
        .catch(error=> {
          this.loading = false;
          this.errorMessage = error.response.data.message;
          this.wrongCredentialsError = true;
        });
      }
    }
  }
</script>
<style scoped>
 .mainContainer {
   background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9');
   background-position: center;
 }
</style>
