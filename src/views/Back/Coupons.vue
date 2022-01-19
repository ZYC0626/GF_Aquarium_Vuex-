<template>
  <div>
    <Loading :active="isLoading">
      <div class='loader-wrapper'><span class="loader"></span></div>
    </Loading>
    <div class="d-flex justify-content-between align-items-center mt-4">
    <h3 class="m-0 d-flex align-items-center"><span class="material-icons md-24 me-2">
    sell
    </span>優惠券列表</h3>
      <button type="button" class="btn back-end-btn back-end-add me-4" @click="openCouponModal(true)">
        <span class="material-icons">
        add
        </span>
      </button>
    </div>
    <hr>
    <div class="table-responsive-md mb-3">
      <table class="table mt-4 text-nowrap">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th class="text-end">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
              <span v-else class="text-muted">未起用</span>
            </td>
            <td class="d-flex justify-content-end">
              <button type="button" class="btn back-end-btn back-end-edit me-2" @click="openCouponModal(false, item)">
                <span class="material-icons">
                edit
                </span>
              </button>
              <button type="button" class="btn back-end-btn back-end-del"  @click="openDelCouponModal(item)">
                <span class="material-icons">
                clear
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CouponModal
      :coupon="tempCoupon"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script>
import CouponModal from '@/components/Back/CouponModal.vue'
import DelModal from '@/components/Back/DelModal.vue'
export default {
  components: { CouponModal, DelModal },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    getCoupons () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct).then((response) => {
        this.coupons = response.data.coupons
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    updateCoupon (tempCoupon) {
      this.tempCoupon = tempCoupon
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      let title = '新增優惠券'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        httpMethod = 'put'
        title = '修改優惠券'
      }
      this.$http[httpMethod](url, { data: this.tempCoupon }).then((response) => {
        this.$httpMessageState(response, title)
        this.getCoupons()
        this.$refs.couponModal.hideModal()
      })
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '刪除優惠券')
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getCoupons()
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
