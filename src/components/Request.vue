/* eslint-disable no-irregular-whitespace */
<template>
  <div class="request bg-secondary-blue">
    <back-button @click="goBack()" color="white" />
    <home-button />
    <div class="title">Your Requests</div>
    <div class="content">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom">
        <div class="items">
          <div class="item" v-for="(item, index) in requets" :key="index" @click="goToDetail(item.Id)">
            <div class="left">
              <div class="icon-container">
                <img src="@/assets/svg/service.svg" />
              </div>
            </div>
            <div class="right">
              <p>{{ item.Subject }}</p>
              <p><span>{{ item.Number }} </span> <span>{{ formatDate(item.DateTimeOpened) }}</span></p>
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
  name: 'Request',
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      requets: [],
      config: {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` }
      }
    }
  },
  async mounted() {
    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/ServiceRequests`, this.config
      )
      .then(
        (response) => {
          this.requets = response.data.ServiceRequests;
        },
      ).catch((error) => {
        console.log(error.response)
      });
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'ServiceRequest' });
    },
    goToDetail(id) {
      this.$router.push({ name: 'IssueDetail', params: {id: id}});
    },
  }
}
</script>

<style lang="scss">
  .request {
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
      padding-top: 700px;
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
        padding-top: 50px;
        .items {
          width: 900px;
          height: 500px;
          margin-left: 90px;
          overflow-y: scroll;
          .item {
            background-color: #138CCF;
            width: 880px;
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
          margin-top: 80px;
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