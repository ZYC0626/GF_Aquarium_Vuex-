<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary fw-700">
    <div class="container-fluid">
      <router-link to="/dashboard/products" class="navbar-brand m-0"><img src="@/assets/images/LOGOWhite.png" height="50" alt="LOGO" /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/dashboard/products" class="nav-link" :class="{active: $route.path === '/dashboard/products'}">商品</router-link>
          <router-link to="/dashboard/orders" class="nav-link" :class="{active: $route.path === '/dashboard/orders'}">訂單</router-link>
          <router-link to="/dashboard/coupons" class="nav-link" :class="{active: $route.path === '/dashboard/coupons'}">優惠券</router-link>
          <!-- <a href="#" @click.prevent="logout" class="nav-link">登出</a> -->
        </div>
      </div>
    </div>
  </nav>
</template>
