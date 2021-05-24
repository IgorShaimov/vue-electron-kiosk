<template>
  <div class="backbutton">
    <img src="@/assets/svg/chevron-left-white.svg" v-if="color ==='white'"/>
    <img src="@/assets/svg/chevron-left-blue.svg" v-if="color ==='blue'"/>
    <span :class="{'white': color === 'white', 'blue': color === 'blue'}">Back</span>
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    color: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .backbutton {
    position: absolute;
    top: 70px;
    left: 30px;
    display: flex;
    align-items: center;
    z-index: 1;
    img {
      width: 80px;
      height: 80px;
    }
    span {
      font-size: 30px;
      &.white {
        color: white;
      }
      &.blue {
        color: var(--primary-blue);
      }
    }
  }
</style>