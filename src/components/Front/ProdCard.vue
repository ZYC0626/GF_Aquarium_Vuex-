<template>
  <div class="prodCard">
    <div class="prodCard-like" @click="likeProd(prod)" v-if="tag">
      <i class="bi bi-star-fill" v-if="likes.includes(prod.id)"></i>
      <i class="bi bi-star" v-else></i>
    </div>
    <!-- <div class="prodCard-tag" v-if="tag">推薦</div> -->
    <a class="hover" href="#" @click.prevent="getProduct(prod.id)">
      <div class="prodCardImg" :style="{ 'background-image': `url(${prod.imageUrl})` }">
      </div>
    </a>
    <a href="#" class="h3 prodCard-title text-decoration-none" @click.prevent="getProduct(prod.id)">{{ prod.title }}</a>
    <hr class="m-0" />
    <div class="prodCard-price">
      <del class="origin">NT$ {{ prod.origin_price }}</del>
      <p class="mb-0 sale">NT$ {{ prod.price }}</p>
    </div>
    <div class="prodCard-footer">
      <a href="#" class="btn btn-outline-primary border-0 py-3 w-100"
      :class="{disabled: status.loadingItem === prod.id}"
        @click.prevent="addCart(prod.id)">
        <div v-if="status.loadingItem === prod.id" class="spinner-border spinner-border-sm text-primary me-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <i class="bi bi-cart-plus-fill" v-if="status.loadingItem !== prod.id"></i>加入購物車</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProdCard',
  props: ['prod', 'likes', 'tag'],
  data () {
    return {
      status: {
        loadingItem: ''
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((response) => {
        this.$httpMessageState(response, '加入購物車')
        this.status.loadingItem = ''
        // this.emitter.emit('updatecart')
        this.$store.dispatch('getCart')
      }).catch(error => {
        console.log(error)
      })
    },
    likeProd (item) {
      const dataItem = {
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl
      }
      this.$emit('like', dataItem)
    }
  },
  created () {
  }
}
</script>
