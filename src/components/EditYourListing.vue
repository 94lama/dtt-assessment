<script setup>
import editIcon from "@/assets/images/ic_edit@3x.png";
import deleteIcon from "@/assets/images/ic_delete@3x.png";

defineProps({
    id: Number
})

function deleteListing(){
    alert('Do you really want to delete this listing?')
}
</script>

<template>
    <div class="flex col-gap">
        <RouterLink :to="'/houses/' + id + '/edit'"><img :src="editIcon" class="icon"></RouterLink>
        <a href="/" @click="deleteListing"><img :src='deleteIcon' class="icon"></a>
    </div>
</template>

<style scoped>
.icon{
  height: 18px;
  width: 15px;
  margin: 0;
}
</style>