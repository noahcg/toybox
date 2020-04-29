<script>
// Extensions
import View from "@/views/View";

// Mixins
import LoadSections from "@/mixins/load-sections";

export default {
  name: "Toys",

  metaInfo: { title: "My Toys" },

  extends: View,

  mixins: [LoadSections(["hero-alt", "toybox"])],

  props: {
    id: {
      type: String,
      default: "toybox"
    }
  }
};
</script>
