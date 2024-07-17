<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import TogglerMode from '@/components/TogglerMode.vue';
import logo from "@/assets/images/img_logo_dtt@3x.png";
import homeIcon from "@/assets/images/ic_mobile_navigarion_home@3x.png";
import homeIconActive from "@/assets/images/ic_mobile_navigarion_home_active@3x.png";
import aboutIcon from "@/assets/images/ic_mobile_navigarion_info@3x.png";
import aboutIconActive from "@/assets/images/ic_mobile_navigarion_info_active@3x.png";

const router = useRouter();
</script>

<template>
  <nav>
    <div class="navbar flex">
        <div class="flex col-gap links" v-if="windowWidth > 600">
            <img class="logo" :src="logo" alt="DTT logo" />
            <RouterLink to="/" >Houses</RouterLink>
            <RouterLink to="/about" >About</RouterLink>
        </div>
        <div v-else class="flex col-gap links around">
            <RouterLink to="/" ><img :src="router.currentRoute.value.path === '/' ? homeIconActive : homeIcon" class="icon" /></RouterLink>
            <RouterLink to="/about" ><img :src="router.currentRoute.value.path === '/about' ? aboutIconActive : aboutIcon" class="icon" /></RouterLink>
            <TogglerMode></TogglerMode>
        </div>
        <TogglerMode v-if="windowWidth > 600"></TogglerMode>
    </div>
</nav>
</template>

<style scoped> 
nav {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    background-color: var(--background2);
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.navbar {
    width: var(--width);
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    column-gap: 60px;
}

.links {
    width: var(--width);
    height: 45px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px;
    column-gap: 60px;
}

.router-link-active{
    color: var(--text-primary);
    font-weight: 800;
}

.logo {
    height: 100%;
}

a{
    font-size: 18px;
    font-weight: 600;
}

.icon{
height: 25px;
}

@media screen and (max-width: 600px) {
    nav{
        bottom: 0;
        top: auto;
        height: 60px;
    }

    .navbar{
        width: 100%;
        justify-content: space-around;
    }
}
</style>