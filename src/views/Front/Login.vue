<template>
  <div class="container-fluid login-bg py-8">
    <div class="container">
      <div class="row justify-content-center mb-3">
        <div class="col-lg-4 col-md-7">
          <h1 class="login-title">翠魚水族</h1>
        </div>
      </div>
      <form class="row justify-content-center" v-on:submit.prevent="signIn">
        <div class="col-lg-4 col-md-7 login-form">
          <h2 class="login-name">後台登入</h2>
          <hr>
          <div class="mb-2">
            <label for="inputEmail" class="sr-only mb-2 d-flex align-items-center">
              <span class="material-icons me-1">
              person
              </span>
              電子信箱
            </label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required
              autofocus
              v-model="user.username"
            />
          </div>
          <div class="mb-4">
            <label for="inputPassword" class="sr-only mb-2 d-flex align-items-center">
              <span class="material-icons me-1">
              lock
              </span>
              密碼</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
              v-model="user.password"
            />
          </div>
          <div class="d-flex mt-auto mb-4">
            <router-link to="/products/all"></router-link>
            <a href="#" class="btn btn-secondary me-auto"><i class="bi bi-chevron-left"></i>首頁</a>
            <button class="btn btn-primary" type="submit">
              確認<i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/dashboard/products')
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
