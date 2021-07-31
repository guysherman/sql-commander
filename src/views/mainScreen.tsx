/** @jsx TreeCat.createElement **/
// eslint-disable-next-line no-unused-vars
import * as TreeCat from '../treecat/index'
import { useState } from '../treecat/index'

export function MainScreen () {
  const [selectedItem, setSelectedItem] = useState('')

  const handleSelectItem = (item: any, index: number) => {
    setSelectedItem(() => item.content)
  }

  const boxOpts = {
    top: 'center',
    left: 'center',
    width: '50%',
    height: '20%',
    tags: true,
    border: {
      type: 'line' as const
    },
    style: {
      border: {
        fg: '#f0f0f0'
      },
      selected: {
        fg: 'white',
        bg: 'blue'
      },
      item: {
        fg: 'white',
        bg: 'black'
      }
    },
    keys: true,
    vi: true,
    items: [
      '1. Item 1',
      '2. Item 2'
    ],
    label: 'List',
    'onselect item': handleSelectItem
  }


  return (
    <box>
      <list {...boxOpts} focused={true} />
      <box bottom={1} width="50%" height={3} border={'line' as const} >{selectedItem}</box>
    </box>
  )
}
