<script setup>
import { ref } from 'vue';
import searchIcon from '@/assets/images/ic_search@3x.png';
import deleteSearch from '@/assets/images/ic_delete@3x.png';

defineProps([
    'search', 'type', 'placeholder',
])

const searchValue = ref('qwe');

</script>

<template>
    <div class="search">
        <button @click="$emit('emitInput', searchValue)">
            <img :src="searchIcon" alt="search icon">
        </button>
        <input :type="type" :placeholder="placeholder" v-model="searchValue" >
        <img v-if="searchValue" :src="deleteSearch" alt="delete icon" @click="() => searchValue=''" class="icon">
    </div>
</template>

<style scoped>
.search{
    display: flex;
    padding: 10px;
    border-radius: 5px;
}

input {
    background-color: var(--tertiary-dark);
    border: 0;
    width: 100%;
    height: 20px;
    padding: 5px;
}

button {
    height: 30px;
    padding: 10px 10px 10px 20px;
    border-radius: 5px 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--tertiary-dark);
}

img {
    background-color: var(--tertiary-dark);
    height: 20px;
}

.icon{
    height: 20px;
    padding: 5px 20px 5px 10px;
    border-radius: 0 5px 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--tertiary-dark);
}
</style>