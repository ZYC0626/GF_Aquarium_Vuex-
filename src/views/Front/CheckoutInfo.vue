<template>
  <Loading :active="isLoading">
    <div class='loader-wrapper'><span class="loader"></span></div>
  </Loading>
  <section>
    <div class="container-fluid p-0">
      <div
        class="landing bg-cover bg-center"
        style="
          background-image: url(https://images.unsplash.com/photo-1550376672-6d778f8a4b5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80);
        "
      ></div>
    </div>
  </section>

  <div class="container py-4 px-md-6 mt-md-6 mt-4">
    <ul class="progressbar">
      <li class="active"><span class="progressbar_text">填寫資料</span></li>
      <li><span class="progressbar_text">確認付款</span></li>
      <li><span class="progressbar_text">訂單完成</span></li>
    </ul>
  </div>

  <section class="container p-md-6 p-4 mb-4">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <h3>收件人資訊</h3>
        <hr />
        <Form class="row g-3"  v-slot="{ errors }" @submit="creatOrder">
          <div class="col-12">
            <label for="email" class="form-label">信箱</label><span class="badge rounded-pill bg-danger ms-2">必填</span>
            <Field id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email" rules="email|required"
                    v-model="form.user.email"></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-md-6">
            <label for="name" class="form-label">姓名</label><span class="badge rounded-pill bg-danger ms-2">必填</span>
            <Field id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required"
                    v-model="form.user.name"></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-md-6">
            <label for="tel" class="form-label">電話</label><span class="badge rounded-pill bg-danger ms-2">必填</span>
            <Field id="tel" name="電話" type="tel" class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話" rules="required"
                  v-model="form.user.tel"></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-12">
            <label for="address" class="form-label">地址</label><span class="badge rounded-pill bg-danger ms-2">必填</span>
            <Field id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required"
                    v-model="form.user.address"></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-12">
            <Field class="form-check-input" name="確認須知" type="checkbox" id="checkbox"
            :class="{ 'is-invalid': errors['確認須知'] }" rules="required" v-model="checked" value="confirm"></Field>
            <label class="form-check-label ms-2" for="checkbox">
              已了解所有購物須知。
            </label>
            <ErrorMessage name="確認須知" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-12">
            <label for="message" class="form-label"
              >備註</label
            >
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="產品備註..."
              v-model="form.message"></textarea>
          </div>
          <div class="col-12 d-flex">
            <router-link to="/cart" class="me-auto btn btn-outline-primary"><i class="bi bi-chevron-left"></i>回到購物車</router-link>
            <button type="submit" class="ms-auto btn btn-primary">下一步<i class="bi bi-chevron-right"></i></button>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      checked: ''
    }
  },
  inject: ['emitter'],
  methods: {
    creatOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.isLoading = true
      const order = this.form
      this.$http.post(api, { data: order }).then((response) => {
        console.log(response.data)
        this.isLoading = false
        // this.emitter.emit('updatecart')
        this.$store.dispatch('getCart')
        this.$router.push(`/checkoutPay/${response.data.orderId}`)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
