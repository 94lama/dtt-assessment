<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { postHouse, getHouse } from '@/components/API.vue';
import Input from '@/components/Input.vue'

const route = useRoute();

// All the house values are linked to the relative Input component, in the Edit form version, the id allows to fetch info about the house and use the data as preset values.
const city = ref();
const houseNumber = ref();
const houseNumberAddition = ref();
const street = ref();
const zip = ref();
const image = ref();
const price = ref();
const bathrooms = ref();
const bedrooms = ref();
const size = ref();
const description = ref();
const constructionYear = ref();
const hasGarage = ref();

const patternCityInput = "\D";
</script>

<template>
  <div>
    <h1 class="align-left text-left">{{ typeof route.params.id != 'undefined' ? 'Edit listing' : 'Create new listing' }}</h1>
    <form class="form">
      <Input placeholder="Enter the street name" name="street name" @updateValue="(newValue) => street = newValue" :required="true" :validation="patternCityInput" />

      <div class="flex col-gap">
        <Input placeholder="Enter house number" type="number" name="house number" @updateValue="(newValue) => houseNumber = newValue" :required="true" />
        <Input placeholder="e.g. A" name="addition (optional)" @updateValue="(newValue) => houseNumberAddition = newValue" />
      </div>

      <Input placeholder="e.g. 1000 AA" name="postal code" @updateValue="(newValue) => zip = newValue" :required="true" />

      <Input placeholder="e.g. Utrecht" name="city" @updateValue="(newValue) => city = newValue" :required="true" />

      <Input placeholder="picture" type="file" name="upload picture (PNG or JPG)" @updateImage="(newValue) => image = newValue" />

      <Input placeholder="e.g.€150.000" type="number" name="price" @updateValue="(newValue) => price = newValue" :required="true" />

      <div class="flex col-gap">
        <Input placeholder="e.g. 60m2" type="number" name="size" @updateValue="(newValue) => size = newValue" :required="true" />
        <Input placeholder="Select" name="garage" @updateValue="(newValue) => hasGarage = newValue" :required="true" />
      </div>

      <div class="flex col-gap">
        <Input placeholder="Enter amount" type="number" name="bedrooms" @updateValue="(newValue) => bedrooms = newValue" :required="true" />
        <Input placeholder="Enter amount" type="number" name="bathrooms" @updateValue="(newValue) => bathrooms = newValue" :required="true" />
      </div>

      <Input placeholder="e.g. 1990" type="number" name="Construction date" @updateValue="(newValue) => constructionYear = newValue" :required="true" />

      <Input placeholder="Enter description" textarea="textarea" name="description" @updateValue="(newValue) => description = newValue" :required="true" />

      <div class="flex w-100 flex-end">
        <button class="uppercase" @click.prevent="postHouse(
          city,
          houseNumber,
          houseNumberAddition,
          street,
          zip,
          image,
          price,
          bathrooms,
          bedrooms,
          size,
          description,
          constructionYear,
          hasGarage
        )">
          post
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  width: 40%;
  min-width: 400px;
  padding-bottom: 30px;
}
</style>
