<template>
  <draggable-component class="lists" v-model="lists" item-key="id">
    <template #item="{ element }">
      <list-item class="lists__item" :name="element.name" :id="element.id">
        <div class="lists__tasks">1</div>
        <div class="lists__tasks-creation">2</div>
      </list-item>
    </template>
    <template #footer>
      <list-item-creation :boardId="boardId"></list-item-creation>
    </template>
  </draggable-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapWritableState } from "pinia";
import { useListsStore } from "@/store/lists";
import ListItem from "@/components/ListItem.vue";
import listItemCreation from "@/components/ListItemCreation.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "TasksView",
  components: {
    ListItem,
    listItemCreation,
    draggableComponent,
  },
  props: {},
  data() {
    return {
      boardId: Number(this.$route.params.id),
    };
  },
  computed: {
    ...mapState(useListsStore, ["currentBoardsList"]),
    ...mapWritableState(useListsStore, ["lists"]),
  },
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
