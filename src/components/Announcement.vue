/* eslint-disable no-irregular-whitespace */
<template>
  <div class="announcement bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button />
    <div class="title">{{ announcement.Title }}</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="description" v-html="announcement.Details">
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
import axios from "axios"

export default {
  name: 'Announcement',
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      announcement: {},
      config: {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` }
      }
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function (to) {
      if (to.name === 'Announcement') {
        const id = to.params.id;
        this.getAnnounceDetail(id);
      }
    }
  },
  mounted() {
    const id = this.$route.params.id;

    this.getAnnounceDetail(id);
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Announcements' });
    },
    async getAnnounceDetail(id) {
      // const bodyParameters = {}
      await axios
        .get(
          `https://condocontrolcentral.com:500/api10/api/Announcements/${id}`, this.config
        )
        .then(
          (response) => {
            console.log(response);
            this.announcement = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
</script>

<style lang="scss">
  .announcement-screen {
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
  .announcement {
    height: 88.75vh;
    .title {
      position: absolute;
      top: 200px;
      width: 600px;
      font-size: 80px;
      color: white;
      text-align: center;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
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
        height: 1600px;
        margin-top: -12px;
        .description {
          padding-top: 40px;
          width: 700px;
          color: white;
          font-size: 40px;
          margin: 0 auto;
          height: 800px;
          overflow-y: scroll;
        }
      }
    }
  }
</style>