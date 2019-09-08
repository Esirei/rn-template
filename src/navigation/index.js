import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ExtraScreen from '@screens/ExtraScreen';
import ReactNativeScreen from '@screens/ReactNativeScreen';

export default createAppContainer(
  createBottomTabNavigator({
    Home: ReactNativeScreen,
    Extra: ExtraScreen,
  }),
);
