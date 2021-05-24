<template>
  <div class="log-visitor-screen">
    <LogVisitor />
  </div>
</template>

<script>
// @ is an alias to /src
import LogVisitor from '@/components/LogVisitor.vue'

export default {
  name: 'LogVisitorScreen',
  components: {
    LogVisitor
  }
}
</script>
