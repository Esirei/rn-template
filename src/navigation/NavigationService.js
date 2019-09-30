import {
  NavigationActions,
  StackActions,
  NavigationContainer,
  NavigationRoute,
  NavigationDispatch,
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator: NavigationContainer & { dispatch: NavigationDispatch };

function setRef(nav) {
  _navigator = nav;
}

function getRef(): NavigationContainer {
  return _navigator;
}

function navigate(routeName, params?, action?) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action,
    }),
  );
}

function setParams(params, key) {
  _navigator.dispatch(
    NavigationActions.setParams({
      params,
      key,
    }),
  );
}

function push(routeName, params, action) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
      action,
    }),
  );
}

function pop() {
  _navigator.dispatch(StackActions.pop());
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

function back() {
  _navigator.dispatch(NavigationActions.back());
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

const getCurrentRouteName = (route: NavigationRoute): string => {
  const { index, routes, routeName } = route;
  return routes ? getCurrentRouteName(routes[index]) : routeName || '';
};

const currentRouteName = (): string => {
  return getRef() ? getCurrentRouteName(getRef().state.nav) : '';
};

export default {
  setRef,
  getRef,
  navigate,
  setParams,
  push,
  pop,
  popToTop,
  back,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  currentRouteName,
};
