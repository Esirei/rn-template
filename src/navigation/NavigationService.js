import {NavigationActions, DrawerActions, StackActions} from 'react-navigation';

let _navigator;

function setAppNavigator(nav) {
  _navigator = nav;
}

function getAppNavigator() {
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

export default {
  setAppNavigator,
  getAppNavigator,
  navigate,
  setParams,
  push,
  pop,
  popToTop,
  back,
  openDrawer,
  closeDrawer,
  toggleDrawer,
};
