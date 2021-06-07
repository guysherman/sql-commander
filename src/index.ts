import { Widgets } from 'blessed';
import { loadProfiles } from './configuration';
import { MainScreen } from './views/mainScreen';

loadProfiles().then(() => {
  const mainScreen: Widgets.Screen = MainScreen(() => process.exit(0));
  mainScreen.render();
});



