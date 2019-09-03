import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AnotherScreen from '@screens/AnotherScreen';
import ReactNativeScreen from '@screens/ReactNativeScreen';

export NavigationService from './NavigationService';

export default createAppContainer(
  createBottomTabNavigator({
    Home: ReactNativeScreen,
    Extra: AnotherScreen,
  }),
);
