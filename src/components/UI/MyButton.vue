<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scope>
.btn {
  margin-top: 15px;
  margin-left: 15px;
  
  padding: 10px 25px;
  background: rgb(205, 255, 255);
  color: teal;
  border: 1px solid teal;
  font-weight:600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  
}
</style>