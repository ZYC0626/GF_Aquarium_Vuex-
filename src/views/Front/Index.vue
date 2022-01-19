<template>
  <Loading :active="isLoading">
    <div class='loader-wrapper'><span class="loader"></span></div>
  </Loading>
  <section class="promo bg-white">
    <div class="promo_box">
      <h1 class="title d-md-inline-block d-none">
        GREEN FISH<br />
        AQUARIUM
      </h1>
      <p class="content">創造專屬水中樂園</p>
    </div>
    <div class="row g-0 position-relative promo_carousel">
      <div class="col-md-3 d-flex flex-column justify-content-end">
        <div class="water-waves d-md-block d-none">
          <div class="water-wave1"></div>
          <div class="water-wave2"></div>
          <div class="water-wave3"></div>
          <a class="water-text text-decoration-none" href="#" @click.prevent="slideDown"
            >開始打造吧</a
          >
        </div>
      </div>
      <div class="col-md-9">
        <div
          id="carouselHead"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3500"
          data-bs-pause="false"
        >
          <div class="carousel-inner">
            <div
              class="carousel-item carousel-item-bgImg bg-cover bg-center"
              style="
                background-image: url(https://images.unsplash.com/photo-1584881460925-be7b0ab68b92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80);
              "
            >
              <div class="carousel-caption-custom">
                <div class="carousel-caption-custom-text">霓虹燈</div>
              </div>
            </div>
            <div
              class="carousel-item carousel-item-bgImg bg-cover bg-center"
              style="
                background-image: url(https://images.unsplash.com/photo-1563242125-f1d9041ef6b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
              "
            >
              <div class="carousel-caption-custom">
                <div class="carousel-caption-custom-text">橘子霓虹珍珠燕子</div>
              </div>
            </div>
            <div
              class="carousel-item active carousel-item-bgImg bg-cover bg-right"
              style="
                background-image: url(https://images.unsplash.com/photo-1519657635301-68bb60c798f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1046&q=80);
              "
            >
              <div class="carousel-caption-custom">
                <div class="carousel-caption-custom-text">暹羅鬥魚</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wave-bottom d-md-block d-none bg-white" id="maincontent">
  </section>

  <section class="container-fluid px-0 py-md-0 py-lg-8 bg-white"
  >
    <div class="container-lg slide-in slide-start">
      <div class="d-lg-none bg-white px-0 py-4">
        <div class="row justify-content-center">
          <div class="col-10 col-md-8">
            <p class="fs-1 text-center intro-banner-title mb-0"
            >映入眼簾的瞬間</p>
          </div>
        </div>
      </div>
    </div>
    <div class="intro">
      <div class="container-lg px-0">
        <div class="row g-0 g-lg-3">
          <div class="col-lg-6 break-y-left mb-lg-3">
            <!-- break-y-left -->
            <div class="intro-image bg-cover bg-center h-100"
              style="
              background-image: url(https://images.unsplash.com/photo-1436891461396-6df41158de09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80);">
            </div>
          </div>
          <div class="col-lg-6 mt-0">
            <div class="intro-text slide-in slide-start">
              <div class="intro-break d-none d-lg-block">
                <div class="intro-break-text">
                  ＿映入眼簾的瞬間
                </div>
              </div>
              <p>可曾在城市的咖啡館、餐廳、百貨公司中，
              遇上形形色色、色彩斑斕的玻璃水族缸。</p>
              <p>看著五顏六色的小魚們在其中任意優遊，
              彷彿身上的煩惱都隨著氣泡逐一散去...。</p>
              <p>離開時的映入眼簾的感動卻都依留在心中...。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container-fluid p-0">
      <!-- 替代 background-attachment: fixed -->
      <div class="d-flex align-items-start">
        <div class="bg-white border-0" style="height: 240px; width: 13%;"></div>
        <div class="bg-white border-0" style="height: 10px;   width: 23%;"></div>
        <div class="bg-white border-0" style="height: 240px; width: 1%;"></div>
        <div class="bg-white border-0" style="height: 50px;  width: 42%;"></div>
        <div class="bg-white border-0" style="height: 240px; width: 25%;"></div>
      </div>
      <div class="bg-white border-0" style="height: 8px; width: 100%;"></div>
      <div class="d-flex align-items-end">
        <div class="bg-white border-0" style="height: 260px; width: 17%;"></div>
        <div class="bg-white border-0" style="height: 60px;  width: 40%;"></div>
        <div class="bg-white border-0" style="height: 260px; width: 1%;"></div>
        <div class="bg-white border-0" style="height: 10px;   width: 30%;"></div>
        <div class="bg-white border-0" style="height: 260px; width: 12%;"></div>
      </div>
      <!-- <div class="row g-2 mb-2 align-items-end bg-white">
        <div class="col-3 bg-transprarent">
          <div class="py-8">
          </div>
        </div>
        <div class="col-7">
          <div class="py-7">
          </div>
        </div>
      </div>
      <div class="row g-2 justify-content-end">
        <div class="col-6">
          <div class="py-7">
          </div>
        </div>
        <div class="col-5">
          <div class="py-8">
          </div>
        </div>
      </div> -->
    </div>
  </section>

  <section class="container-fluid px-0 py-md-0 py-lg-7 bg-white">
    <div class="container-lg slide-in slide-start">
      <div class="d-lg-none bg-white px-0 py-4">
        <div class="row justify-content-center">
          <div class="col-9 col-md-8">
            <p class="fs-1 text-center intro-banner-title mb-0"
            >留住這份感動</p>
          </div>
        </div>
      </div>
    </div>
    <div class="intro">
      <div class="container-lg px-0">
        <div class="row g-0 g-lg-3 flex-row-reverse">
          <div class="col-lg-6 break-y-right">
            <!-- break-y-right -->
            <div class="intro-image bg-cover bg-center h-100"
              style="background-image: url(https://images.unsplash.com/photo-1598674953515-32809625dfa2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=784&q=80);">
            </div>
          </div>
          <div class="col-lg-6 mt-0">
            <div class="intro-text slide-in slide-start">
              <div class="intro-break reverse d-none d-lg-block">
                <div class="intro-break-text">
                  ＿留住這份感動
                </div>
              </div>
              <p>是不是一直過著一成不變、周而復始的生活？想不想為自己的生活添上一筆療癒的色彩？</p>
              <p>快來翠魚水族，挑選心儀的魚、建立宜人風景。</p>
              <p>
                打造專屬於魚兒們和你的水中樂園，留住最初相遇的感動！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container-lg py-4 bg-atta-fixed"
    >
      <div class="row justify-content-center">
        <div class="col-md-6 col-8">
          <p class="text-center  p-3 fs-2 intro-banner"
          >翠魚水族<br>助你完成你的水族夢</p>
        </div>
      </div>
    </div>
  </section>
  <CouponInfo></CouponInfo>
  <section class="py-5 bg-white">
    <div class="container">
      <h2>任君挑選 <span class="fs-6"><router-link class="text-decoration-none" to="/products/all">more<i class="bi bi-plus"></i></router-link></span></h2>
      <hr>
      <Swiper :products="proudcts"></Swiper>
    </div>
  </section>

  <div class="container-fluid bg-light">
    <div class="container  py-4">
      <h2>...或親自光臨</h2>
        <hr>
        <iframe class=" slide-in slide-start"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14447.487332366718!2d121.78981246977538!3d25.14002359999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x345d4f7807d7ab5d%3A0xe005c55719594f84!2z5ZyL56uL5rW35rSL56eR5oqA5Y2a54mp6aSo!5e0!3m2!1szh-TW!2stw!4v1629706802787!5m2!1szh-TW!2stw"
        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
  </div>
</template>
<script>
import Swiper from '@/components/Front/Swiper.vue'
import Carousel from 'bootstrap/js/dist/carousel'
import CouponInfo from '@/components/Front/CouponInfo.vue'

export default {
  components: {
    Swiper,
    CouponInfo
  },
  data () {
    return {
      proudcts: []
    }
  },
  methods: {
    handleResize () {
      const wave = document.querySelector('.water-waves')
      const wavew = wave.clientWidth
      wave.style.height = `${wavew}px`
    },
    handleScroll () {
      const els = document.querySelectorAll('.slide-in')
      els.forEach((el) => {
        if (window.scrollY >= el.getBoundingClientRect().top) {
          el.classList.add('slide-done')
        }
      })
    },
    slideDown () {
      document.getElementById('maincontent').scrollIntoView({
        behavior: 'smooth'
      })
    },
    getProduct () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.proudcts = response.data.products
        }
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    reworkCarousel () {
      // when router change ,boostrap plugin need reload
      const carouselEl = document.querySelector('#carouselHead')
      const mycarousel = new Carousel(carouselEl)
      mycarousel.cycle()
    }
  },
  mounted () {
    this.handleResize()
    this.reworkCarousel()
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
    this.getProduct()
  }
}
</script>
