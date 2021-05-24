<template>
  <div
    class="welcome"
    :class="{ 'bg-secondary-blue': step !== 3, 'bg-light-grey': step === 3 }"
  >
    <back-button @click="goBack()" v-if="step !== 3" color="white" />
    <back-button @click="goBack()" v-else color="blue" />
    <div
      class="title"
      v-if="step !== 3 && (step === 1 || step === 2) && user_type === ''"
    >
      Welcome!
    </div>
    <div
      class="title"
      v-if="step !== 3 && (step === 1 || step === 2) && user_type === 'visitor'"
    >
      Welcome<br />Visitor
    </div>
    <div
      class="title"
      v-if="
        step !== 3 && (step === 1 || step === 2) && user_type === 'resident'
      "
    >
      Welcome<br />Resident
    </div>
    <div class="title" v-if="step === 4">Scan the<br />Wallet Pass</div>
    <div class="title">
      <transition name="title">
        <div v-if="step === 5 || step === 6">Text Verification</div>
      </transition>
      <div class="sub-title" v-if="step === 5">
        We will send a verification code to<br />the phone number you enter
        below
      </div>
      <div class="sub-title" v-if="step === 6">
        Please enter the verification number<br />we sent to your phone
      </div>
    </div>
    <div
      class="title wait"
      v-if="step === 7"
      :class="{
        wait1: wait === 1,
        wait2: wait === 2,
        wait3: wait === 3,
        wait4: wait === 4,
      }"
    >
      Please wait
      <div class="sub-title sub-1">
        We're checking the database
      </div>
      <div class="sub-title sub-2">
        We're looking for a match
      </div>
      <div class="sub-title sub-3">
        Almost done
      </div>
    </div>
    <transition name="content">
      <div
        class="content"
        :class="{
          step1: step === 1,
          step2: step === 2,
          step4: step === 4,
          step5: step === 5,
          step6: step === 6,
        }"
        v-if="step !== 3"
      >
        <div class="buildings">
          <img src="@/assets/svg/buildings.svg" />
        </div>
        <div class="content-bottom user" v-if="step === 1 || step === 2">
          <div class="description">I am a:</div>
          <div class="items">
            <div
              class="item"
              :class="{ active: user_type === 'visitor' }"
              @click="goToVisitor()"
            >
              <img src="@/assets/png/user.png" />
              <p>Visitor</p>
            </div>
            <div
              class="item"
              :class="{ active: user_type === 'resident' }"
              @click="goToResident()"
            >
              <img src="@/assets/svg/resident.svg" />
              <p>Resident</p>
            </div>
          </div>
        </div>
        <div class="content-bottom resident" v-if="step === 1 || step === 2">
          <div class="description">
            Please choose one of the methods<br />to authenticate your account
          </div>
          <div class="items">
            <div
              class="item"
              :class="{ active: is_wallet }"
              @click="goToMobileWallet()"
            >
              <img src="@/assets/svg/wallet.svg" />
              <p>Wallet Pass</p>
            </div>
            <div
              class="item"
              :class="{ active: is_message }"
              @click="goToTextVerification()"
            >
              <img src="@/assets/png/message.png" />
              <p>Text message</p>
            </div>
          </div>
        </div>
        <div class="content-bottom bar-code-scanner" v-if="step === 4">
          <div class="description">
            Please use the barcode scanner<br />to scan the wallet pass
          </div>
        </div>
        <div
          class="content-bottom text-verification"
          v-if="step === 5 || step === 6"
        >
          <div class="description">Enter Phone Number</div>
          <div class="items">
            <div class="item">
              <input
                placeholder="(603) 555-0123"
                class="normal"
                v-model="value"
                type="text"
                @input="acceptNumber"
              />
            </div>
          </div>
          <div class="action">
            <div class="big-btn" @click="goToSendVerify()">
              Send verification
            </div>
          </div>
        </div>
        <div class="content-bottom text-verify" v-if="step === 5 || step === 6">
          <div class="description">Enter Verification Code Here</div>
          <div class="items">
            <div class="item">
              <input
                placeholder="74-45-48-56"
                class="normal"
                v-model="verificationCode"
              />
            </div>
            <div class="item" :class="{ active: is_resend }" @click="resend()">
              <img src="@/assets/svg/resend.svg" />
              <p>Resend</p>
            </div>
          </div>
          <div class="action">
            <div class="big-btn" @click="goToVerify()">Verify</div>
          </div>
        </div>
        <div class="content-bottom waiting" v-if="step === 7">
          <div class="items">
            <div class="item"></div>
          </div>
        </div>
      </div>
    </transition>

    <div class="content step3">
      <div class="title" v-if="step === 3">
        Open and scan your<br />CCC wallet pass
      </div>
      <transition name="phone">
        <div v-if="step === 3">
          <div class="phone-scan">
            <img src="@/assets/png/phone-scan.png" />
          </div>
          <div class="big-btn" @click="goToBarcodeScanner()">
            Click here after<br />Wallet app is open
          </div>
        </div>
      </transition>
    </div>

    <transition name="scanner">
      <div class="items scanner" v-if="step === 4">
        <div class="item">
          <img src="@/assets/png/scanner.png" />
        </div>
      </div>
    </transition>

    <div class="scanner-bar" v-if="step === 4"></div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from "@/components/layouts/BackButton.vue";
