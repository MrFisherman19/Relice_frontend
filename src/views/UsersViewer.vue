<template>
    <v-container fluid>
        <v-row no-gutters justify="end" align="center">
            <v-col cols="10" md="10">
                <v-card>
                    <v-card-title>My account</v-card-title>
                    <v-divider></v-divider>
                    <div class="ma-2 pl-5 pr-5 pt-1 pb-3">
                        <UserContent :user="currentUser" :avatarSize="70"></UserContent>
                    </div>
                </v-card>
            </v-col>
        </v-row> 
        <v-row no-gutters justify="end" align="center" v-if="isAdmin()">
            <v-col cols="10" md="10">
                <v-dialog
                    persistent
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
                </v-dialog>
            </v-col>
        </v-row>
        <v-row no-gutters justify="end" align="center" v-if="isAdmin()">
            <v-col cols="10" md="10">
                <v-card flat>
                    <v-card-title>Your team</v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <UserContent v-for="(user,index) in usersGroup" :key="index" :user="user" :avatarSize="60"></UserContent>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import api from '../Api.js'
import UserContent from '../components/UserContent.vue'
export default {
    data:()=>({
        currentUser: {
            name: "undefined",
            email: "undefined",
            userRole: "undefined",
            groupId: -1,
            authorities: [
                {
                    authority: "undefined"
                }
            ],
            enabled: false,
            credentialsNonExpired: false,
            accountNonExpired: false,
            nonLocked: false
        },
        newUserDialog: false,
        usersGroup:[]
    }),
    components: {
        UserContent
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
            api.getUsersByGroupId(this.currentUser.groupId).then(response => {
                this.usersGroup = response;
            })
        },
        isAdmin() {
            return this.currentUser.authorities[0].authority == "ROLE_ADMIN";
        }
    }
}
</script>
<style scoped>
.userFont {
    font-size: 1.4em;
}


</style>