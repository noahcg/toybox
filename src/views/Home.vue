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
              <div class="text-center" style="flex:0 1 auto;">
                <h1 class="font-weight-light mb-6 mx-4 display-3">
                  Books
                  <br />In Our Collection
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
                          style="background-image: url(&quot;https://cdn.vuetifyjs.com/images/home/feature3.png&quot;); background-position: center center;"
                        ></div>
                        <div class="v-responsive__content"></div>
                      </div>
                      <div class="v-card__text">
                        <h2 class="subtitle-1 font-weight-bold mb-2 text--primary">Vibrant Community</h2>
                        <p
                          class="mb-2"
                        >When you run into a roadblock, you need assistance right away. Vuetify offers support in our massive community on Discord.</p>
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
                          style="background-image: url(&quot;https://cdn.vuetifyjs.com/images/home/feature2.png&quot;); background-position: center center;"
                        ></div>
                        <div class="v-responsive__content"></div>
                      </div>
                      <div class="v-card__text">
                        <h2
                          class="subtitle-1 font-weight-bold mb-2 text--primary"
                        >Semantic Material Components</h2>
                        <p
                          class="mb-2"
                        >Be prepared for an armada of specialized components at your disposal. With over 80 in total, there is a solution to any situation.</p>
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
                          style="background-image: url(&quot;https://cdn.vuetifyjs.com/images/home/feature1.png&quot;); background-position: center center;"
                        ></div>
                        <div class="v-responsive__content"></div>
                      </div>
                      <div class="v-card__text">
                        <h2
                          class="subtitle-1 font-weight-bold mb-2 text--primary"
                        >Ready-Made Project Scaffolding</h2>
                        <p
                          class="mb-2"
                        >Vuetify supports the future of Vue tooling through its Vue CLI 3 plugin. With one command you are ready to start building your next great idea.</p>
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
