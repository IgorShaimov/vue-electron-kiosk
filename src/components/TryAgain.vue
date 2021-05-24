<template>
  <div class="try-again bg-primary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button/>
    <transition name="titleLeft">
      <div class="title" v-if="type === 1">
        Please try again
        <div class="sub-title">
          The information provided did<br>did not match the users on record.
          <br /><br>Please speak with<br />management or security
        </div>
      </div>
    </transition>

    <transition name="titleLeft">
      <div class="title" v-if="type === 2">
        Text Verification
        <div class="sub-title">
          The user didn't agree with the<br>Permit. Please speak with them
          <br />before trying again
        </div>
      </div>
    </transition>

    <transition name="titleLeft">
      <div class="title" v-if="type === 3">
        Visitor Register Failed
        <div class="sub-title">
          {{ err }}
        </div>
      </div>
    </transition>

    <transition name="contentDown">
      <div class="content">
        <div class="buildings">
          <img src="@/assets/svg/building-secondary.svg" />
        </div>
        <div class="content-bottom"></div>
      </div>
    </transition>
    <div class="action enter-name">
      <div
        class="big-btn"
        @click="goBack();"
      >
        Try Again
      </div>
    </div>
    <Footer />

  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from "@/components/layouts/BackButton.vue";
import HomeButton from "@/components/layouts/HomeButton.vue";
import Footer from "@/components/layouts/Footer.vue";
// import escpos from "escpos";

export default {
  name: "VehicleVisitor",
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      type: 1,
      err: ''
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function(to) {
      if (to.name === "TryAgain") {
        this.type = Number(this.$route.params.type);
        this.err = window.localStorage.getItem('error');
      }
    },
  },
  mounted() {    
    this.type = Number(this.$route.params.type);
    this.err = window.localStorage.getItem('error');
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.try-again-screen {
  &.fade-enter-from {
    .title {
      transform: translateY(-200px);
    }
  }
  &.fade-enter-to {
    transition: all 0.5s ease-in-out;
    .title {
      transform: translateY(0);
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>

<style scoped lang="scss">
.try-again {
  height: 88.75vh;
  .titleLeft-enter-active,
  .titleLeft-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .titleLeft-enter-from,
  .titleLeft-leave-to {
    transform: translateX(1000px);
  }
  .title {
    position: absolute;
    top: 200px;
    width: 100%;
    font-size: 80px;
    color: white;
    text-align: center;
    .sub-title {
      padding-top: 50px;
      font-size: 40px;
    }
  }
  .content {
    padding-top: 800px;
    .buildings {
      img {
        width: 100%;
      }
    }
  }
  
  .content-bottom {
    background-color: var(--secondary-blue);
    width: 100%;
    bottom: 217px;
    height: 1080px;
    margin-top: -12px;
  }
  
  .action.enter-name {
    position: absolute;
    bottom: 350px;
    left: 107px;
    z-index: 0;
  }
}

</style>
