<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      variable: ''
    }
  },
  computed: {
    ...mapState('generals', ['lang'])
  },
  mounted () {
    console.log(this.lang)
    this.$i18n.locale = this.lang
  }
}
</script>
