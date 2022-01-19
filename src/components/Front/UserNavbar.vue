<template>
  <nav class="navbar navbar-expand-md navbar-light bg-xl-transparent fixed-top transitionNavbar fw-700"
  >
    <div class="container-fluid px-0">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand m-0" href="#">
        <img
          src="@/assets/images/WLOGODeepBlue.png"
          height="55"
          alt="LOGO"
          class="d-md-inline-block d-none"
        />
        <img
          src="@/assets/images/WLOGODeepBlue.png"
          height="40"
          alt="LOGO"
          class="d-inline-block d-md-none"
        />
      </a>
      <Cart></Cart>
      <div class="collapse navbar-collapse" id="navbarText" ref="collapseX">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="#" class="nav-link text-center px-lg-5 nav-link-shadow"
            :class="{ active: routeName === 'Home' }">首頁</a>
          </li>
          <li class="nav-item">
            <router-link to="/products/all" class="nav-link text-center px-lg-5 nav-link-shadow"
            :class="{ active: routeName === 'products' || routeName === 'prodInfo' }">商品</router-link>
          </li>
          <li class="nav-item">
            <!-- <span data-bs-toggle="collapse" data-bs-target="#navbarText"><a class="nav-link text-center px-lg-5" data-bs-toggle="offcanvas" href="#collectCanvas">最愛</a></span> -->
            <a class="nav-link text-center px-lg-5 nav-link-shadow" data-bs-toggle="offcanvas" href="#collectCanvas" @click.prevent="test">最愛</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Cart from '@/components/Front/CartDropdown.vue'

export default {
  components: {
    Cart
  },
  data () {
    return {
      routeName: ''
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.routeName = this.$route.name
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    $route () {
      this.routeName = this.$route.name
    }
  },
  methods: {
    handleScroll () {
      const el = document.querySelector('.navbar')
      if (window.scrollY > 10) {
        el.classList.add('bg-light')
        el.classList.remove('bg-xl-transparent')
      } else {
        el.classList.remove('bg-light')
        el.classList.add('bg-xl-transparent')
      }
    }
  }
}
</script>
