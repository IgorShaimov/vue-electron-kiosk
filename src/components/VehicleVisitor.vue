<template>
  <div class="vehicle-visitor bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button v-if="step === 7" />
    <Stepper v-bind:stepper="stepper" />
    <transition name="titleLeftLeave">
      <div class="title" v-if="step === 1">
        Visitor with a Vehicle
        <div class="sub-title">Please enter visitor details below</div>
      </div>
    </transition>
    <transition name="titleLeft">
      <div class="title step2" v-if="step === 2">Length of parking pass</div>
    </transition>
    <div class="title" v-if="step === 3 || step === 4 || step === 5 || step === 6">
      Parking will expire at:
      <div class="sub-title">{{ formatDate(expires) }}</div>
    </div>
    <transition name="titleLeft">
      <div class="title stepper4" v-if="step === 7">
        Thank You!
        <div class="sub-title">
          Your visitor pass is printing.
          <br />Please collect it and put it on the
          <br />dash of your vehicle
          or share the
          <br />code with your visitor
        </div>
      </div>
    </transition>

    <!-- step 1 -->
    <div class="content" v-if="step === 1">
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>
    <div class="content-bottom enter-name" v-if="step === 1"></div>
    <transition name="contentLeft">
      <div class="enter-name-items" v-if="step === 1">
        <div class="description enter-name">Enter Visitor Name</div>
        <div class="items enter-name">
          <div class="item">
            <input placeholder="Jenny Wilson" class="normal" v-model="name" />
          </div>
        </div>
        <div class="information enter-name">
          <span>You have used</span>
          <span class="badge">3</span> /
          <span class="small">5</span>
          <br />parking permits this month
        </div>
      </div>
    </transition>
    <transition name="actionDown">
      <div class="action enter-name" v-if="step === 1">
        <div
          class="big-btn"
          @click="goToNext()"
        >Next</div>
      </div>
    </transition>

    <!-- step 2 choose length of parking pass -->
    <transition name="contentUp">
      <div class="content step2" v-if="step === 2">
        <div class="buildings">
          <img src="@/assets/svg/buildings.svg" />
        </div>
        <div class="content-bottom"></div>
      </div>
    </transition>
    <transition name="itemsUp">
      <div class="step2Items" v-if="step === 2">
        <div class="items day">
          <div class="item" :class="{ active: goTo === parkingExpirationOptionsKeys[0] }" @click="goToPage(parkingExpirationOptionsKeys[0])">
            <img :src="require(`@/assets/svg/${parkingExpirationOptions[0].split(' ')[0].toLowerCase()}.svg`)" />
            <p>{{ parkingExpirationOptions[0] }}</p>
          </div>
        </div>
        <div class="items">
          <div class="item" :class="{ active: goTo === parkingExpirationOptionsKeys[1] }" @click="goToPage(parkingExpirationOptionsKeys[1])">
            <img :src="require(`@/assets/svg/${parkingExpirationOptions[1].split(' ')[0].toLowerCase()}.svg`)" />
            <p>{{ parkingExpirationOptions[1] }}</p>
          </div>
          <div class="item" :class="{ active: goTo === parkingExpirationOptionsKeys[2] }" @click="goToPage(parkingExpirationOptionsKeys[2])">
            <img :src="require(`@/assets/svg/${parkingExpirationOptions[2].split(' ')[0].toLowerCase()}.svg`)" />
            <p>{{ parkingExpirationOptions[2] }}</p>
          </div>
        </div>
        <div class="items">
          <div class="item" :class="{ active: goTo === parkingExpirationOptionsKeys[3] }" @click="goToPage(parkingExpirationOptionsKeys[3])">
            <img :src="require(`@/assets/svg/${parkingExpirationOptions[3].split(' ')[0].toLowerCase()}.svg`)" />
            <p>{{ parkingExpirationOptions[3] }}</p>
          </div>
          <div class="item" :class="{ active: goTo === parkingExpirationOptionsKeys[4] }" @click="goToPage(parkingExpirationOptionsKeys[4])">
            <img :src="require(`@/assets/svg/${parkingExpirationOptions[4].split(' ')[0].toLowerCase()}.svg`)" />
            <p>{{ parkingExpirationOptions[4] }}</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- step 2 Vehicle Make -->
    <div class="content" v-if="step === 3">
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>

    <div class="content-bottom" v-if="step === 3"></div>
    <transition name="contentRight">
      <div class="enter-name-items make" v-if="step === 3">
        <div class="description">Please select the vehicle make</div>
        <div class="list models">
          <div
            class="list-item"
            v-for="(model, key) in models"
            :key="key"
            :class="{'active': key === selectedModel}"
            @click="selectedModel = key"
          >{{ model }}</div>
        </div>
      </div>
    </transition>
    <transition name="actionUp">
      <div class="action enter-name" v-if="step === 3">
        <div
          class="big-btn"
          @click="goToNext()"
        >Next</div>
      </div>
    </transition>

    <!-- step 2 Vehicle Color -->
    <div class="content" v-if="step === 4">
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>
    <div class="content-bottom" v-if="step === 4"></div>
    <transition name="contentRight">
      <div class="enter-name-items make" v-if="step === 4">
        <div class="description enter-name">Vehicle Color</div>
        <div class="list colors">
          <div
            class="list-item"
            v-for="(color, index) in colors"
            :key="index"
            :class="{'active': index === selectedColor}"
            @click="selectedColor = index"
          >{{ color }}</div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 4">
      <div class="big-btn" @click="goToNext()">Next</div>
    </div>

    <!-- step 3 Licence Plate Number -->
    <transition name="contentUp1">
      <div class="content stepper3" v-if="step === 5">
        <div class="buildings">
          <img src="@/assets/svg/buildings.svg" />
        </div>
      </div>
    </transition>
    <div class="content-bottom stepper3" v-if="step === 5"></div>
    <transition name="contentRight">
      <div class="enter-name-items make" v-if="step === 5">
        <div class="description enter-name no-padding">License plate Number:</div>
        <div class="items enter-name">
          <div class="item">
            <input class="normal" placeholder="3EEME73" v-model="plate" />
          </div>
        </div>
        <div class="description enter-name">License plate Province:</div>
        <div class="list provinces">
          <div
            class="list-item"
            v-for="(province, key) in provinces"
            :key="key"
            :class="{'active': key === selectedProvince}"
            @click="selectedProvince = key"
          >{{ province }}</div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 5">
      <div class="big-btn" @click="goToNext()">Next</div>
    </div>

    <!-- step 3 Comment -->
    <div class="content stepper3" v-if="step === 6">
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
    </div>
    <div class="content-bottom stepper3" v-if="step === 6"></div>
    <transition name="contentRight">
      <div class="enter-name-items" v-if="step === 6">
        <div class="description enter-name">Comments:</div>
        <div class="items enter-name">
          <div class="item">
            <textarea class="normal" v-model="comments"></textarea>
          </div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 6">
      <div class="big-btn" @click="goToNext()">Save</div>
    </div>

    <!-- step 4 Thank You -->
    <transition name="contentDown">
      <div class="content stepper4" v-if="step === 7">
        <div class="buildings">
          <img src="@/assets/svg/buildings.svg" />
        </div>
        <div class="content-bottom stepper4"></div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 7">
      <div class="big-btn" @click="
          stepper = 5;
          goToNext();
        ">Home</div>
    </div>
    <Footer />

    <!-- <div id="section-to-print">
      <h1>
        This is test page for print. The data from api will show in this page.
      </h1>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from "@/components/layouts/BackButton.vue";
