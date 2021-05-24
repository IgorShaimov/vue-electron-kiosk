<template>
  <div class="announcements-screen">
    <Announcements />
  </div>
</template>

<script>
// @ is an alias to /src
import Announcements from '@/components/Announcements.vue'

export default {
  name: 'AnnouncementsScreen',
  components: {
    Announcements
  }
}
</script>
