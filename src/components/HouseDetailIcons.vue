<script setup>
const props = defineProps({
    image: String,
    value: [Number, String],
    size: String,
})

</script>

<template>
    <div :class="'card-icon ' + props.size" id={{id}}>
        <img :src="image" alt="House image">
        <p :class="'information ' + props.size">{{ value }}</p>
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

.sm {
    font-size: 12px;
    column-gap: 5px;
    height: 12px;
}

.sm img {
    height: 12px;
}

.sm .card-icon {
    height: 12px;
    width: auto;
}

.sm p {
    height: auto;
    margin: 0 5px;
}

@media screen and (max-width: 600px) {
img {
    height: 12px;
}
}
</style>