import Footer from "@/components/layouts/Footer.vue";
import axios from "axios";
import { useState } from '@/store'

export default {
  setup() {
    return { state: useState() }
  },
  name: "Welcome",
  props: {
    reset: Number,
  },
  components: {
    BackButton,
    Footer,
  },
  data() {
    return {
      step: 1,
      user_type: "",
      is_wallet: false,
      is_message: false,
      wait: 1,
      is_resend: false,
      value: "",
      verificationCode: "",
    };
  },
  watch: {
    // whenever route changes, this function will run
    $route: function(to) {
      if (to.name !== "ThankYou") {
        this.step = 1;
        this.user_type = "";
        this.is_message = false;
        this.wait = 1;
        this.verificationCode = "";
      }
    },
  },
  async mounted() {
    const data = {
      "Username": "Kostiantyn",
      "Password": "621679"
    }
    await axios
      .post(
        `https://condocontrolcentral.com:500/api10/api/Users/Login`, data
      )
      .then(
        (response) => {
          this.state.access_token = response.data.access_token;
          window.localStorage.setItem('access_token', response.data.access_token);
        },
        (error) => {
          console.log(error);
        }
      );
    const accessToken = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    
    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/Users/Workspaces`, config
      )
      .then(
        (response) => {
          this.state.Id = response.data[0].Id;
        },
        (error) => {
          console.log(error);
        }
      );

    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/Users/Workspace?id=${this.state.Id}`, config
      )
      .then(
        (response) => {
          this.state.visitorsEnabled = response.data.VisitorsEnabled;
          this.state.packagesEnabled = response.data.PackagesEnabled;
          this.state.announcementsEnabled = response.data.AnnouncementsEnabled;
          this.state.serviceRequestsEnabled = response.data.ServiceRequestsEnabled;
          window.localStorage.setItem('visitorsEnabled', response.data.VisitorsEnabled);
          window.localStorage.setItem('packagesEnabled', response.data.PackagesEnabled);
          window.localStorage.setItem('announcementsEnabled', response.data.AnnouncementsEnabled);
          window.localStorage.setItem('serviceRequestsEnabled', response.data.ServiceRequestsEnabled);
        },
        (error) => {
          console.log(error);
        }
      );
  },
  methods: {
    goToVisitor() {
      this.user_type = "visitor";
      setTimeout(() => {
        this.$router.push({ name: "Guest" });
      }, 800);
    },
    goToResident() {
      this.user_type = "resident";
      setTimeout(() => {
        this.step = 2;
      }, 800);
    },
    goBack() {
      this.is_wallet = false;
      this.is_message = false;
      if (this.step === 5) {
        this.step = 2;
      } else if (this.step > 1) {
        --this.step;
        if (this.step === 1) {
          this.user_type = "";
        }
      } else {
        this.$router.push({ name: "SplashScreen" });
      }
    },
    goToMobileWallet() {
      this.is_wallet = true;
      setTimeout(() => {
        this.step = 3;
      }, 800);
    },
    goToBarcodeScanner() {
      this.step = 4;
      setTimeout(() => {
        this.goToSuccess();
      }, 6000);
    },
    goToTextVerification() {
      this.is_message = true;
      setTimeout(() => {
        this.step = 5;
      }, 800);
    },
    goToSendVerify() {
      this.step = 6;
    },
    goToVerify() {
      let err = undefined;
      axios
        .post(
          `https://condocontrolcentral.com:500/api10/api/Users/LoginViaTextMessage?textMessage=${this.verificationCode}`
        )
        .then(
          () => {
            err = false;
            if (this.wait === 4) {
              this.goToSuccess();
            }
          },
          (error) => {
            console.log(error);
            err = true;
            if (this.wait === 4) {
              this.$router.push({ name: "TryAgain", params: { type: 2 } });
            }
          }
        );
      this.step = 7;
      const timer = setInterval(() => {
        ++this.wait;
        if (this.wait === 4) {
          clearInterval(timer);
          if (err !== undefined) {
            if (err) {
              this.$router.push({ name: "TryAgain", params: { type: 2 } });
            } else {
              this.goToSuccess();
            }
          }
        }
      }, 1500);
    },
    goToSuccess() {
      this.$router.push({ name: "ThankYou" });
    },
    resend() {
      this.is_resend = true;
      setTimeout(() => {
        this.is_resend = false;
      }, 800);
    },
    acceptNumber() {
      const x = this.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
  },
};
</script>

