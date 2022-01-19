<template>
  <Loading :active="isLoading">
    <div class='loader-wrapper'><span class="loader"></span></div>
  </Loading>
  <section>
    <div class="container-fluid p-0">
      <div
        class="landing bg-cover bg-center"
        style="
          background-image: url(https://images.unsplash.com/photo-1603533496487-2248b49f337d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80);
        "
      ></div>
    </div>
  </section>

  <section class="container py-4" ref="content">
    <a href="#" @click.prevent="$router.go(-1)"><i class="bi bi-arrow-left me-3 fs-2"></i></a>
    <nav>
      <ol class="breadcrumb fw-700">
        <li class="breadcrumb-item">
          <router-link to="/products/all" class="text-decoration-none">全部</router-link>
        </li>
        <li class="breadcrumb-item">
          <a href="#" class="text-decoration-none"
          @click.prevent="goToCategory(product.category)">{{ product.category }}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-lg-8">
        <div class="bg-cover bg-center prodInfo-img"
        :style="{ 'background-image': 'url(' + product.imageUrl + ')' }" v-if="product.imageUrl"></div>
      </div>
      <div class="col-lg-4 py-3">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="m-0">{{ product.title }}</h2>
          <a href="#" title="加入收藏" @click.prevent="updateLikes(product)">
            <i class="bi bi-star-fill fs-2" v-if="likesId.includes(product.id)"></i>
            <i class="bi bi-star fs-2" v-else></i>
          </a>
        </div>
        <hr />
        <p class="text-muted">{{ product.description }}</p>
        <ul class="py-3" style="list-style: circle;">
          <li class="mb-3" v-for="(item, index) in contents" :key="index">
          {{ item }}
          </li>
        </ul>
        <hr />

        <div class="d-flex justify-content-end align-items-end mb-3">
          <del class="text-muted">售價 ${{ product.origin_price }}</del>
          <div class="h3 text-danger ms-auto mb-0">
            <small>網路價 NT$</small>
            <strong>{{ product.price }}</strong>
            <span class="fs-6">({{ product.unit }})</span>
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-xl-7 col-lg-10 col-6">
            <div class="input-group input-group-lg">
              <button class="btn btn-primary" type="button" id="btn-minus"
              @click="qty -= 1" :disabled="qty === 1">
                -
              </button>
              <input
                type="number"
                class="form-control"
                placeholder=""
                v-model="qty"
                min="1"
              />
              <button class="btn btn-primary" type="button" id="btn-add"
              @click="qty += 1">
                +
              </button>
            </div>
          </div>
        </div>
        <div class="row align-items-center mt-3">
          <div class="col">
            <button class="btn btn-lg btn-outline-primary w-100" type="button"
            @click="addCart" :disabled="isAddCart">
            <div class="spinner-border spinner-border-sm text-primary me-3" role="status" v-if="isAddCart">
              <span class="visually-hidden">Loading...</span>
            </div>
            <i class="bi bi-cart-plus-fill me-3" v-if="!isAddCart"></i>加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="warning my-4 p-4" role="alert">
          <h2 class="my-3"><i class="bi bi-exclamation-circle me-2"></i>購物須知</h2>
          <ol>
            <li class="mb-2">出貨活體大小均有詳細標明 販賣活體均先做過檢役以及叨養，穩定且有保障</li>
            <li class="mb-2">夏日水溫變化大活體不耐久候，會使用保冷劑且避免直接接觸活體會另用報紙包裝並僅使用宅配配送</li>
            <li class="mb-2">活體當日收件後如有發現死亡請立即拍照，並立即聯絡我們，會盡速處理</li>
            <li class="mb-2">若商品為易碎物，如水族缸，請務必小心取出為避免爭議建議錄影開箱，如有破碎也請立即聯絡我們，會盡速處理</li>
          </ol>
          <a href="mailto:greenfish@aquarium.com" class="text-end mb-0 text-decoration-none d-block"><i class="bi bi-envelope-fill me-2"></i> greenfish@aquarium.com</a>
          <a href="tel:02-1234-5678" class="text-end text-decoration-none d-block"><i class="bi bi-telephone-fill"></i> 02-1234-5678</a>
        </div>
      </div>
    </div>
    <h2 class="mt-3">你可能也喜歡...</h2>
    <hr>
    <Swiper :products="samecategory"></Swiper>
  </section>
</template>

<script>
import Swiper from '@/components/Front/Swiper.vue'

export default {
  components: {
    Swiper
  },
  data () {
    return {
      id: '',
      isLoading: false,
      isAddCart: false,
      contents: [],
      product: {},
      qty: 1,
      likes: [],
      likesId: [],
      samecategory: [],
      likeRes: {
        data: {
          data: {},
          message: '最愛列表',
          success: true
        }
      }
    }
  },
  watch: {
    qty: function () {
      if (!this.qty) {
        this.qty = 1
      }
    },
    $route () {
      // 相同path 不同 praram 時需要 透過watch $route 來重新Render
      if (this.$route.name === 'prodInfo') {
        this.id = this.$route.params.productId
        this.getProduct()
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
          this.contents = response.data.product.content.split('@')
          this.getSameCategoryProdutc()
          this.changeWindowY()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: this.id,
        qty: this.qty
      }
      this.isAddCart = true
      this.$http.post(api, { data: cart }).then((response) => {
        this.$httpMessageState(response, '加入購物車')
        this.isAddCart = false
        if (response.data.success) {
          // this.emitter.emit('updatecart')
          this.$store.dispatch('getCart')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getLikes () {
      const likeStr = localStorage.getItem('likelist') ? localStorage.getItem('likelist') : '[]'
      this.likes = JSON.parse(likeStr)
      this.likesId = this.likes.map(x => x.id)
    },
    updateLikes (data) {
      if (!this.likesId.includes(data.id)) {
        this.likes.push({
          id: data.id,
          title: data.title,
          imageUrl: data.imageUrl
        })
        this.$httpMessageState(this.likeRes, '加入最愛列表')
      } else {
        this.likes = this.likes.filter((x) => {
          return x.id !== data.id
        })
        this.$httpMessageState(this.likeRes, '從最愛列表移除')
      }
      this.likesId = this.likes.map(x => x.id)
      this.saveLocalStorage(this.likes)
    },
    saveLocalStorage (data) {
      const datastr = JSON.stringify(data)
      try {
        localStorage.setItem('likelist', datastr)
      } catch (e) {
        return false
      }
    },
    goToCategory (category) {
      this.$router.push(`/products/${category}`)
    },
    getSameCategoryProdutc () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          //
          this.samecategory =
          response.data.products.filter(x => x.category === this.product.category).length > 1 ? response.data.products.filter(x => x.category === this.product.category) : response.data.products
        }
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    changeWindowY () {
      const yOffset = -120
      const el = this.$refs.content
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  },
  unmounted () {
    this.emitter.off('updatelikeId', this.getLikes)
  },
  mounted () {
    this.emitter.on('updatelikeId', this.getLikes)
  },
  created () {
    this.id = this.$route.params.productId
    this.getLikes()
    this.getProduct()
  }
}
</script>
