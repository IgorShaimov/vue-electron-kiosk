<template>
  <div class="thankyou bg-secondary-blue">
    <!-- <back-button @click="goBack()" color="white" /> -->
    <home-button />
    <div class="title">We found your<br>account</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="description">Thank you, you're logged in</div>
        <div class="items">
          <div class="item active">
            <img src="@/assets/svg/check.svg" />
            <p>Success</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import BackButton from '@/components/layouts/BackButton.vue'
import HomeButton from '@/components/layouts/HomeButton.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'ThankYou',
  components: {
    // BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
    }
  },
  watch: {
    // whenever question changes, this function will run
    $route: function (to) {
      if (to.name === 'ThankYou') {
        this.goToHome();
      }
    }
  },
  mounted() {
    this.goToHome();
  },
  methods: {
    goToHome() {
      setTimeout(() => {
        this.$router.push({ name: 'Home' });
      }, 1500);
    },
  }
}
</script>

<style lang="scss">
  .thankyou-screen {
    transition: all .5s ease-in-out;
    &.fade-enter-to {
      .items {
        opacity: 1;
        transition: all .5s ease-in-out;
      }
    }
    &.fade-leave-to {
      .backbutton {
        transform: translateX(1200px);
        transition: all .5s ease-in-out;
      }
      .description {
        transform: translateX(-800px);
        transition: all .5s ease-in-out;
      }
      .items {
        transform: translateY(200px);
        scale: 0.5;
        transition: all .5s ease-in-out;
      }
    }
    &.fade-enter-from {
      .items {
        opacity: 0.3;
        transition: all .5s ease-in-out;
      }
    }
    &.fade-leave-from {
      .backbutton {
        transform: translateX(0);
      }
      .description {
        transform: translateX(0);
      }
      .items {
        transform: translateY(0);
        scale: 1;
      }
    }
  }
</style>

<style scoped lang="scss">
  .thankyou {
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
        height: 774px;
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