<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Sign up</v-card-title>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-img
                :src="require('../../assets/officeLogo.png')"
                contain
                height="256"
              />
            </v-col>
            <v-col cols="8" class="text-center">
                <v-form @keyup.enter.native="signUp">
                  <v-text-field dense label="Name" v-model="name" outlined :rules="[rules.required]" color="#990033"></v-text-field>
                  <v-text-field dense label="Email" v-model="email" outlined :rules="[rules.required]" color="#990033"></v-text-field>
                  <v-text-field dense label="Password" type="password" aria-autocomplete="on" outlined v-model="password" color="#990033"></v-text-field>
                  <v-text-field dense label="Confirm password" type="password" outlined v-model="confirmedPassword" color="#990033"></v-text-field>
                  <v-btn class="mb-4 ma-0 text-capitalize" color="#990033" @click="signUp" dark>Sign up</v-btn>
                  <div>Do you have an account yet? <router-link to="/sign-in">Login here</router-link></div>
                </v-form>
            </v-col>
          </v-row>
          <ProgressBar :shouldShow='loading'></ProgressBar>
        </v-card>
        <ErrorAlert :shouldShow='wrongCredentialsError' message = "User with this username already exist."></ErrorAlert>
        <v-snackbar v-model="userCreatedSuccessfully">
          We have sent a verification token to your email, click link to activate your account.
        </v-snackbar>
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
      name:'',
      email:'',
      password:'',
      confirmedPassword:'',
      userCreatedSuccessfully: false,
      wrongCredentialsError: false,
      loading:false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }),
    methods: {
      signUp() {
        this.loading = true;
        this.userCreatedSuccessfully = false;
        this.wrongCredentialsError = false;
        if (this.validatePassword()) {
            api.signUp(JSON.stringify({name: this.name, email: this.email, password: this.password }))
            .then(response=>{
              console.log(response);
              this.loading = false;
              this.userCreatedSuccessfully = true;
              this.password = ''
              this.confirmedPassword = ''
              setTimeout(()=>this.$router.push('/sign-in'), 4000);
            })
            .catch(error=>{
              if (error.response.status == 400) {
                this.wrongCredentialsError = true;
                this.loading = false;
              }
            });
        }
      },
      validatePassword() {
        return this.password === this.confirmedPassword;
      }
    }
  }
</script>