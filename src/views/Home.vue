<template>
  <div class="page home">
    <img class="bkgImg" src="/img/IMG_6829.jpeg" role="presentation" />
    <v-container class="home-content-container">
      <v-row justify="center">
        <v-col class="home-callout" :md="6">
          <h1>Oliver's Toybox</h1>
          <p class="mb-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            numquam enim ratione reiciendis consectetur optio perspiciatis
            laborum, quo voluptates alias dignissimos impedit fuga, quisquam,
            sequi nulla illo ex assumenda nam.
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="home-content" :md="10">
          <h2>Oliver's Toybox</h2>
          <ul>
            <li>
              <p>Item 1</p>
            </li>
            <li>
              <p>Item 2</p>
            </li>
            <li>
              <p>Item 3</p>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style lang="scss" scoped>
.bkgImg {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.home-content-container {
  margin-top: 25%;
  padding-bottom: 0;
}
.page {
  margin-bottom: 57px;
}
.home-callout {
  background: #fff;
  margin-bottom: 40px;
  padding: 20px;
}
.home-content {
  background: #fff;
  padding: 30px;
}
@media (min-width: 992px) {
  .page {
    margin-top: 64px;
    margin-bottom: 0;
  }

  .hero-content-container {
    background: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .hero-content {
    padding: 20px;
  }
  .content {
    background: #fff;
  }
}
</style>
