<template>
  <div class="lists">
    <div class="list__item">
      <div class="list__tasks"></div>
      <div class="list__tasks-creation"></div>
    </div>
    <list-item-creation :boardId="boardId"></list-item-creation>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import listItemCreation from "@/components/ListItemCreation.vue";

export default defineComponent({
  name: "TasksView",
  components: {
    listItemCreation,
  },
  props: {},
  data() {
    return {
      boardId: Number(this.$route.params.id),
    };
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.lists {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 1%;
  }
}
</style>
