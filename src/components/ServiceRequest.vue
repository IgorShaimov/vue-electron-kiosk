<template>
  <div class="service-request bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button />
    <div class="title">Service Request</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="description">What would you like to do?</div>
        <div class="items">
          <div class="item" :class="{'active': service_type === 'new_service'}" @click="goToNewService()">
            <img src="@/assets/svg/service.svg" />
            <p>New Request</p>
          </div>
          <div class="item" :class="{'active': service_type === 'update_service'}" @click="goToUpdateService()">
            <img src="@/assets/svg/repair.svg" />
            <p>Updating Existing<br>Request</p>
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
  name: 'ServiceRequest',
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      service_type: ''
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function (to) {
      if (to.name === 'ServiceRequest') {
        this.service_type = '';
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Home' });
    },
    goToNewService() {
      this.service_type = 'new_service';
      setTimeout(() => {
        this.$router.push({ name: 'NewService' });
      }, 800);
    },
    goToUpdateService() {
      this.service_type = 'update_service';
      setTimeout(() => {
        this.$router.push({ name: 'Request' });
      }, 800);
    }
  }
}
</script>

<style lang="scss">
  .service-request-screen {
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
  .service-request  {
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
              text-align: center;
            }
          }
        }        
      }
    }
  }
</style>