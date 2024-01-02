<template>
  <div>
    <div class="upload-container" @click="triggerFileInput" v-if="!imageSrc">
      Click here to upload an image
    </div>

    <div v-if="imageSrc" class="image-container" @click="triggerFileInput">
      <img :src="imageSrc" alt="Image preview" />
    </div>

    <input type="file" @change="previewImage" ref="fileInput" hidden />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: File,
});

const emits = defineEmits(["update:modelValue"]);

const imageSrc = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const previewImage = (event: Event) => {
  console.log(event);
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    console.log(file);
    emits("update:modelValue", file);

    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

watch(
  () => props.modelValue,
  (newFile) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageSrc.value = e.target?.result as string;
      };
      reader.readAsDataURL(newFile);
    } else {
      imageSrc.value = null;
    }
  }
);
</script>

<style>
.upload-container,
.image-container {
  width: 300px;
  height: 300px;
  border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
