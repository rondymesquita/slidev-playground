import { defineConfig } from 'vite'
import {readFileSync} from 'fs'


const parseProperties = (info) => {
	const value = info.split(" ")
	// console.log(value);
	const properties = {}
	value.forEach((rawProperty) => {
		const propertyRegex = new RegExp(/(.*)=(.*)/, "gm")
		const regexResult = propertyRegex.exec(rawProperty)
		properties[regexResult[1]] = regexResult[2]
	})
	// console.log(properties);
  return properties
}

const myPlugin3 = (md, opts) => {
  const defaultRenderText = md.renderer.rules.text;
  const defaultRenderFence = md.renderer.rules.fence;

  md.renderer.rules.text = (tokens, idx, options, env, self) => {
    const code = tokens[idx]
    const {content, map, meta} = code
    // console.log('before', {code});
    const fileSourceRegex = new RegExp(/^@ {(.*)}/, 'gm');
    const fileSourceRegexResult = fileSourceRegex.exec(content)
    // console.log(fileSourceRegexResult);

    if (fileSourceRegexResult && fileSourceRegexResult.length) {
      const properties = parseProperties(fileSourceRegexResult[1])
      console.log(properties);
      const fileContent = readFileSync(properties.src).toString()
      code.content = fileContent

      code.type = "fence"
      code.tag = "code"
      code.markup = "```"
      code.info = "ts"
      code.block = true
      code.hidden = false
      // console.log('after', {code});
      tokens.splice(idx, 1, code);
      const parsedRange = properties.range.split("|").join(",").toString()
      console.log(parsedRange);
      return defaultRenderFence(tokens, idx, options, env, self)
    } else {
      return defaultRenderText(tokens, idx, options, env, self)
    }

  }
}

export default defineConfig({
	server: {
		open: false
	},
  // plugins: [mdx({
  //   include: [/\.mdx$/],
  // })],
  slidev: {
    vue: {
      // include: [/\.vue$/, /\.md$/, /\.mdx$/],
    },
    markdown: {
      // markdownItUses: [
      //   myPlugin2
      // ],
      markdownItSetup(md) {
        // md.use(markdownItAttrs)
        // md.use(myPlugin2)
        // md.use(myPlugin3)
        // md.use(markdownItCodeSnippet)
      }
    }
  },
  esbuild: {
    exclude: ["public/code/*"]
  },
})
