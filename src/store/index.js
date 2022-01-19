import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {
    return {
      cart: [],
      cartLoading: false
    }
  },
  getters: {
    count (state) {
      if (state.cart.carts) {
        return state.cart.carts.length
      } else {
        return 0
      }
    },
    coupon (state) {
      return state.count > 0 ? (state.cart.carts[0].coupon ? state.cart.carts[0].coupon.code : '') : ''
    }
  },
  actions: {
    getCart (context) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      context.commit('updateLoading')
      axios.get(api).then((response) => {
        context.commit('updateLoading')
        context.commit('updateCart', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mutations: {
    updateCart (state, payload) {
      state.cart = payload
      console.log('vuex worked!')
    },
    updateLoading (state) {
      state.cartLoading = !state.cartLoading
    }
  }
})

export default store
