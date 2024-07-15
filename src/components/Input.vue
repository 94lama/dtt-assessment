<script setup>
import { ref } from 'vue';
import defaultImage from '@/assets/images/ic_plus_grey@3x.png';

// The props allows a good variety of possibilities for the input. In this way most of the inputs for the app can be covered with just one component.
defineProps({
    preSetValue: { type: String, required: false },
    name: { type: String },
    required: { type: Boolean, default: false },
    placeholder: { type: String, required: false },
    type: { type: String },
})
const emit = defineEmits(['updateValue']);

const isRequired = typeof required != 'undefined' ? true : false;

let value = ref();

function loadImage(event) {
    value.value = URL.createObjectURL(event.target.files[0])
    emit('updateImage', value)
}
</script>

<template>
    <!-- Textarea input -->
    <div class="flex column row-gap align-left text-left m-0 my-2 w-100" v-if="type === 'textarea'">
        <label :for="name">{{ name + (required ? ' *' : '') }}</label>
        <textarea :id="name" :required="required" @keyup="$emit('updateValue', value)" v-model="value" :placeholder="placeholder"></textarea>
        <span v-if="!value && required" class="error">Please add a value.</span>
    </div>

    <!-- type = 'file' -->
    <div class="flex column row-gap align-left text-left m-0 my-2 w-100" v-else-if="type === 'file'">
        <label>{{ name + (required ? ' *' : '') }}</label>
        <label :for="name" class="img-label">
            <img :src="value??defaultImage" alt="house image" :class="value?'img-house': ''" />
        </label>
        {{ 'value: ', typeof value }}
        <input :id="name" :placeholder="placeholder" v-model="value" :type="type" @input="loadImage" :required="isRequired" class="input-file" accept="jpg, png" />
        <span v-if="!value && required" class="error">Please add a value.</span>
    </div>

    <!-- Regular input -->
    <div class="flex column row-gap align-left text-left m-0 my-2 w-100" v-else>
        <label :for="name">{{ name + (required ? ' *' : '') }}</label>
        <input :id="name" :placeholder="placeholder" v-model="value" :type="type" @keyup="$emit('updateValue', value)" :required="isRequired" />
        <span v-if="!value && required" class="error">Please add a value.</span>
    </div>
</template>

<style scoped>
input,
textarea {
    border-radius: 5px;
    border: 0;
}

label {
    text-transform: lowercase;
}

label::first-letter {
    text-transform: capitalize;
}

img{
    height: 50px;
    aspect-ratio: 1 / 1;
    object-fit: contain;
}
.img-house{
    height: 100px;
}

.img-label{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23c3c3c3' stroke-width='4' stroke-dasharray='10' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
}

.input-file{
    width: 100px;
    height: 0px;
    background-color: transparent;
    border: 2px;
    border-color: var(--tertiary-dark);
    background-image: "url('/src/assets/images/ic_plus_grey@3x.png')";
}
</style>