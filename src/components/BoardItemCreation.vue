<template>
  <div class="form">
    <h2 class="form__title">Создать доску</h2>
    <input
      class="form__input"
      v-model="boardName"
      placeholder="Заголовок доски"
    />
    <button class="form__button" @click="addBoard">Создать</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useBoardsStore } from "@/store/boards";

export default defineComponent({
  name: "BoardItemCreation",
  components: {},
  props: {},
  data() {
    return {
      boardName: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions(useBoardsStore, ["addBoardName"]),
    addBoard() {
      this.addBoardName(this.boardName);
      this.boardName = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  width: 23%;
  background: #e3ded9;
  margin: 1%;

  &__input {
    width: 80%;
    padding: 3px 6px;
    border: 1px solid rgba(44, 62, 80, 0.38);
    border-radius: 3px;

    &:hover {
      border: 1px solid #e31515;
    }

    &:focus {
      outline: none;
      border: 1px solid #154fe3;
    }
  }

  &__button {
    width: 50%;
    height: 20px;
    border: 1px solid rgba(44, 62, 80, 0.38);
    border-radius: 3px;

    &:hover {
      background: #e8e5e1;
    }
  }
}
</style>
