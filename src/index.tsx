/** @jsx TreeCat.createElement **/
import * as blessed from 'blessed'
import { loadProfiles } from './configuration'
import { MainScreen } from './views/mainScreen'
import * as TreeCat from 'treecat'

loadProfiles().then(() => {
  const rootScreen: blessed.Widgets.Screen = blessed.screen({ sendFocus: true })
  rootScreen.program.on('keypress', (_ch: string, key: blessed.Widgets.Events.IKeyEventArg) => {
    if (key.full === 'C-c') {
      process.exit(0)
    }
  })

  TreeCat.render(<MainScreen />, rootScreen)
})
