import * as blessed from 'blessed'
import { loadProfiles } from './configuration'
import { MainScreen } from './views/mainScreen'
import { render } from './treecat/index'

loadProfiles().then(() => {
  const rootScreen: blessed.Widgets.Screen = blessed.screen()
  rootScreen.program.on('keypress', (_ch: string, key: blessed.Widgets.Events.IKeyEventArg) => {
    if (key.full === 'C-c') {
      process.exit(0)
    }
  })

  render(MainScreen(), rootScreen)
  // const mainScreen: Widgets.Screen = MainScreen(() => process.exit(0))
  // mainScreen.render()
})
