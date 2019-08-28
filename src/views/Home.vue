<template>
  <div class="home">
    <v-container class="fill-height pa-0" fluid>
      <div
        class="v-responsive white--text py-12"
        style="background:linear-gradient(to bottom, #1867c0, #5CBBF6);"
      >
        <div class="v-responsive__content">
          <div class="container">
            <div class="layout align-center justify-center wrap">
              <div class="text-left text-md-center" style="flex:0 1 auto;">
                <h1 class="font-weight-light mb-6 mx-4 custom-headline">
                  Go Ahead...
                  <br />Start Keeping Track of Your Books
                </h1>
              </div>
            </div>
          </div>
          <div class="v-responsive text-center pb-6">
            <div class="v-responsive__content">
              <div class="container grid-list-xl">
                <div class="layout justify-center wrap">
                  <div class="flex d-flex shrink">
                    <div
                      class="elevation-12 overflow-hidden text-center mx-auto v-card v-sheet theme--light"
                      style="max-width:350px;"
                    >
                      <div
                        role="img"
                        aria-label="Vibrant Community"
                        class="v-responsive v-image"
                        style="width:100%;"
                      >
                        <div class="v-responsive__sizer" style="padding-bottom:38.46153846153846%;"></div>
                        <div
                          class="v-image__image v-image__image--cover"
                          style="background-image: url(&quot;https://placeimg.com/668/402/tech/grayscale&quot;); background-position: center center;"
                        ></div>
                      </div>
                      <div class="v-card__text">
                        <p class="mb-2">Review a collection of the books we own.</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex d-flex shrink">
                    <div
                      class="elevation-12 overflow-hidden text-center mx-auto v-card v-sheet theme--light"
                      style="max-width:350px;"
                    >
                      <div
                        role="img"
                        aria-label="Semantic Material Components"
                        class="v-responsive v-image"
                        style="width:100%;"
                      >
                        <div class="v-responsive__sizer" style="padding-bottom:38.46153846153846%;"></div>
                        <div
                          class="v-image__image v-image__image--cover"
                          style="background-image: url(&quot;https://placeimg.com/668/402/nature/grayscale&quot;); background-position: center center;"
                        ></div>
                        <div class="v-responsive__content"></div>
                      </div>
                      <div class="v-card__text">
                        <p class="mb-2">Analyize the data from your library.</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex d-flex shrink">
                    <div
                      class="elevation-12 overflow-hidden text-center mx-auto v-card v-sheet theme--light"
                      style="max-width:350px;"
                    >
                      <div
                        role="img"
                        aria-label="Ready-Made Project Scaffolding"
                        class="v-responsive v-image"
                        style="width:100%;"
                      >
                        <div class="v-responsive__sizer" style="padding-bottom:38.46153846153846%;"></div>
                        <div
                          class="v-image__image v-image__image--cover"
                          style="background-image: url(&quot;https://placeimg.com/668/402/arch/grayscale&quot;); background-position: center center;"
                        ></div>
                        <div class="v-responsive__content"></div>
                      </div>
                      <div class="v-card__text">
                        <p class="mb-2">Manage the entire library from one interface.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style lang="scss" scoped>
@media (min-width: 768px) {
  h1 {
    font-size: 3.75rem !important;
    font-weight: 300;
    line-height: 4.5rem;
    letter-spacing: -0.0083333333em !important;
    font-family: "Roboto", sans-serif !important;
  }
}
</style>
