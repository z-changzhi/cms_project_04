<template>
  <div>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'my-ul',
  data() {
    return {};
  }
};
</script>
 
<style scoped>
/* scoped 生命周期 早于动态生成的 html */
ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
 