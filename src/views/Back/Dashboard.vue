<template>
  <Navbar></Navbar>
  <ToastMessages></ToastMessages>
  <FixedTool></FixedTool>
  <div class="container-fluid pb-4" style="min-height: 85vh;">
    <router-view/>
  </div>
    <footer class="container-fluid bg-primary py-4 mt-3">
      <div class="container px-md-5">
        <div class="text-center my-4">© Copyright 2021 <br class="d-block d-md-none"> 練習使用非商業用途</div>
      </div>
    </footer>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/Share/ToastMessages.vue'
import Navbar from '@/components/Back/Navbar.vue'
import FixedTool from '@/components/Back/FixedTool.vue'

export default {
  components: {
    Navbar,
    ToastMessages,
    FixedTool
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login')
        }
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>
