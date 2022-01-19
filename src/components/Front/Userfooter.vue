<template>
  <footer class="container-fluid bg-primary py-4">
    <div class="container px-md-5">
      <div class="row mt-3 g-0 justify-content-between align-items-center">
        <div class="col-md-6">
          <a href="#"><img src="@/assets/images/LOGOWhite.png" height="50" alt="LOGO" /></a>
          <ul class="list-unstyled d-flex ms-3 mt-2">
            <li>
              <a href="#"><i class="bi bi-instagram pe-3"></i></a>
            </li>
            <li>
              <a href="#"><i class="bi bi-facebook pe-3"></i></a>
            </li>
            <li>
              <a href="#"><i class="bi bi-github pe-3"></i></a>
            </li>
            <li>
              <router-link to="/login" title="登入後台"><i class="bi bi-person-circle pe-3"></i></router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <ul class="list-unstyled text-md-end">
            <li class="pt-2">
              <a class="text-decoration-none" href="tel:02-1234-5678"
                >02-1234-5678</a
              >
            </li>
            <li class="pt-2">
              <a
                class="text-decoration-none"
                href="mailto:greenfish@aquarium.com"
                >greenfish@aquarium.com</a
              >
            </li>
            <li class="pt-2">
              <a
                class="text-decoration-none"
                href="http://maps.google.com/?q=基隆市中正區北寧路367號"
                target="_blank"
                >202 基隆市中正區北寧路367號</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="text-md-center my-4">© Copyright 2021 <br class="d-block d-md-none"> 練習使用非商業用途</div>
    </div>
  </footer>
</template>
