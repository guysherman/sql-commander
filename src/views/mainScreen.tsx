/** @jsx TreeCat.createElement **/
// eslint-disable-next-line no-unused-vars
import * as TreeCat from '../treecat/index'

export function MainScreen () {
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
      <box {...boxOpts}>
        {'Hello {bold}world{/bold}!'}
      </box>
    </box>
  )
}
