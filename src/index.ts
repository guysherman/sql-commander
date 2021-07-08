// import { Widgets } from 'blessed'
import { loadProfiles } from './configuration'
import { MainScreen } from './views/mainScreen'
import { render } from './treecat/index'

loadProfiles().then(() => {
  render(MainScreen())
  // const mainScreen: Widgets.Screen = MainScreen(() => process.exit(0))
  // mainScreen.render()
})
