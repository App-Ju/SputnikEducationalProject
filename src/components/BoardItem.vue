<template>
  <div class="board">
    <div class="board__name" v-if="!showInput">
      {{ boardName }}
    </div>
    <input type="text" class="board__name-input" v-else v-model="boardName" />

    <div class="board__icons">
      <svg class="board__favorite" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M12 7.13l.97 2.29.47 1.11 1.2.1 2.47.21-1.88 1.63-.91.79.27 1.18.56 2.41-2.12-1.28-1.03-.64-1.03.62-2.12 1.28.56-2.41.27-1.18-.91-.79-1.88-1.63 2.47-.21 1.2-.1.47-1.11.97-2.27M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"
        />
      </svg>

      <svg
        class="board__edit"
        @click="switchShowInput"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
        />
      </svg>

      <svg
        class="board__delete"
        @click="deleteBoard(id)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useBoardsStore } from "@/store/boards";

export default defineComponent({
  name: "BoardItem",
  components: {},
  props: {
    name: { type: String, require: true },
    id: { type: Number, require: true },
  },
  data() {
    return {
      boardName: this.name,
      showInput: false,
    };
  },
  methods: {
    ...mapActions(useBoardsStore, ["deleteBoard"]),
    switchShowInput() {
      this.showInput = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  width: 23%;
  background: #e3ded9;
  margin: 1%;

  &__name-input {
    align-self: center;
    width: 80%;
    margin: 0 3px;
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

  &__icons {
    display: flex;
    justify-content: flex-end;
  }

  &__favorite {
    height: 24px;
    width: 30px;
    fill: #000;

    &:hover {
      fill: #e5aa2a;
    }
  }

  &__edit {
    height: 24px;
    width: 30px;
    fill: #000;

    &:hover {
      fill: #155de3;
    }
  }

  &__delete {
    height: 24px;
    width: 24px;
    fill: #000;

    &:hover {
      fill: #e31515;
    }
  }
}
</style>