<style lang="scss">
.welcome-screen {
  transition: all 0.3s ease-in-out;
  .content {
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
  }
  .homebutton,
  .backbutton {
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
  }
  &.fade-enter-to {
    opacity: 0.5;
    .content {
      transform: translateY(1008px);
      transition: none;
    }
    .homebutton,
    .backbutton {
      transform: translateY(-200px);
      transition: none;
    }
  }
  &.fade-enter-active {
    .content {
      transform: translateY(1008px);
    }
    .homebutton,
    .backbutton {
      transform: translateY(-200px);
    }
  }
}
</style>

<style scoped lang="scss">
.welcome {
  height: 88.75vh;
  overflow: hidden;
  .home-enter-active,
  .home-leave-active {
    transition: all 0.5s;
  }
  .home-enter-from,
  .home-leave-to {
    transform: translateX(300px);
  }
  .title-enter-to {
    transition: all 0.5s;
  }
  .title-enter-from {
    transform: translateX(600px);
  }
  .title {
    position: absolute;
    top: 200px;
    width: 100%;
    font-size: 100px;
    color: white;
    text-align: center;
    .sub-title {
      padding-top: 50px;
      font-size: 40px;
    }
    &.wait {
      .sub-title {
        opacity: 0;
        &.sub-1 {
          transform: translateY(0);
        }
        &.sub-2 {
          transform: translateY(-100px);
        }
        &.sub-3 {
          transform: translateY(-100px);
        }
      }
      &.wait4 {
        .sub-3 {
          opacity: 1;
          transform: translateY(-200px);
        }
      }
      &.wait1 {
        .sub-1 {
          opacity: 1;
          transition: all 0.3s ease-in-out;
        }
      }
      &.wait2 {
        .sub-2 {
          opacity: 1;
          transition: all 0.3s ease-in-out;
        }
      }
      &.wait3 {
        .sub-3 {
          opacity: 1;
          transform: translateY(-200px);
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }
  .content {
    padding-top: 628px;
    .buildings {
      img {
        width: 100%;
      }
    }
    .content-bottom {
      background-color: var(--primary-blue);
      width: 100%;
      bottom: 217px;
      height: 774px;
      margin-top: -12px;
      .description {
        font-size: 40px;
        color: #f5f5f5;
        text-align: center;
        padding: 100px 0;
      }
      .items {
        width: 650px;
        margin: 0 auto;
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
      }
      &.text-verification,
      &.text-verify {
        .description {
          padding: 50px 0 0 0;
          text-align: left;
          margin-left: 107px;
        }
        .items {
          .item {
            background-color: unset;
          }
        }
      }
      &.text-verify {
        .items {
          width: 866px;
          justify-content: space-between;
          align-items: center;
          .item {
            width: 646px;
            input {
              width: 646px;
              height: 188px;
              border-radius: 20px;
              font-size: 50px;
              color: var(--secondary-black);
              padding: 0 50px;
              box-sizing: border-box;
              &:focus {
                outline: none;
              }
            }
            &:last-child {
              background-color: #138ccf;
              width: 200px;
              height: 200px;
              border-radius: 40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              &.active {
                img {
                  animation: circle-1-rotate 0.8s linear;
                  @keyframes circle-1-rotate {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(-360deg);
                    }
                  }
                }
              }
            }
          }
        }
      }
      &.waiting {
        padding-top: 200px;
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
    &.step1 {
      .content-bottom {
        &.user {
          transform: translate(0, 0);
        }
        &.resident {
          transform: translate(1080px, -762px);
        }
      }
    }
    &.step2 {
      .content-bottom {
        &.user {
          transform: translateX(-1080px);
          transition: all 0.3s ease-in-out;
        }
        &.resident {
          transform: translate(0, -762px);
          transition: all 0.3s ease-in-out;
        }
      }
      &.content-enter-active,
      &.content-leave-active {
        transition: all 0.5s;
        opacity: 1;
      }
      &.content-enter-from,
      &.content-leave-to {
        opacity: 0;
        transform: translateY(1000px);
      }
    }
    &.step3 {
      padding-top: 0;
      .title {
        color: var(--primary-blue);
        font-size: 70px;
      }
      .phone-scan {
        padding: 428px 0 50px 0;
        display: flex;
        justify-content: center;
        img {
          width: 920px;
        }
      }
      .phone-enter-active,
      .phone-leave-active {
        transition: all 1s ease-in-out;
        transform: translateY(0);
        opacity: 1;
      }
      .phone-enter-from,
      .phone-leave-to {
        transform: translateY(800px);
        opacity: 0.8;
      }
    }
    &.step4 {
      &.content-enter-active,
      &.content-leave-active {
        transition: all 0.5s;
        transform: translateY(0);
      }
      &.content-enter-from,
      &.content-leave-to {
        transform: translateY(1000px);
      }
    }
    &.step5 {
      .content-bottom {
        &.text-verification {
          transform: translate(0, 0);
          transition: all 0.3s ease-in-out;
        }
        &.text-verify {
          transform: translate(1080px, -762px);
          transition: all 0.3s ease-in-out;
        }
      }
    }
    &.step6 {
      .content-bottom {
        &.text-verification {
          transform: translateX(-1080px);
          transition: all 0.3s ease-in-out;
        }
        &.text-verify {
          transform: translate(0, -762px);
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  .items.scanner {
    position: absolute;
    bottom: 400px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    .item {
      img {
        width: 500px;
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
    background: linear-gradient(
      180deg,
      rgba(178, 239, 41, 0) 0%,
      rgba(178, 239, 41, 0.8) 47.4%,
      rgba(130, 188, 0, 0) 100%
    );
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

  .scanner-enter-active,
  .scanner-leave-active {
    transition: all 0.5s;
    transform: translate(0, 0);
    opacity: 1;
  }
  .scanner-enter-from,
  .scanner-leave-to {
    transform: translate(-300px, -300px);
    opacity: 0;
  }
}
</style>
