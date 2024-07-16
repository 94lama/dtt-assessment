<script>
import axios from 'axios';
import { useFetch } from '@vueuse/core';
import router from '@/router';
import { useRouter } from 'vue-router';

axios.defaults.headers.common['X-Api-Key'] = '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC';
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';

export async function getHouse(id) {
    const { isFetching, data, error } = await useFetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers: { 'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC' },
    })
    return JSON.parse(data.value)[0];
}

export function postHouse(city, houseNumber, houseNumberAddition, street, zip, image, price, bathrooms, bedrooms, size, description, constructionYear, hasGarage, id) {
    const formData = new FormData();

    formData.append('price', price);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('size', size);
    formData.append('streetName', street);
    formData.append('houseNumber', houseNumber);
    formData.append('houseNumberAddition', houseNumberAddition);
    formData.append('zip', zip);
    formData.append('city', city);
    formData.append('constructionYear', constructionYear);
    formData.append('hasGarage', hasGarage);
    formData.append('description', description);

    try {
        axios.post(`https://api.intern.d-tt.nl/api/houses/${id ?? ''}`, formData)
            .then(response => response.data)
            .then((data) => postImage(id?id:data.id, image))
    } catch (error) {
        console.error(error.response)
    }
}

function postImage(id, image) {
    const formData = new FormData();
    formData.append('image', image);

    try {
        axios.post(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, formData)
            .then(() => router.push(`/houses/${id}`))
            .then(() => {return location.reload()})
    } catch (error) {
        console.error(error.response)
    }
}

export function deleteHouse(id) {
    try{
        axios.delete(`https://api.intern.d-tt.nl/api/houses/${id}`)
        .then(() => router.push('/'))
        .then(() => {return location.reload()})
    } catch (error) {
        console.error(error.response)
    }
}
</script>