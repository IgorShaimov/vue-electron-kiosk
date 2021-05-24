<template>
  <div class="system-behavior-screen">
    <SystemBehavior title="Did we recognize the user?" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SystemBehavior from '@/components/shared/SystemBehavior.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'SystemBehaviorScreen',
  components: {
    SystemBehavior,
    Footer
  }
}
</script>