<script setup>
import { RouterLink, useRouter } from "vue-router";
import { deleteHouse } from "./API.vue";

import editIcon from "@/assets/images/ic_edit@3x.png";
import deleteIcon from "@/assets/images/ic_delete@3x.png";

defineProps({
    id: Number
})

const router = useRouter();

function deleteListing(id) {
    window.confirm('Do you really want to delete this listing?');
    deleteHouse(id)
    .then((res) => {
        router.push({name: 'home'});
    })
}
</script>

<template>
    <div class="flex col-gap align-center buttons">
        <RouterLink :to="{ name: 'edit', params: { 'id': id } }" class="icon"><img :src="editIcon" class="icon"></RouterLink>
        <button @click="deleteListing(id)" class="a icon"><img :src="deleteIcon" class="icon"></button>
    </div>
</template>

<style scoped>
.buttons {
    height: 19px;
}

.icon {
    height: 18px;
    width: 15px;
    padding: 0;
    margin: 0;
}
</style>