<script setup>
import { useUserDataStore } from '@/stores/userData';

const store = useUserDataStore();
window.matchMedia('(prefers-color-scheme: dark)').matches ? store.toggleMode() : null;
</script>

<template>
    <button @click="store.toggleMode()" data-theme-toggle :class="store.mode === 'light' ? 'light' : 'dark'">
        <svg id="Layer_1" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
            <path d="m8 20.149v3.851h8v-3.685a6.005 6.005 0 0 1 1.932-4.552 9 9 0 1 0 -12.064-.18 6.263 6.263 0 0 1 2.132 4.566zm6 1.851h-4v-1.851c0-.05-.007-.1-.008-.149h4.024c0 .105-.016.209-.016.315zm-8.94-13.925a7 7 0 1 1 11.553 6.184 7.655 7.655 0 0 0 -2.293 3.741h-1.32v-7.184a3 3 0 0 0 2-2.816h-2a1 1 0 0 1 -2 0h-2a3 3 0 0 0 2 2.816v7.184h-1.322a8.634 8.634 0 0 0 -2.448-3.881 6.96 6.96 0 0 1 -2.17-6.044z" />
        </svg>
    </button>
</template>

<style scoped>
button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;
}

.light {
    background-color: transparent;
}

.dark {
    background-color: rgb(244, 244, 184);
}

@media screen and (max-width: 600px) {
    button {
        width: 40px;
        height: 40px;
        padding: 0;
        bottom: -5px;
    }
}
</style>