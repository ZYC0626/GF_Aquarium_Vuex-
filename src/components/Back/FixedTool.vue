<template>
  <div id="circularMenu" class="circular-menu">
    <a
      class="floating-btn"
      href="#"
      @click.prevent="active"
    >
      <span class="material-icons">meeting_room </span>
    </a>
    <div class="items-wrapper">
      <a href="#" @click.prevent="logout" class="menu-item material-icons" title="登出">logout</a>
      <a href="#" class="menu-item material-icons" title="回商店首頁">home</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    active () {
      document.getElementById('circularMenu').classList.toggle('active')
    }
  }
}
</script>
