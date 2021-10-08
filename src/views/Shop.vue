<template>
  <div >
   <shop-table></shop-table>
  </div>
</template>

<script>
import ShopTable from '@/components/shop/ShopTable.vue'
import AuthUser from '../store/authUser'

export default {
  name: 'Shop',
  components: {
    ShopTable
  },
  mounted(){
    if(!this.isAuthen()){
        this.$swal("Restricted Area", "You must login first", 'warning')
        this.$router.push('/')
    }
  },
  methods:{
      isAuthen(){
          return AuthUser.getters.isAuthen
      }
  }
}
</script>
<style>

</style>