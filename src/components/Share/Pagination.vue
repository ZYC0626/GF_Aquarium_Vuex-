<template>
  <nav>
    <ul class="pagination pagination-lg justify-content-center">
      <li class="page-item"
      :class="{ 'disabled' : pages.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="updatePage(pages.current_page - 1)">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
      <li class="page-item" v-for="page in  pages.total_pages" :key="page"
      :class="{ 'active': page === pages.current_page }">
        <a class="page-link" href="#" v-on:click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item"
      :class="{ 'disabled' : pages.current_page === pages.total_pages}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="updatePage(pages.current_page + 1)">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
    }
  }
}
</script>
