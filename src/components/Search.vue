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
    position: relative;
    display: flex;
    padding: 0;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
    height: 40px;
    border-radius: 5px 0 0 5px;
}

.search{
    border-radius: 5px 0 0 5px;
}

.delete {
    position: absolute;
    right: 0;
    border-radius: 0 5px 5px 0;
}

input {
    background-color: var(--tertiary-dark);
    border: 0;
    width: 100%;
    padding: 0;
    border-radius: 0 5px 5px 0;
}

img {
    background-color: var(--tertiary-dark);
    height: 30px;
}

.icon{
    height: 30px;
    width: 30px;
    padding: 5px 10px 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--tertiary-dark);
}

@media screen and (max-width: 600px) {
    .search-component {
        max-width: var(--width);
    }
}
</style>