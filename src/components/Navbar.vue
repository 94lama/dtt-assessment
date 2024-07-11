<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <nav>
    <div class="navbar">
        <img class="logo" src="/img_logo_dtt@3x.png" alt="DTT logo" />
        <RouterLink to="/" >Houses</RouterLink>
        <RouterLink to="/about" >About</RouterLink>
    </div>
</nav>
</template>

<style scoped> 
nav {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--background2);
    justify-content: center;
    align-items: center;
}

.navbar {
    width: var(--width);
    height: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px;
    column-gap: 40px;
}

.router-link-active{
    color: var(--text-primary);
}

.logo {
    height: 100%;
};
</style>