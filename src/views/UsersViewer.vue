<template>
    <v-container fluid>
        <v-row no-gutters justify="end" align="center">
            <v-col cols="10" md="10">
                <v-card>
                    <v-card-title>My account</v-card-title>
                    <v-divider></v-divider>
                    <div class="ma-2 pl-5 pr-5 pt-1 pb-3">
                        <UserContent :user="currentUser" :avatarSize="70" v-on:deleteUser="deleteCurrentUser"></UserContent>
                    </div>
                </v-card>
            </v-col>
        </v-row> 
        <v-row no-gutters justify="end" align="center" v-if="isAdmin()">
            <v-col cols="10" md="10">
                <v-dialog
                    v-model="newUserDialog"
                    max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small
                        v-bind="attrs"
                        v-on="on"
                        color="green darken-3"
                        class="white--text text-capitalize mt-2">
                        Add user<v-icon small>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <NewUserForm :user="defaultUser" title="New User" v-on:close="newUserDialog = !newUserDialog" v-on:saveUser="saveUser"></NewUserForm>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row no-gutters justify="end" align="center" class="mt-2" v-if="isAdmin()">
            <v-col cols="10" md="10">
                <v-card flat>
                    <v-card-title>Your team</v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <transition-group name="slide-fade" mode="out-in">
                                    <UserContent v-for="(user,index) in usersGroup" :key="index" :user="user" :avatarSize="60" v-on:deleteUser="deleteUser"></UserContent>
                                </transition-group>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="errorSnackbar">{{ errorMessage }}
            <template v-slot:action = "{ attrs }">
                <v-btn
                    text
                    v-bind="attrs"
                    color="red darken-3"
                    @click="errorSnackbar = false">
                    <v-icon color="red darken-3">
                        mdi-close
                    </v-icon>
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<script>
import api from '../Api.js'
import UserContent from '../components/UserContent.vue'
import NewUserForm from '../components/NewUserForm.vue'
export default {
    data:()=>({
        errorSnackbar: false,
        errorMessage: "",
        currentUser: {
            name: "undefined",
            email: "undefined",
            userRole: "undefined",
            group: {
                id: ''
            },
            enabled: false,
            credentialsNonExpired: true,
            accountNonExpired: true,
            nonLocked: true,
        },
        defaultUser: {
            name: "",
            email: "",
            password: "",
            userRole: "",
            group: {
                id: ''
            },
            enabled: false,
            credentialsNonExpired: true,
            accountNonExpired: true,
            nonLocked: true,
        },
        newUserDialog: false,
        usersGroup:[]
    }),
    components: {
        UserContent,
        NewUserForm
    },
    mounted(){
        this.getCurrentUserDetails();
    },
    methods: {
        getCurrentUserDetails() {
            api.getCurrentUserDetails().then(response => {
                this.currentUser = response;
                if (this.isAdmin(this.currentUser)) {
                    this.getUsersInSameGroup();
                }
            });
        },
        getUsersInSameGroup() {
            api.getUsersByGroupId(this.currentUser.group.id).then(response => {
                this.usersGroup = response;
            })
        },
        isAdmin() {
            return this.currentUser.userRole == "ROLE_ADMIN";
        },
        saveUser(user) {
            user.group.id = this.currentUser.group.id;
            if (user.enabled) {
                user.nonLocked = true;
            }
            api.createUser(user).then(() => {
                this.usersGroup.push(user);
                this.newUserDialog = false;
            }).catch(error=>{
                this.errorMessage = error.response.data.message;
                this.errorSnackbar = true;
            });
        },
        deleteCurrentUser() {
            confirm('Are you sure that you want to delete your account?') 
            && api.deleteCurrentUser().then(() => {
                window.localStorage.removeItem('reliceToken');
                this.$router.push('/sign-in');
            }).catch(error=>{
                this.errorMessage = error.response.data.message;
                this.errorSnackbar = true;
            });
        },
        deleteUser(user) {
            confirm('Are you sure that you want to delete user with email ' + user.email + ' ?') 
            && api.deleteUser(user.email).then(() => {
                var indexOfUser = this.usersGroup.indexOf(user);
                this.usersGroup.splice(indexOfUser, 1);
            }).catch(error=>{
                this.errorMessage = error.response.data.message;
                this.errorSnackbar = true;
            }); 
        }
    }
}
</script>
<style scoped>
.userFont {
    font-size: 1.4em;
}


</style>