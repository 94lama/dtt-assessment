<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import HouseActions from '@/components/HouseActions.vue';
import HouseDetailIcons from '@/components/HouseDetailIcons.vue';
import defaultImage from '@/assets/images/img_placeholder_house@3x.png';
import bedIcon from '@/assets/images/ic_bed@3x.png';
import bathIcon from '@/assets/images/ic_bath@3x.png';
import sizeIcon from '@/assets/images/ic_size@3x.png';


const router = useRouter();

const props = defineProps({
    cardSize: String,
    id: Number,
    location: Object,
    image: String,
    price: Number,
    rooms: Object,
    size: Number,
    description: String,
    constructionYear: Number,
    hasGarage: Boolean,
    madeByMe: Boolean
})
</script>

<template>
    <div :class="'card ' + props.cardSize" id={{id}}>
        <RouterLink :to="'/houses/' + id" class="image">
            <img :src="image ?? defaultImage" alt="House image" class="image">
        </RouterLink>
        <div class="content w-100 flex column">
            <div class="flex">
                <h2 @click="router.push('/houses/' + id)" class="w-100">{{ location.street + ' ' + location.houseNumber }}</h2>
                <HouseActions v-if="typeof props.cardSize !== 'undefined' && props.cardSize !== 'sm'" :id="id" :madeByMe="madeByMe"></HouseActions>
            </div>
            <p @click="router.push('/houses/' + id)">€ {{ price }}</p>
            <p @click="router.push('/houses/' + id)">{{ location.zip + ' ' + location.city }}</p>
            <div class="flex iconsContainer" @click="router.push('/houses/' + id)">
                <HouseDetailIcons :value="rooms.bedrooms" :image="bedIcon" :size="cardSize" />
                <HouseDetailIcons :value="rooms.bathrooms" :image="bathIcon" :size="cardSize" />
                <HouseDetailIcons :value="size + ' m2'" :image="sizeIcon" :size="cardSize" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background-color: var(--background2);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    margin: 15px 0;
    width: var(--width);
    height: 240px;
    max-width: 100%;
}

.image {
    height: 190px;
    aspect-ratio: 1/1;
    margin: 25px;
    border-radius: 10px;
    object-fit: cover;
}

.content {
    margin: 25px;
    text-align: left;
}

h2,
p,
.iconsContainer {
    padding: 10px 0;
    margin: 0;
}

h2 {
    text-overflow: ellipsis;
    max-height: 20px;
}

.sm {
    border-radius: 5px;
    width: 100%;
    height: 120px;
}

.sm .image {
    height: 100px;
    margin: 10px;
    border-radius: 5px;
}

.sm h2,
.sm p,
.sm .iconsContainer {
    padding: 5px 0;
    font-size: 12px;
    margin: 0;
}

.sm > .icon {
    height: 5px !important;
}

.sm .content{
    margin: 5px;
}

@media screen and (max-width: 600px) {
    .card {
        border-radius: 5px;
        margin: 10px 0;
        width: 100%;
        height: auto;
    }

    .content {
        margin: 10px;
        height: 100px;
        column-gap: 0px;
    }

    .image {
        height: 100px;
        margin: 10px;
        border-radius: 5px;
    }

    h2,
    p,
    .iconsContainer {
        padding: 5px 0;
        margin: 0;
    }

    h2 {
        text-overflow: ellipsis;
        overflow: hidden;
        max-height: 13px;
    }
}
</style>