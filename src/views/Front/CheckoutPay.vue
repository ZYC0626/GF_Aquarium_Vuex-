<template>
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
      <li class="done"><span class="progressbar_text">填寫資料</span></li>
      <li :class="{ active: !order.is_paid , done: order.is_paid }"><span class="progressbar_text">確認付款</span></li>
      <li :class="{ done: order.is_paid }"><span class="progressbar_text">訂單完成</span></li>
    </ul>
  </div>

  <section class="container p-md-6 p-4 mb-4">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div v-if="order.is_paid === false">
          <h3 class="text-center">商品明細</h3>
          <hr />
          <table class="table table-borderless mb-5">
            <thead>
              <tr class="table-info">
                <th>品名</th>
                <th>數量</th>
                <th class="text-end">總價</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-top" v-for="(item) in products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}</td>
                <td class="text-end align-middle">NT$ {{ $filters.currency(item.final_total) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-top">
                <td colspan="2">總計 :</td>
                <td class="text-end text-nowrap">NT$ {{ $filters.currency(order.total) }}</td>
              </tr>
              <!-- <tr class="border-top">
                <td colspan="2">折扣後 :</td>
                <td class="text-end text-nowrap">NT$ 500</td>
              </tr> -->
            </tfoot>
          </table>
        </div>
        <div class="alert alert-success text-center" role="alert" v-else>
          <h3 class="alert-heading my-3"><i class="bi bi-check-circle-fill me-3"></i>付款成功！</h3>
          <p>感謝你的光臨以及選購，商品會盡快送到您的手中！</p>
          <p>翠魚水族期待你的再次光臨！</p>
        </div>
        <h3 class="text-center">訂單明細</h3>
        <hr />
        <form @submit="payOrder">
          <table class="table">
            <tbody>
              <tr>
                <th>訂單編號</th>
                <td>{{ orderId }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th class="py-4">付款狀態</th>
                <td class="py-4">
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex">
            <button type="submit" class="ms-auto btn btn-primary"
            v-if="order.is_paid === false">確認付款<i class="bi bi-chevron-right"></i
            ></button>
            <!-- <a href="checkout3.html" class="ms-auto btn btn-primary"
              >確認付款<i class="bi bi-chevron-right"></i
            ></a> -->
          </div>
        </form>
        <div class="d-flex" v-if="order.is_paid">
          <router-link to="/products/all" class="btn btn-primary ms-auto">繼續購物<i class="bi bi-chevron-right"></i></router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  data () {
    return {
      order: {
        user: {},
        is_paid: false
      },
      products: {},
      orderId: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order
            this.products = res.data.order.products
          }
        }).catch(error => {
          console.log(error)
        })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            this.getOrder()
          }
        }).catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
