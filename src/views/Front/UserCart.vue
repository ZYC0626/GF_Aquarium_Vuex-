<template>
  <Loading :active="isLoading || getCartLoading">
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
  <CouponInfo></CouponInfo>

  <div class="container py-4 my-md-5">
    <h2 class="text-center text-md-start">確認購物車明細</h2>
    <hr />
    <div class="row">
      <div class="col-md-8">
        <table class="table d-md-table d-none">
          <thead>
            <tr>
              <th>品名</th>
              <th width="125px">數量</th>
              <th class="text-end">價格</th>
              <th width="25px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in cart.carts" :key="item.id">
              <td class="align-middle">
                <div class="d-lg-flex align-items-center">
                  <div class="bg-cover bg-center me-lg-4 mb-2 mb-lg-0 cart-img"
                    :style="{ 'background-image': 'url(' + item.product.imageUrl + ')' }"></div>
                  <span>{{ item.product.title }}</span>
                </div>
              </td>
              <td class="align-middle">
                <div class="input-group input-group-sm">
                  <button class="btn btn-primary" type="button" id="btn-minus"
                  :disabled="item.qty === 1 || status.loadingItem === item.id"
                  @click="countButton(item, -1)">
                    -
                  </button>
                  <input
                    type="number"
                    class="form-control"
                    placeholder=""
                    min="1"
                    v-model="item.qty"
                    @change="updateCart(item)"
                    :disabled="status.loadingItem === item.id"
                  />
                  <button class="btn btn-primary" type="button" id="btn-add"
                  :disabled="status.loadingItem === item.id"
                  @click="countButton(item, 1)">
                    +
                  </button>
                </div>
              </td>
              <td class="text-end align-middle" :class="{ 'text-success': cart.final_total !== cart.total }">NT$ {{ $filters.currency(item.final_total) }}</td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger border-0 btn-sm"
                @click="delCart(item)">
                  <i class="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="text-center py-4" v-if="!cart.total">
                購物車尚無明細
              </td>
            </tr>
          </tbody>
          <tfoot class="fw-600">
            <tr>
              <td colspan="2">總計 :</td>
              <td class="text-end">NT$ {{ $filters.currency(cart.total) }}</td>
              <td></td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td class="text-success" colspan="2">折扣後 :</td>
              <td class="text-end text-success">NT$ {{ $filters.currency(cart.final_total) }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <table class="table d-table d-md-none">
          <thead>
            <tr>
              <th>品項</th>
              <th class="text-end">價格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in cart.carts" :key="item.id">
              <td colspan="2">
                <div class="d-flex justify-content-between border-bottom py-2">
                  <div class="bg-cover bg-center cart-img"
                  :style="{ 'background-image': 'url(' + item.product.imageUrl + ')' }"></div>
                  <div
                    class="
                      d-flex
                      flex-column
                      justify-content-around
                      align-items-end
                    "
                  >
                    <button type="button" class="btn btn-danger border-0 btn-sm"
                    @click="delCart(item)">
                      <i class="bi bi-x-lg"></i>
                    </button>
                    <h4>{{ item.product.title }}</h4>
                  </div>
                </div>
                <div
                  class="
                    d-flex
                    justify-content-between
                    align-items-center
                    border-bottom
                    py-2
                  "
                >
                  <div class="input-group input-group-sm w-50">
                    <button
                      class="btn btn-primary"
                      type="button"
                      id="btn-minus"
                      :disabled="item.qty === 1 || status.loadingItem === item.id"
                      @click="countButton(item, -1)">
                      -
                    </button>
                    <input
                      type="number"
                      class="form-control"
                      placeholder=""
                      v-model="item.qty"
                      min="1"
                      :disabled="status.loadingItem === item.id"
                      @change="updateCart(item)"
                    />
                    <button class="btn btn-primary" type="button" id="btn-add"
                    @click="countButton(item, 1)"
                    :disabled="status.loadingItem === item.id"
                    >
                      +
                    </button>
                  </div>
                  <span class="text-end">NT$ {{ $filters.currency(item.final_total) }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center py-4" v-if="!cart.total">
                購物車尚無明細
              </td>
            </tr>
          </tbody>
          <tfoot class="fw-600">
            <tr>
              <td>總計 :</td>
              <td class="text-end">NT$ {{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td class="text-success">折扣後 :</td>
              <td class="text-end text-success">NT$ {{ $filters.currency(cart.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
        <button type="button" class="btn btn-outline-danger my-3"
        @click="delCart(0)"
        v-if="cart.total">
          <i class="bi bi-trash me-2"></i>清空購物車
        </button>
        <div class="input-group mb-3 input-group-sm" v-if="cart.total">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
            @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>

        <div class="col d-flex mb-3">
          <router-link to="/products/all" class="btn btn-secondary me-auto"><i class="bi bi-chevron-left"></i>繼續購物</router-link>
          <router-link to="/checkoutInfo" class="btn btn-primary" v-if="cart.total">建立訂單<i class="bi bi-chevron-right"></i></router-link>
        </div>
      </div>
      <div class="col-md-4">
        <div class="warning p-4" role="alert">
          <h2 class="text-center my-4"><i class="bi bi-exclamation-circle me-2"></i>注意</h2>
          <p>
            前往結帳前，請務必再次檢查購買的品項及數量是否正確，否則貨物一但寄出則不能再取消訂單。
          </p>
          <p>
            為保障雙方權益，若對商品或運送有疑慮，煩請開啟包裝時請錄影存證，並主動聯繫並告知問題原因再請申請退貨。
          </p>
          <p class="text-end">祝福你購物愉快！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CouponInfo from '@/components/Front/CouponInfo.vue'
export default {
  components: {
    CouponInfo
  },
  data () {
    return {
      isLoading: false,
      status: {
        loadingItem: ''
      },
      // cart: [],
      coupon_code: ''
    }
  },
  inject: ['emitter'],
  computed: {
    getCartLoading () {
      return this.$store.state.cartLoading
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
      // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      // this.$http.get(api).then((response) => {
      //   this.isLoading = false
      //   this.cart = response.data.data
      //   this.emitter.emit('updatecart')
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    countButton (item, value) {
      item.qty += value
      this.updateCart(item)
    },
    updateCart (item) {
      if (!item.qty) {
        // 防0
        item.qty = 1
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.status.loadingItem = item.id
      this.isLoading = true
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(api, { data: cart }).then((res) => {
        if (res.data.success) {
          this.getCart()
        }
        this.isLoading = false
        this.status.loadingItem = ''
        this.$httpMessageState(res, '修改商品數量')
      }).catch(error => {
        console.log(error)
      })
    },
    delCart (item) {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      if (!item) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      }
      this.isLoading = true
      this.$http.delete(url)
        .then((res) => {
          this.$httpMessageState(res, '從購物車移除')
          this.isLoading = false
          this.getCart()
        }).catch(error => {
          console.log(error)
        })
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      this.isLoading = true
      const coupon = {
        code: this.coupon_code
      }
      this.$http.post(url, { data: coupon })
        .then((res) => {
          this.$httpMessageState(res, '套用優惠碼')
          this.isLoading = false
          this.getCart()
        }).catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
