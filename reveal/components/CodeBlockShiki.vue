<script setup lang="ts">
import { ref, inject, nextTick, onMounted } from "vue";
import { Ref } from '@vue/reactivity';
import * as shiki from 'shiki'
import { CODE_BLOCKS } from '../providers'

shiki.setCDN('/node_modules/shiki/');
const props = defineProps({
	file: {
		default: "",
	}
});
const { file } = props;

const html = ref("console.log");
const shikiContainerDark = ref();
const shikiContainerLight = ref();
const codeBlocks = inject<Ref<Record<string, string>>>(CODE_BLOCKS)!

const codeAsString = codeBlocks.value[file]

const renderElementClasses = (element, themeClass) => {
	element.classList.add('slidev-code')
	element.classList.add(themeClass)

	const shikiCodeBLockElement = element.querySelector("code")
	shikiCodeBLockElement.classList.add('custom-shiki-code')
}

onMounted(() => {

	shiki.getHighlighter({
		theme: 'dracula',
		// langs: ["js"]
	}).then(highlighter => {

		const htmlCode = highlighter.codeToHtml(codeAsString, { lang: "js" })

		html.value = htmlCode
		nextTick(() => {
			renderElementClasses(shikiContainerDark.value.firstChild, 'shiki-dark')
			renderElementClasses(shikiContainerLight.value.firstChild,'shiki-light')
		})
	})
})
</script>

<template>
	<div>
		<pre ref="shikiContainerDark" class="shiki-container" v-html="html"></pre>
		<pre ref="shikiContainerLight" class="shiki-container" v-html="html"></pre>
	</div>
</template>

<style scoped>
</style>