import HomeButton from "@/components/layouts/HomeButton.vue";
import Stepper from "@/components/shared/Stepper.vue";
import Footer from "@/components/layouts/Footer.vue";
// import escpos from "escpos";
import axios from "axios";
import { useState } from '@/store';

export default {
  setup() {
    return { state: useState() }
  },
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
      goTo: '',
      models: {},
      colors: [],
      provinces: {},
      selectedModel: undefined,
      selectedColor: undefined,
      selectedProvince: undefined,
      parkingExpirationOptions: ['Day Pass Only', '1 Night', '2 Nights', '3 Nights', 'Custom'],
      parkingExpirationOptionsKeys: [],
      name: '',
      comments: '',
      expires: '',
      plate: '',
      visitorParkingSpotID: 0,
      config: {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` }
      }
    };
  },
  watch: {
    // whenever route changes, this function will run
    $route: function(to) {
      if (to.name === "VehicleVisitor") {
        this.stepper = 1;
        this.step = 1;
        this.goTo = '';
        this.name = '';
        this.comments = '';
        this.expires = '';
        this.plate = '';
        this.selectedModel = undefined;
        this.selectedColor = undefined;
        this.selectedProvince = undefined;
      }
    }
  },
  async mounted() {
    // const bodyParameters = {}
    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/Visitors/Create`, this.config
      )
      .then(
        (response) => {
          this.models = response.data.Models;
          this.colors = response.data.Colors;
          this.provinces = response.data.Provinces;
          this.parkingExpirationOptions = Object.values(response.data.ParkingExpirationOptions);
          this.parkingExpirationOptionsKeys = Object.keys(response.data.ParkingExpirationOptions);
        },
        (error) => {
          console.log(error);
        }
      );
    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/Visitors/ParkingSpots?start=2020-11-10T23%3A57%3A50.2959827&end=2020-11-10T23%3A57%3A50.2959827`, this.config
      )
      .then(
        (response) => {
          this.visitorParkingSpotID = response.data[0].VisitorParkingSpotID;
        },
        (error) => {
          console.log(error);
        }
      );
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
    async goToNext() {
      this.goTo = "";
      if (this.step === 1) {
        if (this.name.trim() !== '') {
          ++this.step;
          ++this.stepper;
        }
      } else if (this.step === 3) {
        if (this.selectedModel) {
          ++this.step;
        }
      } else if (this.step === 4) {
        if (this.selectedColor) {
          ++this.step;
          ++this.stepper;
        }
      } else if (this.step === 5) {
        if (this.selectedProvince && this.plate.trim() !== '') {
          ++this.step;
        }
      } else if (this.step === 6) {
        if (this.comments.trim() !== '') {
          
          // window.printPaper();
          const data = {
            Name: this.name,
            Comments: this.comments,
            HasVehicle: true,
            Expires: this.expires,
            Province: this.selectedProvince,
            Model: this.selectedModel,
            Color: this.colors[this.selectedColor],
            Plate: this.plate,
            VisitorParkingSpotID: this.visitorParkingSpotID
          };

          await axios
            .post(
              `https://condocontrolcentral.com:500/api10/api/Visitors/Create`, data, this.config
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
      } else if (this.step === 7) {
        this.$router.push({ name: "Home" });
      } else {
        ++this.step;
      }
    },
    goToPage(page) {
      this.goTo = page;
      // const bodyParameters = {}
      axios
        .get(
          `https://condocontrolcentral.com:500/api10/api/Visitors/ParkingExpiredDate?parkingExpirationOptionID=${page}`, this.config
        )
        .then(
          (response) => {
            const end = response.data.End;
            this.expires = end;
            ++this.step;
          },
          (error) => {
            console.log(error);
          }
        );
    },
    // printPaper() {
    //   console.log("printPaper! start");
    //   const device = new escpos.USB();
    //   const options = { encoding: "GB18030" /* default */ };
    //   const printer = new escpos.Printer(device, options);

    //   device.open(function() {
    //     printer
    //       .font("a")
    //       .align("ct")
    //       .style("bu")
    //       .size(1, 1)
    //       .text("Hello world!")
    //       .text("Welcome to the Awesome-land!!!")
    //       .cut()
    //       .close();
    //   });
    //   console.log("printPaper! end");
    // },
  }
};
</script>

