<template>
  <div class="splash-screen">
    <Splash />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Splash from '@/components/SplashScreen.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'SplashScreen',
  components: {
    Splash,
    Footer
  }
}
</script>
