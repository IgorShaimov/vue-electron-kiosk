<template>
  <div class="new-service" :class="{'bg-primary-blue': step !== 3, 'bg-secondary-blue': step === 3}">
    <back-button @click="goBack()" color="white" />
    <home-button v-if="step === 3" />
    <Stepper3 v-bind:stepper="stepper" />
    <transition name="titleLeftLeave">
    <div class="title" v-if="step === 1">New Service Request
      <div class="sub-title">
        If you have an urgent request, please contact<br>
        the Property Manager's emergency phone<br>
        line at 888-762-6636
      </div>
    </div>
    </transition>
    <transition name="titleLeft">
    <div class="title stepper4" v-if="step === 3">Thank You!
      <div class="sub-title">
        Thank you! Your {{ requestType }}<br>
        has been submitted.<br>
        Management will respond shortly
      </div>
    </div>
    </transition>

    <!-- step 1 service request -->
    <transition name="itemsUp">
      <div class="step2Items" v-if="step === 1 && types.length % 2">
        <div class="items day">
          <div class="item" :class="{'active': goTo === types[0]}" @click="goToPage(types[0])">
            <p>{{ types[0] }}</p>
          </div>
        </div>
        <div class="items">
          <div class="item" :class="{'active': goTo === type}" @click="goToPage(type)" v-for="(type, index) in oddTypes" :key="index">
            <p>{{ type }}</p>
          </div>
        </div>
      </div>
    </transition>

    <transition name="itemsUp">
      <div class="step2Items" v-if="step === 1 && types.length % 2 === 0">
        <div class="items">
          <div class="item" :class="{'active': goTo === type}" @click="goToPage(type)" v-for="(type, index) in evenTypes" :key="index">
            <p>{{ type }}</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- step 2 -->
    <transition name="contentRight">
      <div class="enter-name-items step2" v-if="step === 2">
        <div class="description enter-name">Subject</div>
        <div class="items enter-name">
          <div class="item">
            <input class="normal" placeholder="Energy issues" v-model="subject" />
          </div>
        </div>
        <div class="description enter-name">Detailed Description</div>
        <div class="items enter-name">
          <div class="item">
            <textarea class="normal" v-model="description"></textarea>
          </div>
        </div>
        <div class="items permission">
          <div class="item">
            <div>Permission to Enter</div>
            <div class="toggle-switch">
              <input type="checkbox" id="chkTest" name="chkTest" v-model="permissionToEnter">
              <label for="chkTest">
                <span class="toggle-track"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="action enter-name" v-if="step === 2">
      <div class="big-btn" @click="goToNext()">Submit</div>
    </div>

    <!-- step 4 Thank You -->
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
      <div class="big-btn" @click="stepper = 4; goToNext()">My Requests</div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import BackButton from '@/components/layouts/BackButton.vue'
import HomeButton from '@/components/layouts/HomeButton.vue'
import Stepper3 from '@/components/shared/Stepper3.vue'
import Footer from '@/components/layouts/Footer.vue'
import axios from "axios"

export default {
  name: 'NewService',
  components: {
    BackButton,
    HomeButton,
    Stepper3,
    Footer
  },
  data() {
    return {
      stepper: 1,
      step: 1,
      goTo: '',
      types: [],
      oddTypes: [],
      evenTypes: [],
      groupId: 0,
      requestType: '',
      assigneeId: 0,
      requestorId: 149,
      reminderTimeId: 0,
      subject: '',
      description: '',
      permissionToEnter: true,
      config: {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` }
      }
    }
  },
  watch: {
    // whenever route changes, this function will run
    $route: function (to) {
      if (to.name === 'NewService') {
        this.step = 1;
        this.stepper = 1;
      }
    }
  },
  async mounted() {
    await axios
      .get(
        `https://condocontrolcentral.com:500/api10/api/ServiceRequests/Create`, this.config
      )
      .then(
        (response) => {
          console.log(response);
          this.types = response.data.Types;
          this.types.length % 2 ? this.oddTypes = this.types.splice(1, this.types.length-1) : this.evenTypes = this.types;
          this.groupId = Number(Object.keys(response.data.Groups)[0]);
          this.assigneeId = Number(Object.keys(response.data.Assignees)[0]);
          this.reminderTimeId = Number(Object.keys(response.data.ReminderTimes)[0]);
        },
      ).catch((error) => {
        console.log(error.response)
      });
  },
  methods: {
    goBack() {
      this.goTo = '';
      if (this.step === 1) {
        this.$router.push({ name: 'ServiceRequest' });
      } else {
        if (this.step === 2)  this.stepper = 1;
        if (this.step === 3)  this.stepper = 2;
        --this.step;
      }
    },
    async goToNext() {
      this.goTo = '';
      if (this.step === 1) {
        setTimeout(() => {
          ++this.step;
        }, 800);
      } else if (this.step === 2) {
        const data = {
          GroupId: this.groupId,
          RequestType: this.requestType,
          AssigneeId: this.assigneeId,
          RequestorId: this.requestorId,
          ReminderTimeId: this.reminderTimeId,
          Subject: this.subject,
          Description: this.description,
          PermissionToEnter: this.permissionToEnter
        };
        await axios
          .post(
            `https://condocontrolcentral.com:500/api10/api/ServiceRequests/Create`, data, this.config
          )
          .then(
            () => {
              ++this.step;
              ++this.stepper;
            },
          ).catch(() => {
            this.$router.push({ name: "TryAgain", params: { type: 1 } });
          });
      } else if (this.step === 3) {
        this.$router.push({ name: 'Request' });
      } else {
        ++this.step;
      }
      
    },
    goToPage(page) {
      this.goTo = page;
      this.requestType = page;
      setTimeout(() => {
        ++this.step;
        ++this.stepper;
      }, 800);
    },
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
  .new-service {
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
      height: 1050px;
      overflow-y: scroll;
      .items {
        width: 650px;
        margin: 0 auto;
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
          margin-bottom: 20px;
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
      top: 200px;
      left: 107px;
      width: 866px;
      z-index: 1;
      &.step2 {
        .items {
          margin-top: 40px;
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