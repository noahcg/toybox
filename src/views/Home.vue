<template>
  <div class="home">
    <v-container class="pa-0" fluid>
      <div class="v-responsive white--text py-12 hero">
        <div class="v-responsive__content">
          <div class="container">
            <div class="layout align-center justify-center wrap">
              <div class="text-left text-md-center" style="flex:0 1 auto;">
                <h1 class="font-weight-light mb-6 mx-4 custom-headline">
                  An App That Let's
                  <br />You Start Keeping Track of Your Books
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
                        <p
                          class="mb-2"
                        >Display your collection of books and allow other people to view them. All without having to login.</p>
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
                        <p
                          class="mb-2"
                        >Login to your library to view some data about your library. Don't worry, non-logged-in user's won't see this.</p>
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
                        <p
                          class="mb-2"
                        >Manage your entire library from an easy-to-use interface. Again, non-logged-in users will not be able to manipulate your library.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pa-12 theme--light grey lighten-4">
        <section class="layout wrap mb-12">
          <div class="flex">
            <div class="container grey--text text--darken-2 container--fluid grid-list-md pa-0">
              <p class="headline text-center">Updates for the Future</p>
              <p class="mb-1 font-weight-bold">Home Page</p>
              <ul class="mb-4">
                <li>Add more content</li>
              </ul>
              <p class="mb-1 font-weight-bold">Book Listing Page</p>
              <ul class="mb-4">
                <li>
                  <strike>Remove meta data from book cards</strike>
                </li>
                <li>
                  <strike>Add button or CTA to link to book detail page</strike>
                </li>
              </ul>
              <p class="mb-1 font-weight-bold">Metrics/Analytics Page</p>
              <ul class="mb-4">
                <li>
                  <strike>Fix the bar chart</strike>
                </li>
              </ul>
              <p class="mb-1 font-weight-bold">Overall</p>
              <ul class="mb-4">
                <li>Add multiple users</li>
                <li>List individual libraries</li>
                <li>
                  <strike>Fix route guards</strike>
                </li>
              </ul>
            </div>
          </div>
        </section>
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
.hero {
  background: linear-gradient(to bottom, #1867c0, #5cbbf6);
}
@media (min-width: 768px) {
  h1 {
    font-size: 2.75rem !important;
    font-weight: 300;
    line-height: 3.5rem;
    letter-spacing: -0.0083333333em !important;
    font-family: "Roboto", sans-serif !important;
  }
}
</style>
