<script setup lang="ts">
import { ref, inject, nextTick, onMounted } from "vue";
import { Ref } from '@vue/reactivity';
import * as shiki from 'shiki'

//@ts-ignore
import onigasm from 'shiki/dist/onig.wasm?raw'
import { CODE_BLOCKS } from '../providers'

// shiki.setWasm(onigasm)
// shiki.setCDN
shiki.setCDN('/node_modules/shiki/');
const props = defineProps({
	file: {
		default: "",
	}
});
const { file } = props;

const html = ref("console.log");
const shikiContainer = ref();
const codeBlocks = inject<Ref<Record<string, string>>>('CODE_BLOCKS')!
console.log(inject('$slidev'));

const codeAsString = codeBlocks.value[file]

onMounted(() => {

	shiki.getHighlighter({
		theme: 'dracula',
		// langs: ["js"]
	}).then(highlighter => {

		const htmlCode = highlighter.codeToHtml(codeAsString, { lang: "js" })
		// console.log(htmlCode);

		html.value = htmlCode
		nextTick(() => {
			const shikiContainerPreElement = shikiContainer.value.firstChild
			shikiContainerPreElement.classList.add('slidev-code')
			// shikiContainerPreElement.classList.add('shiki-dark')

			const shikiCodeBLockElement = shikiContainerPreElement.querySelector("code")
			console.log(shikiCodeBLockElement);
			shikiCodeBLockElement.classList.add('custom-shiki-code')

		})
	})
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
		{{ Object.keys($slidev) }}
		<br />
		{{ $slidev.configs }}
		<!-- <pre ref="shikiContainer" class="shiki-container" v-html="html"></pre> -->
	</div>
</template>

<style scoped>
</style>
