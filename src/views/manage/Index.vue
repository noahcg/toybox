<script>
// Extensions
import View from "@/views/View";

// Mixins
import LoadSections from "@/mixins/load-sections";

export default {
  name: "Manage",

  metaInfo: { title: "Manage Toys" },

  extends: View,

  mixins: [LoadSections(["hero-alt", "manage-toybox"])],

  props: {
    id: {
      type: String,
      default: "about"
    }
  }
};
</script>
