<template>
  <div>
    <input type="text" name="" id="" class="border rounded-md p-3" v-model="input"/>
    <button class="bg-yellow-600 text-white p-4" @click="cancel()">Annuler</button>
    <button class="bg-blue-500 text-white p-4">Sauvegarder</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  content: string
}>();

const emit = defineEmits<{
    (e: 'cancel'):void,
    (e: 'update', updateContent: string): void
}>();

const input = ref<string>(props.content)
function cancel(){

}
</script>
