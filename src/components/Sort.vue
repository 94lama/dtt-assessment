<script setup>
import { ref } from 'vue';

defineProps([
    'search', 'type', 'placeholder',
])

const sortValue = ref('price');

</script>

<template>
    <div class="sort-component">
        <button @click="sortValue = 'price'; $emit('emitSorter', sortValue)" :class="sortValue === 'price' ? 'active' : ''">Price</button>
        <button @click="sortValue = 'size'; $emit('emitSorter', sortValue)" :class="sortValue === 'size' ? 'active' : ''">Size</button>
    </div>
</template>

<style scoped>
.sort-component {
    display: grid;
    grid-auto-columns: 0.5fr 0.5fr;
    grid-auto-flow: column;
    width: 100%;
    max-width: 300px;
    border-radius: 5px;
}

button {
    background-color: var(--tertiary-dark);
    width: 150px;
}

.sort-component :nth-child(1) {
    border-radius: 10px 0 0 10px;
}

.sort-component :nth-child(2) {
    border-radius: 0 10px 10px 0;
}

.active {
    background-color: var(--primary);
}

@media screen and (max-width: 600px) {
    .sort-component {
        display: grid;
        grid-auto-columns: 0.5fr 0.5fr;
        grid-auto-flow: column;
        max-width: 100%;
        margin: 10px 0 0 0;
    }

    button {
        background-color: var(--tertiary-dark);
        width: 100%;
    }

    .sort-component :nth-child(1) {
        border-radius: 10px 0 0 10px;
    }

    .sort-component :nth-child(2) {
        border-radius: 0 10px 10px 0;
    }

    .active {
        background-color: var(--primary);
    }
}
</style>