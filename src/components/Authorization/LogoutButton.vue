<template>
    <div>
        <v-btn block class="text-capitalize mb-1" color="#990033" @click="signOutRequest = true" dark>
            Sign out
        </v-btn>
        <v-dialog v-model="this.signOutRequest" max-width="300" persistent>
            <v-card>
                <v-card-title>Sign out</v-card-title>
                <v-card-text>Are you sure that you want to sign out?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#990033" text @click="signOut()">Yes</v-btn>
                    <v-btn color="#990033" text @click="signOutRequest = false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'LogoutButton',
    data:() => ({
        signOutRequest: false,
        signOutApproval: false,
    }),
    methods: {
        signOut() {
            window.localStorage.removeItem('reliceToken');
            this.signOutRequest = false;
            this.$router.push('/sign-in');
        }
    }
}
</script>
<style scoped>

</style>