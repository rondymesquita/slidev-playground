import { ref, nextTick, inject } from 'vue';
import CodeBlockShiki from './components/CodeBlockShiki.vue';
import CodeBlockPrism from './components/CodeBlockPrism.vue';

export const Components =  {
  install: (app: any) => {
    app.component('CodeBlockShiki', CodeBlockShiki);
    app.component('CodeBlockPrism', CodeBlockPrism);
  },
};
