<script setup>
import { ref } from 'vue';
import DTTImage from '@/assets/images/img_logo_dtt@3x.png';

const windowWidth = window.innerWidth;
</script>

<template>
  <div>
    <h1 v-if="windowWidth < 600">About</h1>
    <section class="my-2 text-left w-100">
      <h2>About DTT Real Estate</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus esse modi repellendus doloremque culpa voluptates ratione, mollitia provident, similique ipsam facilis tempore ab voluptatem natus incidunt dolores sapiente consequatur veniam nam laborum. Ea delectus modi dolores alias. Praesentium possimus in ut velit cupiditate ab dolor, iste maiores modi.</p>
      <p>Doloribus quisquam iusto sunt ratione? Dolorum quod maxime, mollitia iure, consequatur inventore vero laudantium dolor beatae excepturi culpa sed nemo reiciendis quae sunt, perferendis temporibus enim tempore libero! Obcaecati ratione ullam, ab saepe aliquam expedita. Expedita sint quia impedit voluptate fugit id officia sunt, corrupti excepturi modi velit incidunt nulla odit iure.</p>
    </section>
    <section class="my-2 text-left w-100">
      <h2>Design and Development</h2>
      <div class="link-area">
        <img :src="DTTImage" />
        <div class="text-left">
          <p>By DTT</p>
          <a href="https://www.d-tt.nl">www.d-tt.nl</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
section{
padding: 40px 0;
}

h2 {
  margin: 10px 0 30px 0;
}

.link-area {
  display: flex;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}

img {
  height: 60px;
}

a {
  display: block;
  text-align: left
}

@media screen and (max-width: 600px) {
  section{
    padding: 10px 0;
  }

  h2{
    margin: 10px 0;
  }

  img{
    height: 30px;
  }

  a {
    font-size: 12px;
  }
}
</style>
