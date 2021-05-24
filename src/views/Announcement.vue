<template>
  <div class="announcement-screen">
    <Announcement />
  </div>
</template>

<script>
// @ is an alias to /src
import Announcement from '@/components/Announcement.vue'

export default {
  name: 'AnnouncementScreen',
  components: {
    Announcement
  }
}
</script>
