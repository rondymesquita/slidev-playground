<script setup lang="ts">
import { ref, nextTick } from "vue";
import Prism from "prismjs";

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
const codeHtml = ref("CODE NOT LOADED");
const codeElement = ref();
const codeClass = ref("");

const getExtension = (filename) => {
  const arr = filename.split(".");
  return arr[arr.length - 1];
};

codeClass.value = `language-ts`


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
      // Prism.highlightAll()
      // setTimeout(Prism.highlightAll);
    });
  });
</script>

<template>
  <div>
    <pre
      ref="preElement"
      class="line-numbers slidev-code"
      :class="[codeClass]"
    ><code ref='codeElement'>{{code}}</code></pre>
  </div>
</template>

<style scoped></style>
