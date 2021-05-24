<template>
  <div class="welcome-screen">
    <Welcome />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'WelcomeScreen',
  components: {
    Welcome
  }
}
</script>
