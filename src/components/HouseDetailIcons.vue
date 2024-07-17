<script setup>
defineProps({
    image: String,
    value: Number,
    fontClassSize: {type: String, required: false},
})

</script>

<template>
    <div class="card-icon" id={{id}}>
        <img :src="image" alt="House image">
        <p :class="fontClassSize + ' information'">{{ value }}</p>
    </div>
</template>

<style scoped>
.card-icon {
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 0px;
    height: 20px;
}

img {
    height: 20px;
    padding: 0;
    object-fit: cover;
}

@media screen and (max-width: 600px) {
img {
    height: 12px;
}
}
</style>