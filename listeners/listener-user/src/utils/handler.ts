import * as fs from 'fs'

export function loadHandlers(dir, options = {}) {
  const handlers = []

  for (let file of fs.readdirSync(dir)) {
    if (file.endsWith('.handler.js') || file.endsWith('.handler.ts')) {
      const m = require(`${dir}/${file}`)
      for (let handler of Object.values(m)) {
        if ((handler as any).topic) {
          handlers.push(handler)
        }
      }
    }
  }

  return handlers
}
