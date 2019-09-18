<template>
  <div>
    <div class="a">这是一个div</div>
    <span class="b">这是一个span</span>
    <p class="c">这是一个p标签</p>
    <button @click="$router.push('/a')"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "this is my vue for test"
    };
  }
};
</script>

<style scoped>
@import "./a.css";
</style>
