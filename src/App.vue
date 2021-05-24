<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss">
  :root {
    --primary-blue: #0082CA;
    --primary-green: #82BC00;
    --secondary-blue: #6EC4E9;
    --secondary-gray: #8A8C8C;
    --secondary-black: #093D5A;
  }
  @font-face {
      font-family: 'century-gothic';
      src: url('~@/assets/fonts/century-gothic.ttf');
  }
  body {
    margin: 0;
    font-family: century-gothic;
    overflow: hidden;
  }
  .big-btn {
    width: 866px;
    height: 188px;
    border-radius: 20px;
    background-color: var(--primary-green);
    font-style: normal;
    font-weight: bold;    
    font-size: 60px;
    line-height: 74px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-align: center;
    color: white;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input, textarea {
    &.normal, &.small {
      width: 866px;
      height: 188px;
      border-radius: 20px;
      font-size: 50px;
      color: var(--secondary-black);
      padding: 0 50px;
      box-sizing: border-box;
      &:focus {
        outline: none;
      }
    }
  }
  textarea.normal {
    height: 500px;
    padding: 50px;
  }
  textarea.small {
    height: 250px;
    padding: 30px;
  }
  .bg-primary-blue {
    background-color: var(--primary-blue);
  }
  .bg-primary-green {
    background-color: var(--primary-green);
  }
  .bg-white {
    background-color: white;
  }
  .bg-secondary-blue {
    background-color: var(--secondary-blue);
  }
  .bg-secondary-gray {
    background-color: var(--secondary-gray);
  }
  .bg-secondary-black {
    background-color: var(--secondary-black);
  }
  .no-padding {
    padding: 0 !important;
  }
</style>