<style lang="scss">
.vehicle-visitor-screen {
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
.vehicle-visitor {
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
    padding-top: 400px;
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
      padding-top: 300px;
    }
    &.stepper4 {
      padding-top: 800px;
    }
  }
  .itemsUp-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.4s;
  }
  .itemsUp-enter-from {
    transform: translateY(1100px);
  }
  .step2Items {
    position: absolute;
    left: 215px;
    bottom: 300px;
    .items {
      width: 650px;
      margin: 0 auto;
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
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
      &.day {
        .item {
          width: 100%;
        }
      }
    }
  }
  .content-bottom {
    background-color: var(--primary-blue);
    width: 100%;
    bottom: 217px;
    height: 858px;
    margin-top: -12px;
    &.stepper3 {
      height: 1080px;
      margin-top: -28px;
    }
    &.stepper4 {
      height: 1000px;
      margin-top: -28px;
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
    &.day {
      .item {
        width: 100%;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    &.models {
      height: 436px;
    }
    &.colors {
      height: 327px;
    }
    &.provinces {
      height: 280px;
    }
    .list-item {
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      font-size: 40px;
      width: 260px;
      box-sizing: border-box;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: break-word;
      &:nth-child(3n + 2) {
        margin-left: 30px;
      }
      &:nth-child(3n) {
        margin-left: 30px;
      }
      &.active {
        background-color: var(--primary-green);
        box-shadow: 0px 12.1065px 36.3194px rgba(165, 224, 32, 0.59);
        transition: all 0.8s ease-in-out;
        color: white;
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
  .actionDown-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .actionDown-leave-to {
    transform: translateY(400px);
  }
  .actionUp-enter-from {
    transform: translateY(400px);
  }
  .actionUp-enter-to {
    transition: all 0.5s ease-in-out;
  }
  .action.enter-name {
    position: absolute;
    bottom: 300px;
    left: 107px;
    z-index: 0;
  }
  .contentLeft-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .contentLeft-leave-to {
    transform: translateX(-600px);
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
      bottom: 520px;
      .description {
        padding: 40px 0;
      }
    }
  }
}

// @media print {
//   body * {
//     visibility: hidden;
//   }
//   #section-to-print,
//   #section-to-print * {
//     visibility: visible;
//   }
//   #section-to-print {
//     position: absolute;
//     left: 0;
//     top: 0;
//     h1 {
//       margin: 200px;
//     }
//   }
// }
</style>
