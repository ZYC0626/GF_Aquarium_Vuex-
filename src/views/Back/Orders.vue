<template>
  <Loading :active="isLoading">
    <div class='loader-wrapper'><span class="loader"></span></div>
  </Loading>
  <div class="mt-4">
    <h3 class="m-0 d-flex align-items-center"><span class="material-icons me-2 md-24">
    rule
    </span>訂單列表</h3>
  </div>
  <hr>
  <div class="table-responsive-xl mb-3">
    <table class="table mt-4 text-nowrap">
      <thead>
        <tr>
          <th width="50">明細</th>
          <th>購買時間</th>
          <th class="d-none d-md-table-cell">Email</th>
          <th class="d-md-none d-table-cell">姓名</th>
          <th class="d-none d-md-table-cell">購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th class="text-end">刪除</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>
              <button
              class="btn btn-outline-secondary border-0 btn-sm"
              @click="openModal(false, item)"
              >
              <i class="bi bi-file-text"></i>
              </button>
            </td>
            <td>{{ $filters.date(item.create_at) }}</td>
            <td class="d-none d-md-table-cell"><span v-text="item.user.email" v-if="item.user"></span></td>
            <td class="d-md-none d-table-cell"><span v-text="item.user.name" v-if="item.user"></span></td>
            <td class="d-none d-md-table-cell">
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <!-- <td>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn back-end-btn back-end-del"  @click="openDelOrderModal(item)">
                <span class="material-icons">
                clear
                </span>
                </button>
              </div>
            </td> -->
            <td class="text-end">
              <button
                class="btn btn-outline-danger border-0 btn-sm"
                @click="openDelOrderModal(item)"
                >
              <i class="bi bi-x-lg"></i>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <OrderModal
    :order="tempOrder"
    ref="orderModal"
    @update-order="updatePaid"
  ></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import DelModal from '@/components/Back/DelModal.vue'
import OrderModal from '@/components/Back/orderModal.vue'
import Pagination from '@/components/Share/Pagination.vue'
export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    openModal (isNew, item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$httpMessageState(response, '更新付款狀態')
      }).catch(error => {
        console.log(error)
      })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getOrders(this.currentPage)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
