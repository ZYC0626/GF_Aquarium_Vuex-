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
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h2 class="text-center mb-0" style="letter-spacing: 1.5rem">商品列表</h2>
        <hr />
      </div>
    </div>
    <div class="row g-0">
      <ul class="nav justify-content-center mt-3 mb-5">
        <li class="nav-item order-last order-md-0">
          <a class="nav-link categoryItem" href="#"
          :class="{ active: category === 'all' }"
          @click.prevent="goToCategory('all')">全部</a>
        </li>
        <li class="nav-item">
          <a class="nav-link categoryItem" href="#"
          :class="{ active: category === '魚隻' }"
          @click.prevent="goToCategory('魚隻')">魚隻</a>
        </li>
        <li class="nav-item">
          <a class="nav-link categoryItem" href="#"
          :class="{ active: category === '造景' }"
          @click.prevent="goToCategory('造景')">造景</a>
        </li>
        <li class="nav-item">
          <a class="nav-link categoryItem" href="#"
          :class="{ active: category === '設備' }"
          @click.prevent="goToCategory('設備')">設備</a>
        </li>
        <li class="nav-item">
          <a class="nav-link categoryItem" href="#"
          :class="{ active: category === '套裝' }"
          @click.prevent="goToCategory('套裝')">套裝</a>
        </li>
      </ul>
      <div class="col-md-12 px-2">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6 mb-3" v-for="(item) in products" :key="item.id">
            <ProdCard :prod="item" :likes="likesId" :tag="true"
            @like="updateLikes"></ProdCard>
          </div>
        </div>
        <Pagination class="mt-4"
        :pages="pagination"
        v-on:emit-pages="getProducts"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ProdCard from '@/components/Front/ProdCard.vue'
import Pagination from '@/components/Share/Pagination.vue'

export default {
  components: {
    ProdCard,
    Pagination
  },
  data () {
    return {
      category: '',
      pagination: {},
      products: [],
      isLoading: false,
      likes: [],
      likesId: []
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      if (this.category !== 'all') {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      }
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          if (this.category !== 'all') {
            this.products = response.data.products.filter(x => x.category === this.category)
            // make custom pagination
            const pageItem = 5
            const totalPage = Math.ceil(this.products.length / pageItem)
            const start = (page - 1) * pageItem
            const end = page * pageItem
            this.products = this.products.slice(start, end)
            this.pagination = {
              category: null,
              current_page: page,
              has_next: page < totalPage,
              has_pre: page !== 1,
              total_pages: totalPage
            }
          } else {
            this.products = response.data.products
            this.pagination = response.data.pagination
          }
        }
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    getLikes () {
      const likeStr = localStorage.getItem('likelist') ? localStorage.getItem('likelist') : '[]'
      this.likes = JSON.parse(likeStr)
    },
    updateLikes (data) {
      if (!this.likesId.includes(data.id)) {
        this.likes.push(data)
      } else {
        this.likes = this.likes.filter((x) => {
          return x.id !== data.id
        })
      }
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
    messagePush (n, o) {
      if (o.length > 0) {
        const res = {
          data: {
            data: {},
            message: '最愛列表',
            success: true
          }
        }
        if (n.length !== o.length) {
          this.$httpMessageState(res, '從最愛列表移除')
        } else {
          this.$httpMessageState(res, '加入最愛列表')
        }
      }
    }
  },
  watch: {
    // deep
    likes: {
      handler (n, o) {
        this.messagePush(n, o)
        this.saveLocalStorage(this.likes)
        this.likesId = this.likes.map(x => x.id)
      },
      deep: true
    },
    $route () {
      // 相同path 不同 praram 時需要 透過watch $route 來重新Render
      if (this.$route.name === 'products') {
        this.category = this.$route.params.category
        this.getProducts()
      }
    }
  },
  unmounted () {
    this.emitter.off('updatelike', this.getLikes)
  },
  mounted () {
    this.emitter.on('updatelike', this.getLikes)
  },
  created () {
    this.category = this.$route.params.category
    this.getProducts()
    this.getLikes()
  }
}
</script>
