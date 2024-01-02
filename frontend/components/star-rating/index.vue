<template>
  <div class="star-rating">
    <label
      class="star-rating__star"
      v-for="rating in ratings"
      :key="rating"
      :class="{
        'is-selected': innerValue >= rating && innerValue != null,
        'is-disabled': disabled,
      }"
      @click="set(rating)"
      @mouseover="star_over(rating)"
      @mouseout="star_out"
    >
      <input
        class="star-rating star-rating__checkbox"
        type="radio"
        :value="rating"
        :name="name"
        v-model="innerValue"
        :disabled="disabled"
      />★
    </label>

    <span class="text-sm ml-3">
      {{ innerValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  name: String,
  value: null,
  id: String,
  disabled: Boolean,
  required: Boolean,
});

const emits = defineEmits(["update:value"]);

const innerValue = ref(props.value);
const tempValue = ref<number | null>(null);
const ratings = [1, 2, 3, 4, 5];

watch(
  () => props.value,
  (newValue) => {
    innerValue.value = newValue;
  }
);

const star_over = (index: number) => {
  if (!props.disabled) {
    tempValue.value = innerValue.value;
    innerValue.value = index;
  }
};

const star_out = () => {
  if (!props.disabled) {
    innerValue.value = tempValue.value;
  }
};

const set = (value: number | null) => {
  if (!props.disabled) {
    tempValue.value = value;
    innerValue.value = value;
    emits("update:value", value);
  }
};
</script>

<style lang="scss">
%visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.star-rating {
  &__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ababab;
    transition: color 0.2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      color: #ffd700;
    }

    &.is-disabled:hover {
      cursor: default;
    }
  }

  &__checkbox {
    @extend %visually-hidden;
  }
}
</style>
