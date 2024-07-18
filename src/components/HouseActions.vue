<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserDataStore } from "@/stores/userData";
import { deleteHouse } from "./API.vue";

import editIcon from "@/assets/images/ic_edit@3x.png";
import darkEditIcon from "@/assets/images/ic_edit_white@3x.png";
import deleteIcon from "@/assets/images/ic_delete@3x.png";
import darkDeleteIcon from "@/assets/images/ic_delete_white@3x.png";

const props = defineProps({
    id: Number,
    madeByMe: Boolean,
})

const store = useUserDataStore();
const router = useRouter();
const alertIsVisible = ref(false);
const heartColor = ref(store.likedHouses.includes(props.id) ?
    'var(--primary)' :
        '#ccc');

function deleteListing(id) {
    if (!store.key) {
        router.push({ name: 'home' });
    }
    deleteHouse(id, store.key)
        .then((res) => {
            return router.push({ name: 'home' });
        })
}

function toggleHouse(id) {
    store.toggleLike(id);
    heartColor.value = heartColor.value === 'var(--primary)' ?
        '#ccc' :
        'var(--primary)';
}
</script>

<template>
    <div class="flex col-gap align-center buttons">
        <!-- Edit button -->
        <RouterLink v-if="madeByMe" :to="{ name: 'edit', params: { 'id': id } }" class="icon"><img :src="store.mode === 'light' ? editIcon : darkEditIcon" class="icon"></RouterLink>

        <!-- Delete button -->
        <button v-if="madeByMe" @click="() => (alertIsVisible = true)" class="a icon"><img :src="store.mode === 'light' ? deleteIcon : darkDeleteIcon" class="icon"></button>

        <!-- Like button -->
        <button @click.prevent="() => { toggleHouse(id) }" class="a icon">
            <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="50" height="50" :fill="heartColor">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
            </svg>
        </button>
    </div>

    <!-- Deleting alert -->
    <div class="confirmation flex column align-center justify-center" v-if="alertIsVisible">
        <div class="alert flex column row-gap">
            <h2 class="h1 text-center">Delete listing</h2>
            <p class="text-center">Are you sure you want to delete this listing?<br />
                This action cannot be undone.</p>
            <div class="flex column row-gap align-center justify-center">
                <button @click="() => deleteListing(id)" class="uppercase w-100">yes, delete</button>
                <button @click="() => { alertIsVisible = false }" class="uppercase w-100 color-dark">go back</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buttons {
    height: 25px;
}

.icon {
    width: 20px;
    padding: 0;
    margin: 0;
}

.confirmation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(var(--secondary-rgb), 0.4);
    z-index: 100;
}

.alert {
    width: 400px;
    max-width: var(--width);
    padding: 50px 150px;
    background-color: var(--background2);
    border-radius: 10px;
}

.color-dark {
    background-color: var(--secondary)
}

@media screen and (max-width: 600px) {
    .buttons {
        height: 25px;
    }

    .icon {
        height: 15px;
        width: 12px;
        padding: 0;
        margin: 0;
    }

    .alert{
        width: 60%;
        padding: 50px
    }
}
</style>