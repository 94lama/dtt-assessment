<script setup>
import { ref } from 'vue';
import defaultImage from '@/assets/images/ic_plus_grey@3x.png';

// The props allows a good variety of possibilities for the input. In this way most of the inputs for the app can be covered with just one component.
const props = defineProps({
    preSetValue: { type: [String, Number, Boolean], default: null },
    name: { type: String },
    inputValue: { type: String },
    required: { type: Boolean, default: false },
    placeholder: { type: String, required: false },
    type: { type: String },
    error: { type: String }
})

// General settings and methods
const emit = defineEmits(['loadImage', 'updateImage', 'updateValue']);
const isRequired = typeof props.required != 'undefined' ? props.required : false;
const value = ref(props.preSetValue);

// Methods for the file input
const imageValue = ref();

function loadImage(event) {
    emit('updateImage', event.target.files[0])
    value.value = URL.createObjectURL(event.target.files[0])
    imageValue = event.target.files[0]
}

// Methods for the boolean input
function toggleBoolean() {
    value.value = value.value == 'True' ?
        'False' :
        'True';
    emit('updateValue', value.value)
}
</script>

<template>
    <div class="flex column row-gap align-left text-left m-0 my-2 w-100">
        <label :for="name">{{ name + (required ? ' *' : '') }}</label>

        <!-- type = 'file' -->
        <label v-if="type === 'file'" :for="name" class="img-label">
            <img :src="value ?? defaultImage" alt="house image" :class="value ? 'img-house' : ''" />
        </label>
        <input v-if="type === 'file'" :id="name" :placeholder="placeholder" v-model="imageValue" :type="type" @input="loadImage" :required="isRequired" class="input-file" accept="jpg, png" />

        <!-- Textarea input -->
        <textarea v-else-if="type === 'textarea'" :id="name" rows='5' :required="required" @keyup="$emit('updateValue', value)" v-model="value" :placeholder="placeholder">{{ value }}</textarea>

        <!-- Boolean value -->
        <button class="input" v-else-if="type === 'boolean'" type="button" :id="name" :type="type" @click="toggleBoolean" :required="isRequired">{{ value }}</button>

        <!-- Regular input -->
        <input :id="name" :placeholder="placeholder" v-model="value" :type="type" @keyup="$emit('updateValue', value)" :required="isRequired" v-else />

        <span v-if="error" class="error">{{ error }}</span>
    </div>
</template>

<style scoped>
label {
    text-transform: lowercase;
    color: var(--black);
}

label::first-letter {
    text-transform: capitalize;
}

img {
    height: 50px;
    aspect-ratio: 1 / 1;
    object-fit: contain;
}

.img-house {
    height: 100px;
}

.img-label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23c3c3c3' stroke-width='5' stroke-dasharray='12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
}

.input-file {
    width: 100px;
    height: 0px;
    background-color: transparent;
    padding: 0;
}

.red-border {
    border: 1px solid red;
}
</style>