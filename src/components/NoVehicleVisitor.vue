<template>
  <div class="vehicle-visitor bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button v-if="step === 2" />
    <Stepper2 v-bind:stepper="stepper" />
    <transition name="titleLeftLeave">
    <div class="title" v-if="step === 1">Visitor without a Vehicle
      <div class="sub-title">
        Please enter visitor details below
      </div>
    </div>
    </transition>
    <transition name="titleLeft">
    <div class="title stepper4" v-if="step === 2">Thank You!
      <div class="sub-title">
        Your visitor is successfully<br>
        registered
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
            <input placeholder="Jenny Wilson" class="normal" v-model="name" />
          </div>
        </div>
        <div class="description enter-name">Comments:</div>
        <div class="items enter-name">
          <div class="item">
            <textarea class="small" v-model="comments"></textarea>
          </div>
        </div>
      </div>
    </transition>
    <transition name="actionDown">
    <div class="action enter-name" v-if="step === 1">
      <div class="big-btn" @click="goToNext()">Save</div>
    </div>
    </transition>    

    <!-- step 2 Thank You -->
    <transition name="contentDown">
    <div class="content stepper4" v-if="step === 2">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom stepper4">
      </div>
    </div>
    </transition>
    <div class="action enter-name" v-if="step === 2">
      <div class="big-btn" @click="stepper = 5; goToNext()">Home</div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from '@/components/layouts/BackButton.vue'
import HomeButton from '@/components/layouts/HomeButton.vue'
import Stepper2 from '@/components/shared/Stepper2.vue'
import Footer from '@/components/layouts/Footer.vue'
import axios from "axios"

export default {
  name: 'NoVehicleVisitor',
  components: {
    BackButton,
    HomeButton,
    Stepper2,
    Footer,
  },
  data() {
    return {
      stepper: 1,
      step: 1,
      goTo: '',
      name: '',
      comments: ''
    }
  },
  methods: {
    goBack() {
      this.goTo = '';
      if (this.step === 1) {
        this.$router.push({ name: 'LogVisitor' });
      } else {
        if (this.step === 2)  this.stepper = 1;
        --this.step;
      }
    },
    async goToNext() {
      this.goTo = '';
      if (this.step === 1) {
        if (this.name.trim() !== '' && this.comments.trim() !== '') {
          const data = {
            Name: this.name,
            Comments: this.comments,
            HasVehicle: false,
            Expires: '',
            Province: 0,
            Model: 0,
            Color: '',
            Plate: 0,
            VisitorParkingSpotID: 0
          };

          const accessToken = window.localStorage.getItem('access_token');
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
          await axios
            .post(
              `https://condocontrolcentral.com:500/api10/api/Visitors/Create`, data, config
            )
            .then(
              () => {
                ++this.step;
                ++this.stepper;  
              },
            ).catch((error) => {
              window.localStorage.setItem('error',  error.response.data[0].Value);
              this.$router.push({ name: "TryAgain", params: { type: 3 } });
            });
        }
      } else if (this.step === 2) {
        this.$router.push({ name: 'Home' });
      }    
    },
  }
}
</script>

<style lang="scss">
  .vehicle-visitor-screen {
    &.fade-enter-from {
      .title, .description, .items, .information {
        transform: translateX(800px);
      }
      .stepper {
        transform: translateY(-200px);
      }
    }
    &.fade-enter-to {
      transition: all 0.5s ease-in-out;
      .title, .description, .items, .information {
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
  .vehicle-visitor {
    height: 88.75vh;
    .titleLeft-enter-active, .titleLeft-leave-active {
      transition: all .5s ease-in-out;
    }
    .titleLeft-enter-from, .titleLeft-leave-to {
      transform: translateX(1000px);          
    }
    .titleLeftLeave-enter-from, .titleLeftLeave-leave-active {
      transition: all .5s ease-in-out;
    }
    .titleLeftLeave-enter-active, .titleLeftLeave-leave-to {
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
      &.stepper4 {
        top: 500px;
      }
    }
    .contentDown-enter-to {
      transition: all .5s ease-in-out;
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
      &.stepper4 {
        padding-top: 800px;
      }
    }
    
    .content-bottom {
      background-color: var(--primary-blue);
      width: 100%;
      bottom: 217px;
      height: 1000px;
      margin-top: -12px;
      &.stepper4 {
        height: 1000px;
        margin-top: -28px;
      }
    }
    .description {
      font-size: 40px;
      color: #F5F5F5;
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
        background-color: #138CCF;
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
        padding: 5px 20px;
        border-radius: 10px;
        background-color: #F25D5D;
      }
      .small {
        font-size: 40px;
      }
      &.enter-name {
        margin: 50px 0;
      }
    }
    .actionDown-leave-active {
      transition: all .5s ease-in-out;  
    }
    .actionDown-leave-to {
      transform: translateY(400px);
    }
    .action.enter-name {
      position: absolute;
      bottom: 350px;
      left: 107px;
      z-index: 0;
    }
    .contentLeft-leave-active {
      transition: all .5s ease-in-out;
    }
    .contentLeft-leave-to {
      transform: translateX(-1000px);
    }
    .enter-name-items {
      position: absolute;
      bottom: 568px;
      left: 107px;
      width: 866px;
      z-index: 1;
    }
  }
</style>