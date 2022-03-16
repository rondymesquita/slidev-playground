import { defineAppSetup } from '@slidev/types'
import {Components,FileImporter } from '../reveal'

export default defineAppSetup(({ app, router }) => {
  // Vue App
	// console.log('>>>>');

  app.use(Components)
  app.use(FileImporter)
})
