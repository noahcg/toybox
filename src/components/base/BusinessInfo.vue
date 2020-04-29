<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card title="WORK IN PROGRESS" pace="6">
        Check back often. Right now Toybox is a work in progress. We have some
        work to do before this is ready for the public.
      </base-info-card>

      <!-- <base-business-contact dense /> -->
    </div>
  </v-theme-provider>
</template>

<script>
export default {
  name: "BaseBusinessInfo",

  props: { dark: Boolean },

  data: () => ({
    business: [
      {
        icon: "mdi-map-marker-outline",
        title: "Address",
        text: "8553 N. Beach St. Ste. 227<br>Fort Worth, Texas 76137"
      },
      {
        icon: "mdi-cellphone",
        title: "Phone",
        text: "01 (800) 433 744<br>01 (800) 433 633"
      },
      {
        icon: "mdi-email",
        title: "Email",
        text: "john@vuetifyjs.com<br>heather@vuetifyjs.com"
      }
    ]
  })
};
</script>
