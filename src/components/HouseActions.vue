<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserDataStore } from "@/stores/userData";
import { deleteHouse } from "./API.vue";

import editIcon from "@/assets/images/ic_edit@3x.png";
import darkEditIcon from "@/assets/images/ic_edit_white@3x.png";
import deleteIcon from "@/assets/images/ic_delete@3x.png";
import darkDeleteIcon from "@/assets/images/ic_delete_white@3x.png";

defineProps({
    id: Number
})

const store = useUserDataStore();
const router = useRouter();
const alertIsVisible = ref(false);

function deleteListing(id) {
    deleteHouse(id, storage.key)
        .then((res) => {
            return router.push({ name: 'home' });
        })
}

</script>

<template>
    <div class="flex col-gap align-center buttons">
        <RouterLink :to="{ name: 'edit', params: { 'id': id } }" class="icon"><img :src="store.mode === 'light' ? editIcon : darkEditIcon" class="icon"></RouterLink>
        <button @click="() => (alertIsVisible = true)" class="a icon"><img :src="store.mode === 'light' ? deleteIcon : darkDeleteIcon" class="icon"></button>
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
    height: 28px;
    width: 23px;
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
        height: 18px;
        width: 15px;
        padding: 0;
        margin: 0;
    }
}
</style>