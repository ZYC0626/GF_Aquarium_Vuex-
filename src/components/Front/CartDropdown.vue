<template>
  <div class="dropdown order-md-1">
    <button
      class="btn btn-cart position-relative"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <div class="material-icons md-36">shopping_cart</div>
      <span class="badge rounded-pill bg-danger position-absolute">{{ count }}</span>
    </button>
    <div class="dropdown-menu dropdown-menu-end">
      <div class="p-4 py-3 text-center" v-if="lock">
        <div class="mw-300">
          <i class="bi bi-bag-check-fill fs-1"></i>
          <p class="m-0">已在購物確認流程</p>
        </div>
      </div>
      <div class="px-md-4 px-3 py-3" v-else>
        <div v-if="count > 0">
          <h6>已選擇商品</h6>
          <table class="table table-sm mw-300">
            <tbody>
              <tr v-for="(item) in cart.carts" :key="item.id">
                <td class="align-middle text-center">
                  <a
                    href="#"
                    class="text-danger"
                    @click.prevent="delCart(item)"
                  >
                    <i class="bi bi-x-circle-fill"></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                <td class="align-middle text-end">NT$ {{ $filters.currency(item.final_total) }}</td>
              </tr>
              <tr>
                <td colspan="4" class="text-end text-success" v-if="coupon">
                  已套用優惠碼 :  {{ coupon }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-grid gap-2">
            <router-link to="/cart" class="btn btn-primary"
              ><i class="bi bi-bag-check me-3"></i>結帳去</router-link
            >
          </div>
        </div>
        <div v-else>
          <div class="mw-300 text-primary">
            <p>購物車還沒有加入任何商品!</p>
          </div>
          <div class="d-grid gap-2">
            <router-link to="/products/all" class="btn btn-primary"
              ><i class="bi bi-cart-plus me-3"></i>購物去</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // cart: [],
      // count: 0,
      // coupon: '',
      lock: false
    }
  },
  computed: {
    getCartLoading () {
      return this.$store.state.cartLoading
    },
    cart () {
      return this.$store.state.cart
    },
    count () {
      return this.$store.getters.count
    },
    coupon () {
      return this.$store.getters.coupon
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
      // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.$http.get(api).then((response) => {
      //   this.cart = response.data.data
      //   this.count = this.cart.carts.length
      //   this.coupon = this.count > 0 ? (this.cart.carts[0].coupon ? this.cart.carts[0].coupon.code : '') : ''
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    delCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(url)
        .then((res) => {
          this.$httpMessageState(res, '從購物車移除')
          this.getCart()
        }).catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    $route (to) {
      if (to.fullPath === '/cart' || to.fullPath === '/checkoutInfo' || this.$route.name === 'checkoutPay') {
        this.lock = true
      } else {
        this.lock = false
      }
    }
  },
  inject: ['emitter'],
  unmounted () {
    // this.emitter.off('updatecart', this.getCart)
  },
  mounted () {
    // this.emitter.on('updatecart', this.getCart)
  },
  created () {
    this.getCart()
    if (this.$route.fullPath === '/cart' || this.$route.fullPath === '/checkoutInfo') {
      this.lock = true
    }
  }
}
</script>
