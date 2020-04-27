<template>
  <div class="page">
    <v-row justify="center" class="mb-4">
      <v-col cols="10" class="page-title-area">
        <h1>Toy List</h1>
      </v-col>
    </v-row>
    <v-row class="content-row">
      <v-col cols="12" class="page-content-area" style="background:#fff;">
        <v-row>
          <v-col v-for="toy in toys" :key="toy.id" cols="12" :sm="8" :md="6">
            <v-card height="100%">
              <v-card-text class="py-3 toy-data">
                <p class="title">{{ toy.name }}</p>
                <p class="subtitle-2 font-weight-regular font-italic">
                  {{ toy.category }}
                </p>
                <p>Like it? {{ toy.radios }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  data: () => ({
    toys: []
  }),
  firestore() {
    return {
      toys: db.collection("toys")
    };
  }
};
</script>

<style lang="scss" scoped>
.page-title-area {
  background: #fff;
  padding: 20px;
}
.content-row {
  height: 100%;
}
.page-content-area {
  background: #fff;
  padding: 20px;
}
h1 {
  line-height: 2.4rem;
}
</style>