<script setup>
import { ref } from 'vue';
import searchIcon from '@/assets/images/ic_search@3x.png';
import deleteSearch from '@/assets/images/ic_delete@3x.png';

defineProps([
    'type', 'placeholder',
])

const searchValue = ref('');
const message = ref(true);

function removeMessage() {
    message.value = false;
}

function verifyQuery() {
    
    if (searchValue.value.match(regex)) {
        zip.value = searchValue.value.slice(searchValue.value.search(regex) + 5, 7)
        const returnSearchValue = searchValue.slice(0, searchValue.value.search(regex));
        console.log(zip.value)
        return [returnSearchValue, zip.value]
    } else return [searchValue, zip.value]

}
</script>

<template>
    <div class="search-component">
        <img :src="searchIcon" alt="search icon" class="search icon">
        <input :type="type" :placeholder="placeholder" v-model="searchValue" @keyup="() => $emit('emitInput', searchValue)">
        <img v-if="searchValue" :src="deleteSearch" alt="delete icon" @click="() => {
            searchValue = '';
            $emit('emitInput', searchValue)
        }" class="icon delete">
    </div>
    <div v-if="!searchValue && message" class="message" @click="removeMessage()">
        <h3>Search tips:</h3>
        <p class="smallText">
            Search for houses by city. You may also search for a specific zip code by adding (without spaces between) ":" followed by the 4 digits of the zip code that you are looking for at the end of your reseach.
            <br>Click here to remove.
        </p>
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

.message {
    position: absolute;
    translate: 0 60px;
    border-radius: 10px;
    background-color: var(--tertiary);
    padding: 10px;
    max-width: 280px;
}

.smallText {
    font-size: 14px;
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