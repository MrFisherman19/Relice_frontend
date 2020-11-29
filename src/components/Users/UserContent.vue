<template>
    <v-row align="center" no-gutters>
        <v-col md="1">
            <v-avatar :size="avatarSize"><img :src="require('../../assets/avatar.svg')"/></v-avatar>
        </v-col>
        <v-col md="2" class="text-center">
            {{ user.name }}
        </v-col>
        <v-col md="4" class="text-center">
           {{ user.email }}
        </v-col>
        <v-col md="2"> 
            {{ getUserStatus() }}
        </v-col>
        <v-col md="2">
            {{ getUserAuthority() }}
        </v-col>
        <v-col md="1">
            <v-btn icon small class="ml-2">
                <v-icon color="yellow darken-3">
                    mdi-pencil
                </v-icon>
            </v-btn>
            <v-btn @click="deleteUser" icon small class="ml-2">
                <v-icon color="red darken-3">
                    mdi-delete
                </v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:["user","avatarSize"],
    name: 'UserContent',
    methods: {
        getUserStatus() {
            if (this.user.enabled) {
                return "ACTIVE";
            } else {
                return "DISABLED";
            }
        },
        getUserAuthority() {
            return this.user.userRole != null ? this.user.userRole.replace("ROLE_","") : "UNKOWN";
        },
        deleteUser() {
            this.$emit('deleteUser', this.user);
        }
    }
}
</script>