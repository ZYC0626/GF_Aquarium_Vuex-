<template>
    <a class="toTop" href="#" @click.prevent="goToTop">
        <span class="material-icons">
          keyboard_double_arrow_up
        </span>
    </a>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleScroll () {
      const el = document.querySelector('.toTop')
      if (window.scrollY > 500) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.routeName = this.$route.name
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
