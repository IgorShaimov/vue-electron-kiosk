<template>
  <div class="packages bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button />
    <div class="title">Packages</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="items">
          <div class="item" v-for="(item, index) in packages" :key="index">
            <div class="left">
              <div class="icon-container">
                <img src="@/assets/png/picked-up.png" v-if="item.IsPickedUp" />
                <img src="@/assets/svg/no-picked-up.svg" v-else />
              </div>
            </div>
            <div class="right">
              <p>{{ item.Description }}</p>
              <p><span>{{ item.PackageNumber }}</span> <span>{{ formatDate(item.DateRecieved) }}</span></p>
            </div>
          </div>
        </div>
        <div class="show-more"><p>Show more</p></div>
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
import axios from "axios"

export default {
  name: 'Packages',
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      user_type: '',
      packages: [],
      config: {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` }
      }
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
  async mounted() {
    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/Package/PackageList`, this.config
      )
      .then(
        (response) => {
          this.packages = response.data.PackageList;
        },
      ).catch((error) => {
        console.log(error.response)
      });
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
    },
  }
}
</script>

<style lang="scss">
  .packages-screen {
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
  .packages {
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
      padding-top: 300px;
      .buildings {
        img {
          width: 100%;
        }
      }
      .content-bottom {
        background-color: var(--primary-blue);
        width: 100%;
        height: 1600px;
        margin-top: -12px;
        .items {
          width: 900px;
          margin-left: 90px;
          .item {
            background-color: #138CCF;
            width: 900px;
            padding: 40px;
            border-radius: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            margin-bottom: 20px;
            .left {
              width: 100px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 80px;
              }
            }
            .right {
              flex-grow: 1;
              padding: 0 20px;
              p {
                font-size: 40px;
                padding: 10px 0;
                &:last-child {
                  font-size: 30px;
                }
              }
            }
            &.active {
              background-color: var(--primary-green);
              box-shadow: 0px 12.1065px 36.3194px rgba(165, 224, 32, 0.59);
              transition: all 0.8s ease-in-out;
            }
            p {
              color: white;
              margin: 0;
            }
          }
        }
        .show-more {
          display: flex;
          justify-content: center;
          padding-top: 80px;
          p {
            color: white;
            margin: 0;
            font-size: 30px;
          }
        }
      }
    }
  }
</style>