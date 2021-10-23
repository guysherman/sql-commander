/** @jsx TreeCat.createElement **/
import * as blessed from 'blessed'
// eslint-disable-next-line no-unused-vars
import * as TreeCat from 'treecat'
import { useState, useRoot, useEffect, Fragment } from 'treecat'

export function MainScreen () {
  const [focusedPane, setFocusedPane] = useState(0)
  const root = useRoot()

  const cycleFocus = (_ch: string, key: blessed.Widgets.Events.IKeyEventArg) => {
    if (key.full === 'M-S-l') {
      setFocusedPane((focusedPane + 1) % 2)
    } else if (key.full === 'M-S-h') {
      setFocusedPane(Math.abs((focusedPane - 1) % 2))
    }
  }

  useEffect(() => {
    root?.program?.on('keypress', cycleFocus)

    return () => {
      root?.program?.off('keypress', cycleFocus)
    }
  })

  const selectedItemStyle = {
    fg: 'white',
    bg: 'blue'
  }

  const normalItemStyle = {
    fg: 'white',
    bg: 'black'
  }

  return (
    <Fragment>
      <box>
        <box
          left={0}
          top={0}
          width={'30%'}
          height={'100%'}
          border={{ type: 'line' as const }}
          style={{ border: { fg: 'white' }, focus: { border: { fg: 'blue' } } }} focused={ focusedPane === 0 } >
          <text style={selectedItemStyle} fill={true} top={0} width={'100%-2'} >Foo!</text>
          <text style={normalItemStyle} fill={true} top={1} left={4} width={'100%-6'} >Bar!</text>
        </box>
        <box
          left={'30%'}
          top={0}
          width={'70%'}
          height={'100%'}
          border={{ type: 'line' as const }}
          style={{ border: { fg: 'white' }, focus: { border: { fg: 'blue' } } }} focused={ focusedPane === 1 } />
      </box>
    </Fragment>
  )
}
