nes (42 sloc) 1.01 KB
<script setup lang="ts">
import { ref, nextTick } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/components/prism-typescript";
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
const codeElement = ref();
// @ts-ignore
const path = import.meta.env.DEV
  ? `../public/code/${filename}`
  : `/code/${filename}.txt`;
Prism.manual = true;
fetch(path)
  .then((response) => response.text())
  .then((codeAsString) => {
    code.value = codeAsString;
    nextTick(() => {
      Prism.highlightElement(codeElement.value);
    });
  });
</script>

<template>
  <div>
    <pre
      ref="preElement"
      class="line-numbers"
    ><code ref='codeElement' class='language-js'>{{code}}</code></pre>
  </div>
</template>

<style scoped>
</style>
