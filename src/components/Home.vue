<template>
  <div class="home bg-secondary-blue">
    <home-button type="logout" @click="logOut()"/>
    <div class="title">Welcome,<br>Paul Nelson</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="description">What would you like to do?</div>
        <div class="items">
          <div class="item" :class="{'active': goTo === 'visitor'}" @click="goToLogVisitor()" v-if="visitorsEnabled">
            <img src="@/assets/png/user.png" />
            <p>Log New Visitor</p>
          </div>
          <div class="item" :class="{'active': goTo === 'package'}" @click="goToPackage()" v-if="packagesEnabled">
            <img src="@/assets/svg/home.svg" />
            <p>Check Packages</p>
          </div>
          <div class="item" :class="{'active': goTo === 'announcement'}" @click="goToAnnouncements()" v-if="announcementsEnabled">
            <img src="@/assets/svg/announcements.svg" />
            <p>Announcements</p>
          </div>
          <div class="item" :class="{'active': goTo === 'service'}" @click="goToServieRequest()" v-if="serviceRequestsEnabled">
            <img src="@/assets/svg/home.svg" />
            <p>Service Request</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeButton from '@/components/layouts/HomeButton.vue'
import Footer from '@/components/layouts/Footer.vue'
import { useState } from '@/store'

export default {
  setup() {
    return { state: useState() }
  },
  name: 'Home',
  components: {
    HomeButton,
    Footer
  },
  data() {
    return {
      goTo: '',
      visitorsEnabled: false,
      packagesEnabled: false,
      announcementsEnabled: false,
      serviceRequestsEnabled: false
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function (to) {
      if (to.name === 'Home') {
        this.goTo = '';
      }
    }
  },
  mounted: function() {
    this.visitorsEnabled = window.localStorage.getItem('visitorsEnabled');
    this.packagesEnabled = window.localStorage.getItem('packagesEnabled');
    this.announcementsEnabled = window.localStorage.getItem('announcementsEnabled');
    this.serviceRequestsEnabled = window.localStorage.getItem('serviceRequestsEnabled');
  },
  methods: {
    logOut() {
      this.$router.push({ name: 'Welcome' });
    },
    goToLogVisitor() {
      this.goTo = 'visitor';
      setTimeout(() => {
        this.$router.push({ name: 'LogVisitor' });        
      }, 800);
    },
    goToPackage() {
      this.goTo = 'package';
      setTimeout(() => {
        this.$router.push({ name: 'Packages' });        
      }, 800);
    },
    goToAnnouncements() {
      this.goTo = 'announcement';
      setTimeout(() => {
        this.$router.push({ name: 'Announcements' });        
      }, 800);
    },
    goToServieRequest() {
      this.goTo = 'service';
      setTimeout(() => {
        this.$router.push({ name: 'ServiceRequest' });
      }, 800);
    }
  }
}
</script>

<style lang="scss">
  .home-screen {
    transition: all 0.3s ease-in-out;
    .content {
      transform: translateY(0);
      transition: all 0.3s ease-in-out;
    }
    .homebutton, .backbutton {
      transform: translateY(0);
      transition: all 0.3s ease-in-out;
    }
    &.fade-enter-to {
      opacity: 0.5;
      .content {
        transform: translateY(1008px);
        transition: none;
      }
      .homebutton, .backbutton {
        transform: translateY(-200px);
        transition: none;
      }
    }
    &.fade-enter-active {
      .content {
        transform: translateY(1008px);
      }
      .homebutton, .backbutton {
        transform: translateY(-200px);
      }
    }
  }
</style>

<style scoped lang="scss">
  .home {
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
      padding-top: 500px;
      .buildings {
        img {
          width: 100%;
        }
      }
      .content-bottom {
        background-color: var(--primary-blue);
        width: 100%;
        bottom: 217px;
        height: 902px;
        margin-top: -12px;
        .description {
          font-size: 40px;
          color: #F5F5F5;
          text-align: center;
          padding: 50px 0 0 0;
        }
        .items {
          width: 650px;
          margin: 0 auto;
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
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
            margin-bottom: 30px;
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