<template>
  <div class="log-visitor bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button />
    <div class="title">Log New visitor</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="description">Select visitor pass</div>
        <div class="items">
          <div class="item" :class="{'active': user_type === 'vehicle'}" @click="goToVehicle()">
            <img src="@/assets/png/parking-user.png" />
            <p>With a Vehicle</p>
          </div>
          <div class="item" :class="{'active': user_type === 'none-vehicle'}" @click="goToNoneVehicle()">
            <img src="@/assets/png/user.png" />
            <p>Without a Vehicle</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from '@/components/layouts/BackButton.vue'
import HomeButton from '@/components/layouts/HomeButton.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'LogVisitor',
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      user_type: ''
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function (to) {
      if (to.name === 'LogVisitor') {
        this.user_type = '';
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Home' });
    },
    goToVehicle() {
      this.user_type = 'vehicle';
      setTimeout(() => {
        this.$router.push({ name: 'VehicleVisitor' });
      }, 800);
    },
    goToNoneVehicle() {
      this.user_type = 'none-vehicle';
      setTimeout(() => {
        this.$router.push({ name: 'NoVehicleVisitor' });
      }, 800);
    }
  }
}
</script>

<style lang="scss">
  .log-visitor-screen {
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
  .log-visitor {
    height: 88.75vh;
    .title {
      position: absolute;
      top: 200px;
      width: 100%;
      font-size: 100px;
      color: white;
      text-align: center;
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
        height: 1600px;
        margin-top: -12px;
        .description {
          font-size: 40px;
          color: #F5F5F5;
          text-align: center;
          padding: 100px 0;
        }
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
      }
    }
  }
</style>