<template>
  <v-app>
    <v-app-bar style="z-index:1000" v-if="!isPublicPage" app :collapse="!shouldCollapse" :collapse-on-scroll="!shouldCollapse" color="#990033" fixed dark>
      <v-app-bar-nav-icon @click="menu=!menu"></v-app-bar-nav-icon>
      <v-toolbar-title>Relice</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-checkbox v-model="darkMode" on-icon="mdi-weather-night" off-icon="mdi-weather-sunny" hide-details></v-checkbox>
      <v-checkbox v-model="shouldCollapse" on-icon="mdi-lock" off-icon="mdi-lock-open" hide-details></v-checkbox>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer v-if="!isPublicPage" v-show="menu" absolute permanent expand-on-hover>
      <v-list>
        <v-list-item @click="$router.push('/relocationViewer').catch(()=>{})">
          <v-list-item-icon><v-icon>mdi-arrow-top-right</v-icon></v-list-item-icon>
          <v-list-item-title>Relocation</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/buildingList').catch(()=>{})">
          <v-list-item-icon><v-icon>mdi-bank</v-icon></v-list-item-icon>
          <v-list-item-title>Buildings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/assetList').catch(()=>{})">
          <v-list-item-icon><v-icon>mdi-database</v-icon></v-list-item-icon>
          <v-list-item-title>Database</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/usersViewer').catch(()=>{})">
          <v-list-item-icon><v-icon>mdi-account-multiple</v-icon></v-list-item-icon>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-qrcode</v-icon></v-list-item-icon>
          <v-list-item-title>QR Codes</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/reportsPanel').catch(()=>{})">
          <v-list-item-icon><v-icon>mdi-chart-line</v-icon></v-list-item-icon>
          <v-list-item-title>Reports</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <LogoutButton></LogoutButton>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
        <router-link to="/signIn"></router-link>
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
      </v-main>
    <span class="text-end ml-200 pa-4 pt-0 copyright">© Copyright by <a href="" class="linkToCopyrighter">Bartosz Rybak 2020</a></span>
  </v-app>  
</template>

<script>
import api from './Api.js'
import LogoutButton from './components/Authorization/LogoutButton.vue'
export default {
  name: 'App',
  components: {
    LogoutButton
  },
  data: () => ({
     subpagesWithoutAppBar:['signIn',"signUp","mainPage"],
     shouldCollapse: false,
     menu: true,
     mini: true,
     darkMode: false,
  }),
  mounted() {
    this.getAllSelectableOptions();
  },
  created() {
    var value = JSON.parse(window.localStorage.getItem('darkMode'));
    this.$vuetify.theme.dark = value;
    this.darkMode = value;
  },
  watch: {
    darkMode:function() {
      this.$vuetify.theme.dark = this.darkMode;
      window.localStorage.setItem('darkMode', this.darkMode);
    }
  },
  methods: {
    getAllSelectableOptions() {
      api.getAllSelectableOptions()
      .then(data=>{
        var x;
          for (x in data) {
            window.localStorage.setItem(x,JSON.stringify(data[x]));
          }
      });
    },
  },
  computed: {
    isPublicPage() {
      return this.subpagesWithoutAppBar.includes(this.$route.name);
    },
  }
};
</script>
<style>
  .linkToCopyrighter {
    color: #990033;
    text-decoration: none;
  }
  .linkToCopyrighter:visited {
    color: #990033;
  }
  .copyright {
    position: relative;
    right: 0;
    bottom: 0;
  }
  .slide-fade-enter-active {
    opacity: 1;
    transition: all 1s ease-out;
  }
  .slide-fade-leave-active {
    opacity: 1;
    transition: all 1s ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform:translateX(500px);
    opacity: 0;
  }

  /* .v-application{
    background-color: 
  } */
</style>
