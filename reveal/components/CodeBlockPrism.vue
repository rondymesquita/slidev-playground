<script setup lang="ts">
import { ref, inject, nextTick, onMounted } from "vue";
import { Ref } from '@vue/reactivity';
// import * as shiki from 'shiki'
import Prism from "prismjs";

// import "prismjs/plugins/line-numbers/prism-line-numbers";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/components/prism-typescript";

//@ts-ignore
import { CODE_BLOCKS } from '../providers'

// shiki.setWasm(onigasm)
// shiki.setCDN
const props = defineProps({
	file: {
		default: "",
	}
});
const { file } = props;

const code = ref("CODE NOT LOADED");
const codeElement = ref();
const codeBlocks = inject<Ref<Record<string, string>>>('CODE_BLOCKS')!
// const codeAsString = codeBlocks.value[file]

onMounted(() => {
	code.value = codeBlocks.value[file];
	nextTick(() => {
		Prism.highlightElement(codeElement.value);
	});
})


// watch(reveal.isRevealLoaded, (isRevealLoaded) => {
// 	if (!isRevealLoaded) return;
// 	const highlight = reveal.reveal.value.getPlugin('highlight');
// 	highlight.highlightBlock(codeElement.value);
// 	console.log(codeBlock.value.querySelector("pre > code > table > tbody > tr > td:first-child"));
// 	codeBlock.value.querySelector("pre > code > table > tbody > tr > td:first-child").style.display = "none"
// });
</script>

<template>
	<div>
		<pre ref="preElement" class="line-numbers slidev-code language-ts"><code ref="codeElement">{{ code }}</code></pre>
	</div>
</template>

<style scoped>
</style>
