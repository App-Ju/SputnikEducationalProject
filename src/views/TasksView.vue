<template>
  <tasks-component></tasks-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TasksComponent from "@/components/TasksComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "TasksView",
  components: {
    TasksComponent,
  },
});
</script>
