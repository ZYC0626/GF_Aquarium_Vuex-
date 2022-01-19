<template>
  <section class="pt-5 bg-white">
    <div class="container">
      <div class="row g-0 align-items-center flex-row-reverse">
        <div class="col-md-6 text-md-start px-md-4 p-0 text-center">
          <h2>歡慶開幕</h2>
          <hr />
          <p>
            開幕優惠，即日起輸入優惠碼
            <span class="fs-4 fw-bolder"> GFISH88</span> 享全館商品打
            <span class="fs-4">88</span> 折
          </p>
          <a
            class="ticket-copy mx-auto mx-md-0"
            href="#"
            @click.prevent="copyCoupon"
            >
            <span v-if="copyDone"><i class="bi bi-clipboard-check me-2"></i><span>複製成功 !</span></span>
            <span v-else><i class="bi bi-clipboard me-2"></i><span>複製優惠碼</span></span>
          </a>
        </div>
        <div class="col-md-6 text-md-end ps-md-4 p-0 text-center">
          <div class="ticket mt-3">
            <span class="ticket-text">優惠碼</span>
            <span class="mx-3 ticket-dash"></span>
            <span class="ticket-text">GFISH88</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      copyDone: false
    }
  },
  methods: {
    copyCoupon () {
      const dummy = document.createElement('input')
      const text = 'GFISH88'
      document.body.appendChild(dummy)
      dummy.value = text
      dummy.select()
      dummy.setSelectionRange(0, 99999)
      document.execCommand('copy')
      document.body.removeChild(dummy)
      this.copyDone = true
    }
  }
}
</script>
