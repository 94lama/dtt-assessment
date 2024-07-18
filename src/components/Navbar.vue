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
const windowWidth = window.innerWidth;

</script>

<template>
    <nav>
        <div class="navbar flex">
            <div class="flex col-gap links" v-if="windowWidth > 600">
                <img class="logo" :src="logo" alt="DTT logo" />
                <RouterLink to="/">Houses</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/my-houses">My listings</RouterLink>
                <RouterLink to="/my-favourite-houses">Favourites</RouterLink>
                
            </div>
            <div v-else class="flex col-gap links around">
                <RouterLink to="/"><img :src="router.currentRoute.value.path === '/' ? homeIconActive : homeIcon" class="icon" /></RouterLink>
                <RouterLink to="/about"><img :src="router.currentRoute.value.path === '/about' ? aboutIconActive : aboutIcon" class="icon" /></RouterLink>
                <RouterLink :to="`/my-favourite-houses`" force="true">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="30" height="30" :fill="router.currentRoute.value.path === '/my-houses' ? 'var(--primary)' : 'var(--tertiary-dark)'">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                    </svg>
                </RouterLink>
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
    width: 100vw;
    background-color: var(--background2);
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.navbar {
    width: 100%;
    max-width: var(--width);
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

.router-link-active {
    color: var(--text-primary);
    font-weight: 800;
}

.logo {
    height: 100%;
}

a {
    font-size: 18px;
    font-weight: 600;
}

.icon {
    height: 25px;
}

@media screen and (max-width: 600px) {
    nav {
        bottom: 0;
        top: auto;
        height: 60px;
    }

    .navbar {
        width: 100%;
        justify-content: space-around;
    }
}
</style>