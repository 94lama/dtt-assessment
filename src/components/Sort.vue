<script setup>
import { ref } from 'vue';
import searchIcon from '@/assets/images/ic_search@3x.png';
import deleteSearch from '@/assets/images/ic_delete@3x.png';

defineProps([
    'search', 'type', 'placeholder',
])

const sortValue = ref('price');

</script>

<template>
    <div class="sort-component">
        <button @click="sortValue= 'price'; $emit('emitSorter', sortValue)" :class="sortValue === 'price' ? 'active' : ''">Price</button>
        <button @click="sortValue= 'size'; $emit('emitSorter', sortValue)" :class="sortValue === 'size' ? 'active' : ''">Size</button>
    </div>
</template>

<style scoped>
.sort-component {
    display: grid;
    grid-auto-columns: 0.5fr 0.5fr;
    grid-auto-flow: column;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    max-width: 200px;
    height: 30px;
    border-radius: 5px;
}

button {
    padding: 5px;
    background-color: var(--tertiary-dark);
}

.sort-component :nth-child(1) {
    border-radius: 5px 0 0 5px;
}

.sort-component :nth-child(2) {
    border-radius: 0 5px 5px 0;
}

.active {
    background-color: var(--primary);
}

@media screen and (max-width: 600px) {
    .sort-component {
        max-width: var(--width);
    }
}
</style>