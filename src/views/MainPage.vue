<template> 
    <v-container fluid fill-height class="all">
    <v-container fluid class="home-page pa-0">
        <v-toolbar dark dense flat color="transparent">
            <v-spacer></v-spacer>
            <v-btn @click="$router.push('/sign-in')" color="#990033" small dark class="ma-1 text-capitalize">Sign-in</v-btn>
            <v-btn @click="$router.push('/sign-up')" color="#990033" small dark class="ma-1 text-capitalize">Sign-up</v-btn>
        </v-toolbar>
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black white--text text-xs-center"><span class="rel">Rel</span><span class="ice">ice</span></div> 
            <div class="headline gray--text text-xs-center"><span class="subtitle">Office relocation system</span></div> 
        </v-layout>
    </v-container>
    <v-container fluid class="second-container">
        <v-row justify="center" align="center" class="fill-height">
            <v-col cols="12" md="4" class="text-center">
                <v-card>
                    <v-card-title class="justify-center"><v-avatar size="60" class="ma-2"><v-img :src="require('../assets/laptop-svgrepo-com.svg')"></v-img></v-avatar>
                    Easy to use
                    </v-card-title>
                    <v-divider color="#990033"></v-divider>
                    <v-card-text>
                        Relice is so easy to use. 
                        Interface is intuitive and the buttons are clearly visible.
                        You don't even need to use the manual!
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
                <v-card>
                    <v-card-title class="justify-center"><v-avatar size="60" class="ma-2"><v-img :src="require('../assets/line-chart-svgrepo-com.svg')"></v-img></v-avatar>Stability and flexibility</v-card-title>
                    <v-divider color="#990033"></v-divider>
                    <v-card-text>
                        System contains a stable database of your assets.
                        It is placed on the Internet and therefore it is available from anywhere in the world.
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
                <v-card>
                    <v-card-title class="justify-center"><v-avatar size="60" class="ma-2"><v-img :src="require('../assets/strategy-planning-svgrepo-com.svg')"></v-img></v-avatar>All in one place</v-card-title>
                    <v-divider color="#990033"></v-divider>
                    <v-card-text>
                        Rverything is in one place so you do not have to enter or log into several systems.
                        Barcodes, database, reports, maps are here!
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-container>
    <v-container fluid class="third-container">
        <v-row justify="center" class="fill-height">
            <v-col cols="12" md="6" class="text-center">
                <v-card>
                    <v-card-title>Overview video</v-card-title>
                    <v-card-text>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/6hBLHkmBKDg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" class="text-center">
               <v-carousel height="400" cycle>
                    <v-carousel-item v-for="(image, index) in images" :key="index">
                        <v-img width="1000" height="auto" :src="image.src"></v-img>
                    </v-carousel-item>
               </v-carousel>
            </v-col>
        </v-row>
    </v-container>
    <v-footer width="100%" color="#990033">
        <v-spacer></v-spacer>
        <span class="white--text pa-2">© Copyright by Bartosz Rybak 2020</span>
        <v-spacer></v-spacer>
    </v-footer>
    </v-container>
</template>
<script>
export default {
    name: 'MainPage',
    data:()=>({
        images:[
            {
                src: require('../assets/Screenshots/barcodes.png')
            },
            {
                src: require('../assets/Screenshots/buildings.png')
            },
            {
                src: require('../assets/Screenshots/maps.png'),
            },
            {
                src: require('../assets/Screenshots/relocation.png'),
            },
            {
                src: require('../assets/Screenshots/reports.png'),
            },
            {
                src: require('../assets/Screenshots/users.png'),
            }
        ]
    })
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
    .home-page {
        background: url('../assets/abstract-blur-hotel-interior.jpg');
        background-size: cover;
        background-position: 0% 30%;
        width: 100%;
        height: 30%;
        border: 1px solid #555555;
    }
    .second-container {
        height: 50%;
    }
    .third-container {
        height: 60%;
    }
    .avatar {
        border: 1px solid #990033;
    }
    .card-title {
        color: #555555
    }
    .rel {
        text-shadow: -2px 0 #990033, 0 2px #990033, 2px 0 #990033, 0 -2px #990033;
        color: white;
        font-family: 'Varela Round', sans-serif;
    }
    .ice {
        text-shadow: -2px 0 #222222, 0 2px #222222, 2px 0 #222222, 0 -2px #222222;
        font-family: 'Varela Round', sans-serif;
    }
    .subtitle {
        color: #111111;
        font-family: 'Varela Round', sans-serif;
    }
</style>