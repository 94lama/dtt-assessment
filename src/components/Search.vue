<script setup>
import { ref } from 'vue';
import searchIcon from '@/assets/images/ic_search@3x.png';
import deleteSearch from '@/assets/images/ic_delete@3x.png';

defineProps([
    'search', 'type', 'placeholder',
])

const searchValue = ref('');

</script>

<template>
    <div class="search-component">
        <img :src="searchIcon" alt="search icon" class="search icon">
        <input :type="type" :placeholder="placeholder" v-model="searchValue" @keyup="$emit('emitInput', searchValue)">
        <img v-if="searchValue" :src="deleteSearch" alt="delete icon" @click="() => {
            searchValue='';
            $emit('emitInput', searchValue)
            }" class="icon delete">
    </div>
</template>

<style scoped>
.search-component{
    display: flex;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    border-radius: 5px 0 0 5px;
}

.search{
    border-radius: 5px 0 0 5px;
}

.delete {
    border-radius: 0 5px 5px 0;
}

input {
    background-color: var(--tertiary-dark);
    border: 0;
    width: 100%;
    height: 20px;
    padding: 5px;
}

img {
    background-color: var(--tertiary-dark);
    height: 20px;
}

.icon{
    height: 20px;
    width: 20px;
    padding: 5px 20px 5px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--tertiary-dark);
}
</style>