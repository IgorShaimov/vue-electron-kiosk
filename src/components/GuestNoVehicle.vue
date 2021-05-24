<template>
  <div class="guest-novehicle" :class="{'bg-secondary-blue': step !== 2, 'bg-primary-blue': step === 2}">
    <back-button @click="goBack()" color="white" />
    <home-button v-if="step === 7" />
    <Stepper v-bind:stepper="stepper" />
    <transition name="titleLeftLeave">
      <div class="title" v-if="step === 1">
        Visitor without a Vehicle
        <div class="sub-title">Please enter visitor details below</div>
      </div>
    </transition>
    <transition name="titleLeft">
      <div class="title step2" v-if="step === 2">Person Unit Numbers<br>& Phone Numbers
        <div class="sub-title">We will send a verification code<br>if the data matches our records</div>
      </div>
    </transition>
    <div
      class="title"
      v-if="step === 3"
    >
      We have sent a message to the Host
      <div class="sub-title">They need to approve this for<br>us to create a visitor pass</div>
    </div>
    <transition name="titleLeft">
      <div class="title stepper4" v-if="step === 5">
        Thank You!
        <div class="sub-title">
          Your visitor pass is printing.
          <br />Please collect it and show<br />it to the security
        </div>
      </div>
    </transition>

    <!-- step 1 -->
    <div class="content" v-if="step === 1">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>    
    <div class="content-bottom enter-name" v-if="step === 1">
    </div>
    <transition name="contentLeft">
      <div class="enter-name-items" v-if="step === 1">
        <div class="description enter-name">Enter Visitor Name</div>
        <div class="items enter-name">
          <div class="item">
            <input placeholder="Jenny Wilson" class="normal" />
          </div>
        </div>
        <div class="description enter-name">Comments:</div>
        <div class="items enter-name">
          <div class="item">
            <textarea class="small"></textarea>
          </div>
        </div>
      </div>
    </transition>
    <transition name="contentLeft">
    <div class="action enter-name" v-if="step === 1">
      <div class="big-btn" @click="stepper = 2; goToNext()">Next</div>
    </div>
    </transition>

    <!-- step 2 -->
    <div class="content" v-if="step === 2">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>    
    <div class="content-bottom enter-name" v-if="step === 2">
    </div>
    <transition name="contentLeft">
      <div class="enter-name-items" v-if="step === 2">
        <div class="description enter-name">Enter Visitor Name</div>
        <div class="items enter-name">
          <div class="item">
            <input placeholder="Jenny Wilson" class="normal" />
          </div>
        </div>
        <div class="description enter-name">Enter Phone Number</div>
        <div class="items enter-name">
          <div class="item">
            <input placeholder="(603) 555-0123" class="normal" v-model="value" type="text" @input="acceptNumber" />
          </div>
        </div>
      </div>
    </transition>
    <transition name="contentLeft">
    <div class="action enter-name" v-if="step === 2">
      <div class="big-btn" @click="stepper = 3; goToNext()">Send verification</div>
    </div>
    </transition>

    <!-- step 3 -->
    <transition name="contentUp1">
      <div class="content stepper3" v-if="step === 3">
        <div class="buildings">
          <img src="@/assets/svg/buildings.svg" />
        </div>
      </div>
    </transition>
    <div class="content-bottom waiting" v-if="step === 3">
      <div class="items">
        <div class="item">
        </div>
      </div>
    </div>

    <!-- step 4 -->
    <div class="content stepper3" v-if="step === 4">
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>
    <div class="content-bottom stepper3" v-if="step === 4"></div>
    <transition name="contentRight">
      <div class="enter-name-items" v-if="step === 4">
        <div class="description enter-name">Enter Verification code:</div>
        <div class="items enter-name">
          <div class="item">
            <input placeholder="" class="normal" />
          </div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 4">
      <div
        class="big-btn"
        @click="
          stepper = 4;
          goToNext();
        "
      >
        Confirm
      </div>
    </div>

    <!-- step 5 Thank You -->
    <transition name="contentDown">
      <div class="content stepper4" v-if="step === 5">
        <div class="buildings">
          <img src="@/assets/svg/buildings.svg" />
        </div>
        <div class="content-bottom stepper4"></div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 5">
      <div
        class="big-btn"
        @click="
          stepper = 5;
          goToNext();
        "
      >
        Home
      </div>
    </div>
    <Footer />

  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from "@/components/layouts/BackButton.vue";
import HomeButton from "@/components/layouts/HomeButton.vue";
import Stepper from "@/components/shared/Stepper.vue";
import Footer from "@/components/layouts/Footer.vue";
// import escpos from "escpos";

