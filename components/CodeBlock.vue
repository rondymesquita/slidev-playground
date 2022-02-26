nes (42 sloc) 1.01 KB
<script setup lang="ts">
import { ref, nextTick } from "vue";

import * as shiki  from 'shiki'

// import nord from 'shiki/themes/nord.json'

shiki.setWasm('../public/onig.wasm')

const props = defineProps({
  filename: {
    default: "",
  },
  syntax: {
    default: "",
  },
});
const { filename, syntax } = props;
const code = ref("CODE NOT LOADED");
const html = ref("CODE NOT LOADED");
const shikiContainer = ref();

const codeElement = ref();
// @ts-ignore
const path = import.meta.env.DEV
  ? `../public/code/${filename}`
  : `/code/${filename}.txt`;

const getExtension = (filename) => {
  const arr = filename.split('.')
  return arr[arr.length - 1]
}

fetch(path)
  .then((response) => response.text())
  .then((codeAsString) => {
    code.value = codeAsString;
    nextTick(() => {

      const extension = getExtension(filename)

      shiki.getHighlighter({
        langs: [extension]
      }).then(highlighter => {
        const htmlCode = highlighter.codeToHtml(codeAsString, { lang: extension })
        html.value = htmlCode
        nextTick(() => {
          console.log(shikiContainer.value.firstChild)
          const shikiContainerCode = shikiContainer.value.firstChild
          shikiContainerCode.classList.add('slidev-code')
          shikiContainerCode.classList.add('shiki-dark')
        })
      })
    });
  });
</script>

<template>
  <div>
    <pre ref='shikiContainer' class='shiki-container' v-html='html'></pre>
  </div>
</template>

<style scoped>
.shiki-container {
  text-align: left;
}
</style>
