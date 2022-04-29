<template>
  <div class="form">
    <h2 class="form__title">Создать доску</h2>
    <input
      class="form__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Заголовок доски"
      @keydown.enter="$emit('addBoard')"
      @keydown.esc="$emit('cancelInput')"
    />
    <button class="form__button" @click="$emit('addBoard')">Создать</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardItemCreation",
  props: ["modelValue"],
  emits: ["update:modelValue", "addBoard", "cancelInput"],
});
</script>

<style lang="scss" scoped>
@import "../assets/css/mixins";

.form {
  @include items-wrapper(150px);
  align-items: center;

  &__input {
    @include items-input(80%);
  }

  &__button {
    @include items-tbn;
  }
}
</style>
