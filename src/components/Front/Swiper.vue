<template>
  <div class="outSwiper">
    <swiper
      :loop="true"
      :pagination="pagination"
      :breakpoints='{
        "320": {
          "slidesPerView": 1,
          "spaceBetween": "100"
        },
        "480": {
          "slidesPerView": 2,
          "spaceBetween": "30"
        },
        "1024": {
          "slidesPerView": 3,
          "spaceBetween": "15"
        },
        "1025": {
          "slidesPerView": 4,
          "spaceBetween": "20"
        }
      }'
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <ProdCard :prod="item" :tag="false"></ProdCard>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import ProdCard from '@/components/Front/ProdCard.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper-bundle.css'
// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper'
// install Swiper modules
SwiperCore.use([Pagination])

export default {
  props: [
    'products'
  ],
  components: {
    Swiper,
    SwiperSlide,
    ProdCard
  },
  data () {
    return {
      pagination: {
        clickable: true,
        dynamicBullets: true
      },
      likes: [],
      likesId: []
    }
  },
  methods: {
  }
}
</script>
