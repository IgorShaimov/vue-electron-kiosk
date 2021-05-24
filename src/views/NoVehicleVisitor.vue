<template>
  <div class="no-vehicle-visitor-screen">
    <NoVehicleVisitor />
  </div>
</template>

<script>
// @ is an alias to /src
import NoVehicleVisitor from '@/components/NoVehicleVisitor.vue'

export default {
  name: 'NoVehicleVisitorScreen',
  components: {
    NoVehicleVisitor
  }
}
</script>
