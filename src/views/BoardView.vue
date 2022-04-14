<template>
  <boards-component></boards-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoardsComponent from "@/components/BoardsComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "BoardsView",
  components: {
    BoardsComponent,
  },
});
</script>
