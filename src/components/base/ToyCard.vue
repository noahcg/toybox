<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0">
      <v-row :justify="justify" no-gutters>
        <v-col v-if="name" :cols="callout ? 9 : 12">
          <base-title :title="name" class="text-uppercase" space="1" />
          <base-subtitle v-if="category" :title="category" space="1" />

          <base-divider :color="color" />

          <base-body v-if="radios" space="6">
            <slot />
          </base-body>
        </v-col>

        <v-col v-if="callout" cols="2">
          <div
            class="display-3 grey--text text--lighten-4 font-weight-bold pr-8"
            v-text="callout"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";

export default {
  name: "BaseToyCard",

  mixins: [Heading],

  props: {
    dark: Boolean,
    callout: String,
    color: {
      type: String,
      default: "primary"
    },
    name: String,
    category: String,
    radios: String
  }
};
</script>
