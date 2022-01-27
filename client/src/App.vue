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
    if (this.lang === 'es') {
      import('quasar/lang/es').then(language => {
        this.$q.lang.set(language.default)
      })
    } else if (this.lang === 'en-us') {
      import('quasar/lang/en-us').then(language => {
        this.$q.lang.set(language.default)
      })
    } else if (this.lang === 'pt') {
      import('quasar/lang/pt').then(language => {
        this.$q.lang.set(language.default)
      })
    }
    this.$i18n.locale = this.lang
  }
}
</script>
