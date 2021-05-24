<template>
  <div class="splash" :class="{'bg-splash-1': step === 1, 'bg-splash-2': step === 2}">
    
    <transition name="slide">
      <div class="container" v-if="step === 1">
        <div class="title">
          <p>Resident</p>
          <p>Services</p>
          <p>Available</p>
          <p>Here</p>
        </div>
        <div class="icons">
          <img src="@/assets/svg/vehicle.svg" />
          <img src="@/assets/svg/announcement.svg" />
          <img src="@/assets/svg/service.svg" />
        </div>
      </div>
      <div class="container" v-else>
        <div class="title">
          <p>Request</p>
          <p>Visitor</p>
          <p>Parking</p>
          <p>Here</p>
        </div>
        <div class="icons">
          <img src="@/assets/svg/vehicle.svg" />
          <img src="@/assets/svg/parking.svg" />
          <img src="@/assets/png/parking-user.png" />
        </div>
      </div>    
    </transition>

    <div class="action">
      <div class="big-btn" @click="goToWelcome()">TOUCH TO START</div>
    </div>
    <div class="progress-bar">
      <div class="dots">
        <div class="dot" v-for="index in 2" :key="index" :class="{'active': index === step}"></div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'Splash',
  data() {
    return {
      step: 1,
      splash_timer: null
    }
  },
  watch: {
    // whenever question changes, this function will run
    $route: function (to) {
      if (to.name === 'SplashScreen') {
        this.step = 1;
      }
    }
  },
  mounted() {
    this.splash_timer = setInterval(() => {
      this.goToNextStep();
    }, 2000)
  },
  methods: {
    goToNextStep() {
      if (this.step < 2) {
        ++this.step;
      } else {
        this.step = 1;
      }
    },
    goToWelcome() {
      clearInterval(this.splash_timer);
      this.$router.push('Welcome');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .splash-screen {
    transition: all 0.5s ease-in-out;
    .title {
      transform: translateX(0);
      transition: all 0.5s ease-in-out;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0.5;
      .title {    
        transform: translateX(-500px);
      }
    }
  }
</style>
<style scoped lang="scss">
  .splash {
    height: 88.75vh;
    padding: 200px 107px 0 107px;
    .slide-leave-active,
    .slide-enter-active {
      transition: all .5s ease-in-out;
    }
    .slide-enter-from {
      transform: translate(100%, 0);
    }
    .slide-leave-to {
      transform: translate(-100%, 0);
    }
    &.bg-splash-1 {
      background-image: url('~@/assets/png/splash-1.png');
      background-size: cover;
    }
    &.bg-splash-2 {
      background-image: url('~@/assets/png/splash-2.png');
      background-size: cover;
    }
    .container {
      position: absolute;
      width: 866px;
      top: 0;
    }
    .title {
      padding-top: 200px;
      p {
        margin: 0;
        font-style: normal;
        font-weight: bold;
        font-size: 144px;
        line-height: 177px;
        text-align: left;
        color: white;
      }
    }
    .icons {
      margin-top: 150px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 13.8%;
      }
    }
    .action {
      margin-top: 1100px;
      display: flex;
      justify-content: center;
      &.step3 {
        margin: 0;
      }
    }
    .progress-bar {
      margin-top: 100px;
      display: flex;
      justify-content: center;
      .dots {
        width: 200px;
        display: flex;
        justify-content: space-around;
        .dot {
          width: 40px;
          height: 40px;
          border-radius: 15px;
          background-color: #FFFFFF;
          opacity: 0.4;
          &.active {
            background-color: #82BC00;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
