<template>
  <div class="new-service-screen">
    <NewService />
  </div>
</template>

<script>
// @ is an alias to /src
import NewService from '@/components/NewService.vue'

export default {
  name: 'NewServiceScreen',
  components: {
    NewService
  }
}
</script>
