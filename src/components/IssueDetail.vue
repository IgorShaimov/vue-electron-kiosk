<template>
  <div class="issue-detail" :class="{'bg-primary-blue': step !== 3, 'bg-secondary-blue': step === 3}">
    <back-button @click="goBack()" color="white" />
    <home-button />
    <transition name="titleLeftLeave">
    <div class="title" v-if="step === 1">
      {{ issue.Subject }}
    </div>
    </transition>
    <transition name="titleLeftLeave">
    <div class="title" v-if="step === 2">
      Add update
    </div>
    </transition>
    <transition name="titleLeft">
    <div class="title stepper4" v-if="step === 3">Thank You!
      <div class="sub-title">
        Your service requests updated
      </div>
    </div>
    </transition>

    <!-- step 1 -->
    <transition name="contentRight">
      <div class="enter-name-items step1" v-if="step === 1">
        <div class="items enter-name" v-for="(message, index) in issue.ServiceRequestUpdates" :key="index">
          <div class="item">
            <div class="message-date">Opened: {{ message.date }}</div>
            <div class="message-content" v-html="message.content"></div>
          </div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 1">
      <div class="big-btn" @click="goToNext()">Add Update</div>
    </div>

    <!-- step 2 -->
    <transition name="contentRight">
      <div class="enter-name-items step2" v-if="step === 2">
        <div class="description enter-name">Add update here</div>
        <div class="items enter-name">
          <div class="item">
            <textarea class="normal" v-model="update"></textarea>
          </div>
        </div>
        <div class="items permission">
          <div class="item">
            <div>Permission to Enter</div>
            <div class="toggle-switch">
              <input type="checkbox" id="chkTest" name="chkTest" v-model="permissionToEnter" disabled>
              <label for="chkTest">
                <span class="toggle-track"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 2">
      <div class="big-btn" @click="goToNext()">{{ update.trim().length > 0 ? 'Save As Closed' : 'Next and Close' }}</div>
    </div>

    <!-- step 3 Thank You -->
    <transition name="contentDown">
    <div class="content stepper4" v-if="step === 3">      
      <div class="buildings">
        <img src="@/assets/svg/buildings.svg" />
      </div>
      <div class="content-bottom stepper4">
      </div>
    </div>
    </transition>
    <div class="action enter-name" v-if="step === 3">
      <div class="big-btn" @click="goToNext()">Home</div>
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
  name: 'IssueDetail',
  components: {
    BackButton,
    HomeButton,
    Footer
  },
  data() {
    return {
      step: 1,
      goTo: '',
      id: '',
      statusId: 0,
      assigneeId: 0,
      reminderTimeId: 0,
      update: '',
      permissionToEnter: true,
      issue: {},
      config: {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` }
      }
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function (to) {
      if (to.name === 'IssueDetail') {
        this.step = 1;
        this.id = to.params.id;
        this.getDetail(this.id);        
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getDetail(this.id);
  },
  methods: {
    goBack() {
      this.goTo = '';
      if (this.step === 1) {
        this.$router.push({ name: 'Request' });
      } else {
        --this.step;
      }
    },
    async goToNext() {
      this.goTo = '';
      if (this.step === 1) {
        await axios
          .get(
            `https://condocontrolcentral.com:500/api10/api/ServiceRequests/Update?id=${this.id}`, this.config
          )
          .then(
            (response) => {
              console.log(response)
              this.permissionToEnter = response.data.PermissionToEnter;
              this.statusId = response.data.StatusId;
              this.assigneeId = response.data.AssigneeId;
              this.reminderTimeId = response.data.ReminderTimeId;
            },
          ).catch(() => {
            this.$router.push({ name: "TryAgain", params: { type: 1 } });
          });
        ++this.step;
      } else if (this.step === 2) {
        if (this.update.trim().length === 0) {
          --this.step;
        } else {
          const data = {
            Id: Number(this.id),
            Description: this.update,
            PermissionToEnter: true,
            StatusId: this.statusId,
            AssigneeId: this.assigneeId,
            ReminderTimeId: this.reminderTimeId
          }
          await axios
          .put(
            `https://condocontrolcentral.com:500/api10/api/ServiceRequests/Update`, data, this.config
          )
          .then(
            (response) => {
              console.log(response)
              ++this.step;
            },
          ).catch(() => {
            this.$router.push({ name: "TryAgain", params: { type: 1 } });
          });
          
        }
      } else if (this.step === 3) {
        this.$router.push({ name: 'Home' });
      } else {
        ++this.step;
      }
      
    },
    goToPage(page) {
      this.goTo = page;
      setTimeout(() => {
        ++this.step;
      }, 800);
    },
    async getDetail(id) {
      await axios
        .get(
          `https://condocontrolcentral.com:500/api10/api/ServiceRequests/${id}`, this.config
        )
        .then(
          (response) => {
            this.issue = response.data;
          },
        ).catch((error) => {
          console.log(error.response)
        });
    }
  }
}
</script>

