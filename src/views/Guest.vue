<template>
  <div class="guest-screen">
    <Guest />
  </div>
</template>

<script>
// @ is an alias to /src
import Guest from '@/components/Guest.vue'

export default {
  name: 'GuestScreen',
  components: {
    Guest
  }
}
</script>
