/** @jsx createElement **/
import * as blessed from 'blessed'
// eslint-disable-next-line no-unused-vars
import { createElement } from '../treecat/index'
import { Screen } from '../treecat/baseComponents/screen'

export function MainScreen () {
  const onKeyPress = (_ch: string, key: blessed.Widgets.Events.IKeyEventArg): void => {
    console.log(JSON.stringify(key, null, '  '))
    if (key.full === 'C-c') {
      process.exit(0)
    }
  }

  return (
    <Screen onKeyPress={onKeyPress} />
  )
}
