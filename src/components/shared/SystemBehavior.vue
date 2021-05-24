<template>
  <div class="system-behavior">
    <div class="title" v-if="step === 1">Did we recognise the<br>resident phone number?</div>
    <div class="title" v-if="step === 2">As the resident - <br>How do you respond?</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/building-secondary-black.svg" />
      </div>
      <div class="content-bottom">
        <div class="items">
          <div class="item" :class="{'active': user_type === 'vehicle'}" @click="goToVehicle()">
            <img src="@/assets/svg/check.svg" />
            <p>Yes</p>
          </div>
          <div class="item" :class="{'active': user_type === 'none-vehicle'}" @click="goToNoneVehicle()">
            <img src="@/assets/svg/close.svg" />
            <p>No</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'SystemBehavior',
  components: {
    Footer
  },
  props: {
    step: {
      type: Number,
      default: 1,
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .system-vehavior-screen {
    &.fade-enter-from {
      .backbutton {
        transform: translateX(300px);
      }
      .content {
        transform: translateY(-128px);
      }
      .items {
        transform: translateY(200px);
      }
    }
    &.fade-enter-to {
      transition: all 0.5s ease-in-out;
      .backbutton {
        transform: translateX(0);
        transition: all 0.5s ease-in-out;
      }
      .content {
        transform: translateY(0);
        transition: all 0.5s ease-in-out;
      }
      .items {
        transform: translateY(0);
        transition: all 0.5s ease-in-out;
      }
    }
    &.fade-leave-from {
      .title {
        transform: translateX(0);
      }
    }
    &.fade-leave-to {
      .title {
        transform: translateX(-500px);
        transition: all 0.5s ease-in-out;
      }
    }
  }
</style>

<style scoped lang="scss">
  .system-behavior {
    height: 88.75vh;
    background-color: #052A3F;
    .title {
      position: absolute;
      top: 200px;
      width: 100%;
      font-size: 80px;
      color: white;
      text-align: center;
    }
    .content {
      padding-top: 500px;
      .buildings {
        img {
          width: 100%;
        }
      }
      .content-bottom {
        background-color: var(--secondary-black);
        width: 100%;
        bottom: 217px;
        height: 1600px;
        margin-top: -12px;
        padding-top: 100px;
        .items {
          width: 650px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
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
            &:first-child {
              background-color: var(--primary-green);
            }
            &:last-child {
              background-color: #CF1313;
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
      }
    }
  }
</style>