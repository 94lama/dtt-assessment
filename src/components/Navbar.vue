<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import logo from '@/assets/images/img_logo_dtt@3x.png';

const router = useRouter();
</script>

<template>
  <nav>
    <div class="navbar">
        <img class="logo" :src="logo" alt="DTT logo" />
        <RouterLink to="/" >Houses</RouterLink>
        <RouterLink to="/about" >About</RouterLink>
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
</style>