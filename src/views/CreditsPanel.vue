<template>
    <v-container fluid>
        <v-row no-gutters justify="end" align="center">
            <v-col cols="10" md="10">
                <v-card>
                    <v-card-title>Credits</v-card-title>
                    <v-row justify="center" align="center" class="ma-2">
                        <v-col cols="6" md="1" class="text-center">
                            <v-avatar :size="100"><img :eager="true" style="border: 2px solid gray" :src="require('../assets/officeLogo.png')"></v-avatar>
                        </v-col>
                        <v-col cols="6" md="2">
                            <v-avatar :size="100"><img :eager="true" :src="require('../assets/author.jpg')"/></v-avatar>
                        </v-col>
                        <v-col cols="12" md="5">
                            Bartosz Rybak - idea, design, implementation
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-icon>mdi-github</v-icon><a href="https://github.com/MrFisherman19"> Github</a>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-icon>mdi-linkedin</v-icon><a href="https://www.linkedin.com/in/bartosz-rybak-a82a16175"> Linkedin</a>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-card-text>
                        Relice logo: Agnieszka Sowa <br>
                        MDI icons: <a>http://code.meta-platform.com/assets/mdi/preview.html</a><br>
                        Login background: <a>https://images.unsplash.com</a><br>
                        Floor icon made by: <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a><br>
                        Reports image: <a>https://cdn.redshift.autodesk.com/2018/08/future-of-buildings-header.jpg</a><br>
                        User avatar: <a>https://www.svgrepo.com/svg/122767/avatar</a><br>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row justify="center" align="center">
                        <v-col cols="12" md="12" class="text-center">
                            Project made with:
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <a href="https://vuejs.org/"><img eager width="100" height="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"></a>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <a href="https://vuetifyjs.com/en/"><img eager width="100" height="100" src="https://camo.githubusercontent.com/be384df72ff1748336f5927f7116e79a37cbe1639a5b7db162be2d7afe350f87/68747470733a2f2f63646e2e767565746966796a732e636f6d2f696d616765732f6c6f676f732f6c6f676f2e737667"></a>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <a href="https://spring.io/projects/spring-boot"><img eager width="100" height="100" src="https://spring.io/images/spring-initializr-4291cc0115eb104348717b82161a81de.svg"></a>
                        </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
    a {
        text-decoration: none;
    }
</style>