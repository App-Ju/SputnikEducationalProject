<template>
  <div class="form">
    <input
      class="form__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Заголовок списка"
      @keydown.enter="$emit('addList')"
      @keydown.esc="$emit('cancelInput')"
    />
    <button class="form__button" @click="$emit('addList')">Создать</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItemCreation",
  props: ["modelValue"],
  emits: ["update:modelValue", "addList", "cancelInput"],
});
</script>

<style lang="scss" scoped>
@import "../assets/css/mixins";

.form {
  @include items-wrapper(min-content);
  align-items: center;

  &__input {
    @include items-input(80%);
    margin-bottom: 10px;
  }

  &__button {
    @include items-tbn;
  }
}
</style>
