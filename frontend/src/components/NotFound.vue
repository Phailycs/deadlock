<template>
  <div class="not-found">
    <h1>404 - Page not found</h1>
    <p>Oops, we couldn't find the page you were looking for.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  font-size: 3em;
  color: #eb565b;
}

p {
  font-size: 1.5em;
  color: #333;
}
</style>
