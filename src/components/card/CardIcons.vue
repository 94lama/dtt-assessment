<script setup>
defineProps({
    image: String,
    value: String
})

</script>

<template>
    <div class="card-icon m-0" id={{id}}>
        <img :src="image ?? defaultImage" alt="House image" class="image">
        <p>{{ value }}</p>
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

.image {
    height: 15px;
    object-fit: cover;
}
</style>