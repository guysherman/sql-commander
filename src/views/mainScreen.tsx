/** @jsx TreeCat.createElement **/
// eslint-disable-next-line no-unused-vars
import * as TreeCat from '../treecat/index'
import { useState } from '../treecat/index'

export function MainScreen () {
  const [state, setState] = useState(1)

  const kp = (ch: string, _key: any) => {
    if (ch === '+') {
      setState(s => s + 1)
    } else if (ch === '-') {
      setState(s => s - 1)
    }
  }
  const boxOpts = {
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    tags: true,
    border: {
      type: 'line' as const
    },
    style: {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  }

  return (
    <box>
      <box {...boxOpts} onkeypress={kp}>
        {`Hello {bold}world{/bold}! ${state}`}
      </box>
    </box>
  )
}
