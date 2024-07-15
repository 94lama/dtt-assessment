<script>
import axios from 'axios';
import { useFetch } from '@vueuse/core';

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
        axios.post(`https://api.intern.d-tt.nl/api/houses${id?'/'+id:''}`, formData)
            .then(response => response.status < 300 ? response.data : null)
            .then((data) => {
                id = id??data.id;
                postImage(id, image);
            })
    } catch (error) {
        console.error(error.response)
    }
}

function postImage(id, image) {
    const formData = new FormData();
    formData.append('image', image);
    console.log('form: ', formData)

    try {
        axios.post(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
            .then(response => {
                console.log('response: ', response)
                return response.status < 300 ? response.data : null})
    } catch (error) {
        console.error(error.response)
    }
}

export function deleteHouse(id) {
    console.log('delete function called')
    try {
        axios.delete(`https://api.intern.d-tt.nl/api/houses/${id}`)
        .then(response => response.status < 300 ? response.data : console.log(response))
    } catch (error) {
        console.error(error);
    }
}


/* export function createHouseObject(city, houseNumber, houseNumberAddition, street, zip, image, price, bathrooms, bedrooms, size, description, constructionYear, hasGarage){
    return {price: price, location: {'city': city, 'zip': zip, 'street': street}, }
} */
</script>