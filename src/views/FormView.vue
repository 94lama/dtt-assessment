<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Input from '@/components/Input.vue';
import { getHouse, postHouse } from '@/components/API.vue';

const route = useRoute();
const id = route.params.id ?? null;
const loaded = ref(false);

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
const hasGarage = ref('False');

if (id) {
  getHouse(id)
    .then((house) => {
      console.log(house);
      city.value = house.location.city;
      houseNumber.value = house.location.houseNumber;
      houseNumberAddition.value = house.location.houseNumberAddition;
      street.value = house.location.street;
      zip.value = house.location.zip;
      image.value = house.image;
      price.value = house.price;
      bathrooms.value = house.rooms.bathrooms;
      bedrooms.value = house.rooms.bedrooms;
      size.value = house.size;
      description.value = house.description;
      constructionYear.value = house.constructionYear;
      hasGarage.value = house.hasGarage
      loaded.value = true
    })
} else {
  loaded.value = true
}

const errors = ref([]);
const notNumbers = /\d/g;

function validateInputs(values = []) {
  let validator = true;

  for (let i = 0; i < values.length; i++) {
    if (!values[i]) {
      errors.value[i] = 'Required field missing.';
      validator = false;
    } else if ([0, 3].includes(i) && values[i].match(notNumbers)) {
      errors.value[i] = 'This field can not contain numbers.';
      validator = false;
    } else errors.value[i] = '';
  }

  return validator
}

function postFormData(city, houseNumber, houseNumberAddition, street, zip, image, price, bathrooms, bedrooms, size, description, constructionYear, hasGarage, id = null) {
  if (validateInputs([street, houseNumber, zip, city, image, price, size, hasGarage, bedrooms, bathrooms, constructionYear, description])) {
    return postHouse(city, houseNumber, houseNumberAddition, street, zip, image, price, bathrooms, bedrooms, size, description, constructionYear, hasGarage, id);
  } else alert('Something went wrong')
}
</script>

<template>
  <div>
    <div class="background"> </div>
    <h1 class="align-left text-left">{{ typeof route.params.id != 'undefined' ? 'Edit listing' : 'Create new listing' }}</h1>
    <form class="form" v-if="loaded">
      <Input placeholder="Enter the street name" name="street name" @updateValue="(newValue) => street = newValue" :required="true" :error="errors[0]" :preSetValue="street" />

      <div class="flex col-gap">
        <Input placeholder="Enter house number" type="number" name="house number" @updateValue="(newValue) => houseNumber = newValue" :required="true" :error="errors[1]" :preSetValue="houseNumber" />
        <Input placeholder="e.g. A" name="addition (optional)" @updateValue="(newValue) => houseNumberAddition = newValue" :preSetValue="houseNumberAddition" />
      </div>

      <Input placeholder="e.g. 1000 AA" name="postal code" @updateValue="(newValue) => zip = newValue" :required="true" :error="errors[2]" :preSetValue="zip" />

      <Input placeholder="e.g. Utrecht" name="city" @updateValue="(newValue) => city = newValue" :required="true" :error="errors[3]" :preSetValue="city" />

      <Input placeholder="picture" type="file" name="upload picture (PNG or JPG)" @updateImage="(newValue) => image = newValue" :error="errors[4]" :preSetValue="image" />

      <Input placeholder="e.g.€150.000" type="number" name="price" @updateValue="(newValue) => price = newValue" :required="true" :error="errors[5]" :preSetValue="price" />

      <div class="flex col-gap">
        <Input placeholder="e.g. 60m2" type="number" name="size" @updateValue="(newValue) => size = newValue" :required="true" :error="errors[6]" :preSetValue="size" />
        <Input name="garage" type="boolean" @updateValue="(newValue) => hasGarage = newValue" :required="true" :error="errors[7]" :presetValue="hasGarage" :preSetValue="hasGarage" />
      </div>

      <div class="flex col-gap">
        <Input placeholder="Enter amount" type="number" name="bedrooms" @updateValue="(newValue) => bedrooms = newValue" :required="true" :error="errors[8]" :preSetValue="bedrooms" />
        <Input placeholder="Enter amount" type="number" name="bathrooms" @updateValue="(newValue) => bathrooms = newValue" :required="true" :error="errors[9]" :preSetValue="bathrooms" />
      </div>

      <Input placeholder="e.g. 1990" type="number" name="Construction date" @updateValue="(newValue) => constructionYear = newValue" :required="true" :error="errors[10]" :preSetValue="constructionYear" />

      <Input placeholder="Enter description" type="textarea" name="description" @updateValue="(newValue) => description = newValue" :required="true" :error="errors[11]" :preSetValue="description" />

      <div class="flex w-100 flex-end">
        <button class="uppercase" @click.prevent="postFormData(
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
      hasGarage,
      id
    )">
          post
        </button>
      </div>
    </form>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.background{
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: -1;
  background-image: url('../assets/images/img_background@3x.png');
  background-position: 100% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.7;
}

.form {
  width: 40%;
  min-width: 400px;
  padding-bottom: 30px;
}
</style>
