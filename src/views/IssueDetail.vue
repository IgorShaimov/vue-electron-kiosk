<template>
  <div class="issue-detail-screen">
    <IssueDetail />
  </div>
</template>

<script>
// @ is an alias to /src
import IssueDetail from '@/components/IssueDetail.vue'

export default {
  name: 'IssueDetailScreen',
  components: {
    IssueDetail
  }
}
</script>
