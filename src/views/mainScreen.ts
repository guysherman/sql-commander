import blessed from 'blessed'
import { ProfileListView } from './profileList'

export function MainScreen (exitEvent: (ch: any, key: blessed.Widgets.Events.IKeyEventArg) => void): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true,
    style: {
      fg: 'fg',
      bg: 'bg'
    },
    title: 'SQL Commander'
  })

  screen.key(['q', 'C-c'], exitEvent)
  const profileList = ProfileListView()

  screen.append(profileList)
  profileList.focus()

  return screen
}
