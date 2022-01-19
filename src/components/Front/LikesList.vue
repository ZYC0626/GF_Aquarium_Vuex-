<template>
  <div
    class="offcanvas offcanvas-custom"
    data-bs-scroll="true"
    tabindex="-1"
    id="collectCanvas"
    ref="canvas"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-primary"><i class="bi bi-star-fill me-2"></i>最愛列表</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <hr class="m-0" />
    <div class="offcanvas-body">
      <div class="likeItem" :class="{'slide-out': removeId === item.id}" v-for="(item) in likes" :key="item.id">
        <div class="likeItem-remove">
          <button type="button" class="btn" @click="updateLikes(item)" :disabled="removeId !== ''"><i class="bi bi-pin-angle-fill"></i></button>
        </div>
        <div class="row g-0 mb-3">
          <div class="col-5">
            <div class="likeItemImg" :style="{ 'background-image': `url(${item.imageUrl})` }"></div>
          </div>
          <div
            class="
              col-7
              d-flex
              align-items-center
              justify-content-center
            "
          >
          <a href="#" class="text-decoration-none text-center likeItme-text"
          :class="{ active: $route.params.productId === item.id }"
          @click.prevent="goToProd(item.id)">
          <i class="bi bi-geo-alt-fill me-1" v-if="$route.params.productId === item.id"></i>
          <i class="bi bi-search me-1" v-else></i>
          <span >{{ item.title }}</span>
          </a>
          </div>
        </div>
      </div>
      <div class="fs-5 mt-4 text-primary">
        <p v-if="likes.length === 0">您還沒有將喜愛的商品加入最愛</p>
        <p>快使用<i class="bi bi-star mx-2"></i>將商品加入最愛列表吧 !</p>
        <p>讓你快速抵達商品資訊 !</p>
        <!-- <router-link to="/products/all" class="btn btn-outline-primary mt-2"
        data-bs-toggle="offcanvas" data-bs-target="#collectCanvas">前往商品列表<i class="bi bi-chevron-right"></i></router-link> -->
        <button type="button" class="btn btn-outline-primary mt-2"
        data-bs-toggle="offcanvas" data-bs-target="#collectCanvas"
        @click="goToProducts">
        前往商品列表<i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      likes: [],
      likesId: [],
      removeId: ''
    }
  },
  methods: {
    getLikes () {
      // console.log(localStorage.getItem('likelist'))
      const likeStr = localStorage.getItem('likelist') ? localStorage.getItem('likelist') : '[]'
      this.likes = JSON.parse(likeStr)
      this.likesId = this.likes.map(x => x.id)
    },
    goToProd (id) {
      this.$router.push(`/product/${id}`)
    },
    goToProducts () {
      this.$router.push('/products/all')
    },
    updateLikes (data) {
      this.removeId = data.id
      setTimeout(() => {
        this.likes = this.likes.filter((x) => {
          return x.id !== data.id
        })
        this.likesId = this.likes.map(x => x.id)
        this.saveLocalStorage(this.likes)
        // 改變Like
        if (this.$route.name === 'products') {
          this.emitter.emit('updatelike')
        } else if (this.$route.name === 'prodInfo') {
          this.emitter.emit('updatelikeId')
        }
        this.removeId = ''
      }, 800)
    },
    saveLocalStorage (data) {
      const datastr = JSON.stringify(data)
      try {
        localStorage.setItem('likelist', datastr)
      } catch (e) {
        return false
      }
    },
    messagePush () {
      const res = {
        data: {
          data: {},
          message: '最愛列表',
          success: true
        }
      }
      this.$httpMessageState(res, '從最愛列表移除')
    }
  },
  inject: ['emitter'],
  created () {
    this.getLikes()
  },
  mounted () {
    this.$refs.canvas.addEventListener('show.bs.offcanvas', this.getLikes)
  }
}
</script>
