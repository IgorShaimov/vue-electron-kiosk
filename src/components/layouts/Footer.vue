<template>
  <div class="footer">
    <img src="@/assets/png/footer.png" />
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .footer {
    width: 100vw;
    height: 11.25vh;
    position: fixed;
    top: 88.75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 1;
    img {
      width: 64%;
    }
  }
</style>
