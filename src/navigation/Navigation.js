import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import RouteNames from './RouteNames';
import ExtraScreen from '@screens/ExtraScreen';
import ReactNativeScreen from '@screens/ReactNativeScreen';

export default createAppContainer(
  createBottomTabNavigator({
    [RouteNames.HOME]: ReactNativeScreen,
    [RouteNames.EXTRA]: ExtraScreen,
  }),
);
