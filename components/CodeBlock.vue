<script setup lang="ts">
import { ref, inject, nextTick, onMounted } from "vue";
const props = defineProps({
	file: {
		default: "",
	}
});
const { file } = props;
const codeBlocks = inject('CODE_BLOCKS')!
const content = `\`\`\`${codeBlocks.value[file]}\`\`\``
console.log(content);

</script>

<template>
  <div>
		<slot :content="content"></slot>
  </div>
</template>

<style scoped></style>
