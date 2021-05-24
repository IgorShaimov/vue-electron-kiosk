<template>
  <div class="service-request-screen">
    <ServiceRequest />
  </div>
</template>

<script>
// @ is an alias to /src
import ServiceRequest from '@/components/ServiceRequest.vue'

export default {
  name: 'ServiceRequestScreen',
  components: {
    ServiceRequest
  }
}
</script>
