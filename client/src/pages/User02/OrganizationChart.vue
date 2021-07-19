<template>
  <div></div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      formDepartment: {},
      formArea: {},
      formCharges: {}
    }
  },
  validations: {
    formDepartment: {
      name: { required }
    },
    formArea: {
      department_id: { required },
      name: { required }
    },
    formCharges: {
      area_id: { required },
      name: { required }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
