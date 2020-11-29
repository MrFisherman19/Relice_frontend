<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-container>
                <form>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="user.name" dense color="#990033" label="Name" class="ml-2 mr-2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="user.email" :rules="[rules.required]" dense color="#990033" label="Email" class="ml-2 mr-2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="user.password" dense :rules="[rules.required]" label="Password" type="password" class="ml-2 mr-2" autocomplete="on" color="#990033"></v-text-field>
                    </v-col>
                    <v-col cols="6" md="6">
                        <v-checkbox v-model="user.enabled" label="Should be active" color="#990033" dense class="ml-2 mr-2"></v-checkbox>
                    </v-col>
                    <v-col cols="6" md="6">
                        <v-select v-model="user.userRole" :rules="[rules.required]" :items="authorities" label="Authority" dense color="#990033" class="ml-2 mr-2 mt-4"></v-select>
                    </v-col>
                </v-row>
                </form>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn icon><v-icon color="gray darken-3" @click="close">mdi-close</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon color="green darken-3" @click="save">mdi-content-save</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props:["user", "title"],
    name: 'NewUserForm',
    data:()=>({
        authorities:[],
        rules: {
            required: value => !!value || 'Required.'
        },
    }),
    mounted() {
        this.authorities = JSON.parse(window.localStorage.getItem('userRoles'));
    },
    methods: {
      save() {  
        this.$emit('saveUser', this.user);  
      },
      close() {
        this.$emit('close');
      }
    }
}
</script>