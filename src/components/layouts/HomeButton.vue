<template>
  <div class="homebutton" @click="goToHome()">
    <img src="@/assets/svg/logout.svg" v-if="type === 'logout'" />
    <img src="@/assets/svg/home.svg" v-else />
  </div>
</template>

<script>
export default {
  name: 'HomeButton',
  props: {
    type: String
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .homebutton {
    position: absolute;
    top: 50px;
    right: 50px;
    padding: 20px;
    background-color: var(--primary-blue);
    border-radius: 30px;
    z-index: 1;
    img {
      width: 80px;
    }
  }
</style>