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
            searchValue = '';
            $emit('emitInput', searchValue)
        }" class="icon delete">
    </div>
</template>

<style scoped>
.search-component {
    position: relative;
    display: flex;
    padding: 0;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
    height: 40px;
    border-radius: 10px 0 0 10px;
}

.search {
    border-radius: 10px 0 0 10px;
}

.delete {
    position: absolute;
    right: 0;
    border-radius: 0 10px 10px 0;
}

input {
    border: 0;
    width: 100%;
    padding: 0;
    border-radius: 0 10px 10px 0;
    background-color: var(--tertiary);
}

img {
    background-color: var(--tertiary);
    height: 25px;
}

.icon {
    height: 25px;
    width: 25px;
    padding: 13px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--tertiary);
}

@media screen and (max-width: 600px) {
    .search-component {
        border-radius: 5px;
        max-width: 100%;
        height: auto;
        margin: 10px 0;
        border-radius: 10px 0 0 10px;
    }

    .search {
        border-radius: 10px 0 0 10px;
    }

    .delete {
        position: absolute;
        right: 0;
        border-radius: 0 10px 10px 0;
    }

    input {
        border: 0;
        width: 100%;
        padding: 0;
        border-radius: 0 10px 10px 0;
        background-color: var(--tertiary);
    }

    img {
        background-color: var(--tertiary);
        height: 25px;
    }

    .icon {
        height: 15px;
        width: 15px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--tertiary);
    }
}
</style>