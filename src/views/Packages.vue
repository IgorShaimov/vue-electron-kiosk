<template>
  <div class="packages-screen">
    <Packages />
  </div>
</template>

<script>
// @ is an alias to /src
import Packages from '@/components/Packages.vue'

export default {
  name: 'PackagesScreen',
  components: {
    Packages
  }
}
</script>
