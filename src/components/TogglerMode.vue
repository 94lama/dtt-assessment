<script setup>
import { useUserDataStore } from '@/stores/userData';

const store = useUserDataStore();
</script>

<template>
    <button @click="store.toggleMode()" data-theme-toggle>{{ store.mode === 'light' ? 'Lights off' : 'Lights on' }}</button>
</template>

<style scoped>
button{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
</style>