export default {
  name: "VehicleVisitor",
  components: {
    BackButton,
    HomeButton,
    Stepper,
    Footer
  },
  data() {
    return {
      stepper: 1,
      step: 1,
      goTo: "",
      value: ''
    };
  },
  watch: {
    // whenever route changes, this function will run
    $route: function(to) {
      if (to.name === "VehicleVisitor") {
        this.stepper = 1;
        this.step = 1;
        this.goTo = "";
      }
    },
  },
  methods: {
    goBack() {
      this.goTo = "";
      if (this.step === 1) {
        this.$router.push({ name: "LogVisitor" });
      } else {
        if (this.step === 3) this.stepper = 1;
        if (this.step === 5) this.stepper = 2;
        if (this.step === 7) this.stepper = 3;
        --this.step;
      }
    },
    goToNext() {
      this.goTo = "";
      if (this.step === 1) {
        setTimeout(() => {
          ++this.step;
        }, 800);
      } else if (this.step === 4) {
        ++this.step;
      } else if (this.step === 5) {
        this.$router.push({ name: "Home" });
      } else {
        ++this.step;
      }
      if (this.step === 3) {
        setTimeout(() => {
          this.goToNext();
        }, 2000);        
      }
    },
    goToPage(page) {
      this.goTo = page;
      setTimeout(() => {
        ++this.step;
      }, 800);
    },
    acceptNumber() {
      const x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
  },
};
</script>

<style lang="scss">
.guest-novehicle-screen {
  &.fade-enter-from {
    .title,
    .description,
    .items,
    .information {
      transform: translateX(800px);
    }
    .stepper {
      transform: translateY(-200px);
    }
  }
  &.fade-enter-to {
    transition: all 0.5s ease-in-out;
    .title,
    .description,
    .items,
    .information {
      transform: translateX(0);
      transition: all 0.5s ease-in-out;
    }
    .stepper {
      transform: translateY(0);
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>

<style scoped lang="scss">
.guest-novehicle {
  height: 88.75vh;
  .titleLeft-enter-active,
  .titleLeft-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .titleLeft-enter-from,
  .titleLeft-leave-to {
    transform: translateX(1000px);
  }
  .titleLeftLeave-enter-from,
  .titleLeftLeave-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .titleLeftLeave-enter-active,
  .titleLeftLeave-leave-to {
    transform: translateX(-1000px);
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
    &.step2 {
      font-size: 80px;
    }
    &.stepper4 {
      top: 500px;
    }
  }
  .contentUp-enter-active,
  .contentUp-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .contentUp-enter-from,
  .contentUp-leave-to {
    transform: translateY(202px);
  }
  .contentUp1-enter-active {
    transition: all 0.5s ease-in-out;
  }
  .contentUp1-enter-from {
    transform: translateY(102px);
  }
  .contentDown-enter-to {
    transition: all 0.5s ease-in-out;
  }
  .contentDown-enter-from {
    transform: translateY(-400px);
  }
  .content {
    padding-top: 300px;
    .buildings {
      img {
        width: 100%;
      }
    }
    &.step2 {
      padding-top: 200px;
      .content-bottom {
        height: 1080px;
        margin-top: -28px;
      }
    }
    &.stepper3 {
      padding-top: 600px;
    }
    &.stepper4 {
      padding-top: 800px;
    }
  }
  
  .content-bottom {
    background-color: var(--primary-blue);
    width: 100%;
    bottom: 217px;
    height: 1080px;
    margin-top: -12px;
    &.stepper3 {
      height: 1080px;
      margin-top: -28px;
    }
    &.stepper4 {
      height: 1000px;
      margin-top: -28px;
    }
    &.waiting {
      padding-top: 100px;
      .items {
        .item {
          background-color: white;
          border-radius: 50%;
          box-sizing: border-box;
          border-radius: 50%;
          -webkit-animation: circle-3-rotate 1s infinite linear;
          animation: circle-3-rotate 1s infinite linear;
          width: 300px;
          height: 300px;
          border: 0px solid rgb(130, 188, 0);
          box-shadow: rgb(130, 188, 0) 0px -100px 0px 100px inset;
          @keyframes circle-3-rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }
    }
  }
  .description {
    font-size: 40px;
    color: #f5f5f5;
    text-align: center;
    padding: 100px 0;
    &.enter-name {
      padding: 30px 0 0 0;
      text-align: left;
    }
  }
  .items {
    width: 650px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    &.enter-name {
      height: unset;
      margin-top: 30px;
      .item {
        height: unset;
        background-color: unset;
      }
    }
    .item {
      background-color: #138ccf;
      width: 300px;
      height: 300px;
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      &.active {
        background-color: var(--primary-green);
        box-shadow: 0px 12.1065px 36.3194px rgba(165, 224, 32, 0.59);
        transition: all 0.8s ease-in-out;
      }
      img {
        width: 150px;
      }
      p {
        color: white;
        margin: 0;
        font-size: 27px;
      }
    }
  }
  .information {
    font-size: 50px;
    color: white;
    text-align: left;
    margin: 50px 0 50px 107px;
    .badge {
      margin-left: 20px;
      padding: 5px 20px;
      border-radius: 10px;
      background-color: #f25d5d;
    }
    .small {
      font-size: 40px;
    }
    &.enter-name {
      margin: 50px 0;
    }
  }
  .action.enter-name {
    position: absolute;
    bottom: 350px;
    left: 107px;
    z-index: 0;
  }
  .contentLeft-leave-active, .contentLeft-enter-to {
    transition: all 0.5s ease-in-out;
  }
  .contentLeft-leave-to {
    transform: translateX(-100%);
  }
  .contentLeft-enter-from {
    transform: translateX(120%);
  }
  .contentRight-enter-from {
    transform: translateX(600px);
  }
  .contentRight-enter-to {
    transition: all 0.5s ease-in-out;
  }
  .enter-name-items {
    position: absolute;
    bottom: 568px;
    left: 107px;
    width: 866px;
    z-index: 1;
    &.make {
      bottom: 620px;
      .description {
        padding: 40px 0;
      }
    }
  }
}

.scanner-bar {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 10px;
  background: linear-gradient(180deg, rgba(178, 239, 41, 0) 0%, rgba(178, 239, 41, 0.8) 47.4%, rgba(130, 188, 0, 0) 100%);
  box-shadow: 0px 0px 40px rgba(181, 255, 16, 0.8);
  animation: bounce ease-in-out 3s;
  animation-iteration-count: infinite;

  @keyframes bounce {
    0% {
      bottom: 680px;
    }
    50% {
      bottom: 450px;
    }
    100% {
      bottom: 680px;
    }
  }
}

</style>