<style lang="scss">
  .new-service-screen {
    &.fade-enter-from {
      .title, .description, .items, .information {
        transform: translateX(800px);
      }
      .stepper {
        transform: translateY(-200px);
      }
    }
    &.fade-enter-to {
      transition: all 0.5s ease-in-out;
      .title, .description, .items, .information {
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
  .issue-detail {
    height: 88.75vh;
    .titleLeft-enter-active, .titleLeft-leave-active {
      transition: all .5s ease-in-out;
    }
    .titleLeft-enter-from, .titleLeft-leave-to {
      transform: translateX(1000px);          
    }
    .titleLeftLeave-enter-from, .titleLeftLeave-leave-active {
      transition: all .5s ease-in-out;
    }
    .titleLeftLeave-enter-active, .titleLeftLeave-leave-to {
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
    .contentDown-enter-to {
      transition: all .5s ease-in-out;
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
      transition: all .4s ease;
      transition-delay: .4s;
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
      color: #F5F5F5;
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
      &.permission {
        width: 866px;
        margin-top: 100px;
        .item {
          width: 866px;
          height: 150px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 50px;
          div {
            font-size: 40px;
            color: white;
          }
        }
      }
    }
    .information {
      font-size: 50px;
      color: white;
      text-align: left;
      margin: 50px 0 50px 107px;
      .badge {
        padding: 5px 20px;
        border-radius: 10px;
        background-color: #F25D5D;
      }
      .small {
        font-size: 40px;
      }
      &.enter-name {
        margin: 50px 0;
      }
    }
    .actionDown-leave-active {
      transition: all .5s ease-in-out;  
    }
    .actionDown-leave-to {
      transform: translateY(400px);
    }
    .actionUp-enter-from {
      transform: translateY(400px);
    }
    .actionUp-enter-to {
      transition: all .5s ease-in-out;      
    }
    .action.enter-name {
      position: absolute;
      bottom: 350px;
      left: 107px;
      z-index: 0;
    }
    .contentLeft-leave-active {
      transition: all .5s ease-in-out;
    }
    .contentLeft-leave-to {
      transform: translateX(-600px);
    }
    .contentRight-enter-from {
      transform: translateX(600px);      
    }
    .contentRight-enter-to {
      transition: all .5s ease-in-out;
    }
    .enter-name-items {
      position: absolute;
      top: 400px;
      left: 107px;
      width: 866px;
      z-index: 1;
      &.step1 {
        top: 500px;
        .items {
          width: 866px;
          margin-top: 40px;
          .item {
            width: 866px;
            background-color: #138CCF;
            padding: 50px 60px;
            div {
              width: 100%;
              color: white;
              text-align: left;
            }
            .message-date {
              font-size: 30px;
              margin-bottom: 50px;
            }
            .message-content {
              font-size: 40px;
            }
          }
        }
      }
    }
  }

  .toggle-switch input[type=checkbox] {display:none}
  .toggle-switch label {cursor:pointer;}
  .toggle-switch label .toggle-track {
    display:block;height:60px;width:120px;background:var(--primary-green);border-radius:10px;
    position:relative;
    margin-bottom:15px;border:1px solid #ccc;
  }

  .toggle-switch .toggle-track:before{
    content:'';
    display:inline-block;height:60px;width:60px;background:white;
    border-radius:10px;
    position:absolute;
    top:0;
    right:0;
    transition:right .2s ease-in;
  }

  .toggle-switch input[type="checkbox"]:checked + label .toggle-track:before{
    background:green;
    right:60px;
  }
</style>