import { Widgets } from 'blessed';
import { loadProfiles } from './configuration';
import { MainScreen } from './views/mainScreen';

loadProfiles();

const mainScreen: Widgets.Screen = MainScreen(() => process.exit(0));

mainScreen.render();


