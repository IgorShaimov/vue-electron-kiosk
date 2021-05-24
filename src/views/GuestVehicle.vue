<template>
  <div class="guest-vehicle-screen">
    <GuestVehicle />
  </div>
</template>

<script>
// @ is an alias to /src
import GuestVehicle from '@/components/GuestVehicle.vue'

export default {
  name: 'GuestVehicleScreen',
  components: {
    GuestVehicle
  }
}
</script>
