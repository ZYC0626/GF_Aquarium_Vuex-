<template>
  <Loading :active="isLoading">
    <div class='loader-wrapper'><span class="loader"></span></div>
  </Loading>
  <div class="d-flex justify-content-between align-items-center mt-4">
    <h3 class="m-0 d-flex align-items-center"><span class="material-icons me-2 md-24">
    subject
    </span>商品列表</h3>
    <button type="button" class="btn back-end-btn back-end-add me-4"
    v-on:click="openModal(true)">
      <span class="material-icons">
      add
      </span>
    </button>
  </div>
  <hr>
  <div class="table-responsive-lg mb-3">
    <table class="table mt-4 text-nowrap">
      <thead>
        <tr>
          <th width="80">分類</th>
          <th>產品名稱</th>
          <th class="text-end" width="100">原價</th>
          <th class="text-end" width="100">售價</th>
          <th width="80">是否啟用</th>
          <th class="text-end" width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td><span class="badge rounded-pill bg-primary">{{ item.category }}</span></td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-end">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td class="d-flex justify-content-end">
            <button type="button" class="btn back-end-btn back-end-edit me-2" @click="openModal(false, item)">
              <span class="material-icons">
              edit
              </span>
            </button>
            <button type="button" class="btn back-end-btn back-end-del"  @click="openDelProdModal(item)">
              <span class="material-icons">
              clear
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination
  :pages="pagination"
  v-on:emit-pages="getProducts"
  ></Pagination>
  <ProductModal ref="productModal"
  :product="tempProduct"
  v-on:update-product="updateProduct"></ProductModal>
  <DelModal ref="delProdModal"
  :item="tempProduct"
  v-on:del-item="deleteProduct"
  ></DelModal>
</template>

<script>
import ProductModal from '@/components/Back/ProductModal.vue'
import DelModal from '@/components/Back/DelModal.vue'
import Pagination from '@/components/Share/Pagination.vue'

export default {
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      }).catch(error => {
        console.log(error)
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    openDelProdModal (item) {
      this.tempProduct = { ...item }
      const delProdModal = this.$refs.delProdModal
      delProdModal.showModal()
    },
    deleteProduct (item) {
      this.tempProduct = item
      const delProdModal = this.$refs.delProdModal
      this.isLoading = true
      //  /api/:api_path/admin/product/:product_id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          this.isLoading = false
          delProdModal.hideModal()
          this.getProducts()
        }).catch(error => {
          console.log(error)
        })
    },
    updateProduct (item) {
      this.tempProduct = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 修改
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            productComponent.hideModal()
            this.getProducts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            productComponent.hideModal()
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新錯誤',
              content: res.data.message.join('、')
            })
          }
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
