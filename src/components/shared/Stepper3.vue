<template>
  <div class="stepper">
    <div class="big-rect" :class="{'active': stepper == 1, 'done': stepper > 1}"></div>
    <div class="hr"></div>
    <div class="big-rect" :class="{'done': stepper > 2}" v-if="stepper !== 2"></div>
    <transition name="step">
    <div class="big-rect active" v-if="stepper === 2"></div>
    </transition>
    <div class="hr"></div>
    <div class="big-rect" :class="{'done': stepper > 3}" v-if="stepper !== 3"></div>
    <transition name="step">
    <div class="big-rect active" v-if="stepper === 3"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Stepper3',
  props: {
    stepper: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .stepper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    .step-enter-from {
      transform: translateX(-100px);
    }
    .step-enter-to {
      transition: all .5s ease-in;
    }
    .big-rect {
      width: 62px;
      height: 62px;
      border-radius: 10px;
      background-color: #A8DCF2;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background-color: #82BC00;
        border: solid 2px #94C91F;
        box-shadow: 0px 12.1094px 36.3281px rgba(165, 224, 32, 0.59);
        &:before {
          content: '';
          width: 30px;
          height: 30px;
          background-color: white;
        }
      }
      &.done {
        background-color: #82BC00;
        border: solid 2px #94C91F;
        box-shadow: 0px 12.1094px 36.3281px rgba(165, 224, 32, 0.59);
        &:before {
          content: '';
          width: 30px;
          height: 20px;
          background: url('~@/assets/svg/stepper-check.svg');
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
    .hr {
      width: 50px;
      height: 3px;
      background-color: white;
      opacity: 0.5;
    }
  }
</style>