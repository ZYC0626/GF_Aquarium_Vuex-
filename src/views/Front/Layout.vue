<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid position-relative px-0">
    <router-view></router-view>
    <ToastMessages></ToastMessages>
    <LikesList></LikesList>
    <ToTop></ToTop>
  </div>
  <Userfooter></Userfooter>
</template>
<script>
// @ is an alias to /src
import UserNavbar from '@/components/Front/UserNavbar.vue'
import Userfooter from '@/components/Front/Userfooter.vue'
import ToastMessages from '@/components/Share/ToastMessages.vue'
import LikesList from '@/components/Front/LikesList.vue'
import ToTop from '@/components/Front/BackToTop.vue'
import emitter from '@/methods/emitter'

export default {
  name: 'Home',
  components: {
    UserNavbar,
    Userfooter,
    LikesList,
    ToTop,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
