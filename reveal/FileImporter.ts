import { ref, nextTick, inject } from 'vue';
import {CODE_BLOCKS} from "./providers"

export const FileImporter = {
  install: (app: any, options: any) => {
    // console.log('>>> plugin installed');

    const codeBlocks = ref<Record<string,string>>();

    const modules = import.meta.globEager('/code/*', {
      assert: { type: 'raw' },
    });

    const translatedModules: any = {};
    Object.entries(modules).map(([k, v]) => {
      console.log(k);
      const z = k.replace('/code/', '');
      translatedModules[z] = v;
    });

    codeBlocks.value = translatedModules;

    // console.log('>>> code blocks', translatedModules);

    app.provide(CODE_BLOCKS, codeBlocks);
  },
};
