<script setup>
defineProps({
    image: String,
    value: Number,
    fontClassSize: {type: String, required: false},
})

</script>

<template>
    <div class="card-icon m-1" id={{id}}>
        <img :src="image" alt="House image">
        <p :class="fontClassSize">{{ value }}</p>
    </div>
</template>

<style scoped>
.card-icon {
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 0px 5px;
    height: 20px;
}

img {
    height: 25px;
    object-fit: cover;
}
</style>