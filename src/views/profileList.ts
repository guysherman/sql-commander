import blessed, { Widgets } from 'blessed';
import { listProfiles, ProfileList } from '../configuration';

export function ProfileList(): Widgets.BoxElement {
  const profiles: ProfileList = listProfiles();
  const profileListBox: Widgets.BoxElement = blessed.box({
    top: 'center',
    left: 'center',
    width: 80,
    height: 10,
    border: {
      type: 'line',
    },
    style: {
      bg: 'black',
      border: {
        fg: 'fg',
      }
    }
  });

  const profileListItems = profiles.map(p => `${p[0] + 1}. ${p[1]}`);
  const profileList: Widgets.ListElement = blessed.list({
    keys: true,
    vi: true,
    items: profileListItems,
    style: {
      selected: {
        fg: 'black',
        bg: 'blue',
      },
      item: {
        fg: 'fg',
        bg: 'black',
      }
    }
  });

  profileListBox.on('focus', () => {
    profileList.focus();
  });

  profileListBox.append(profileList);

  return profileListBox;
}
