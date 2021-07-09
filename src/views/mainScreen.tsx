/** @jsx createElement **/
// eslint-disable-next-line no-unused-vars
import { createElement } from '../treecat/index'
import { Screen, Box } from '../treecat/baseComponents'

export function MainScreen () {
  const boxOpts = {
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello {bold}world{/bold}!',
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
    <Box>
      <Box {...boxOpts}>
        {'Hello {bold}world{/bold}!'}
      </Box>
    </Box>
  )
}
