import React from 'react';
import {View} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './store';
import Navigation, {NavigationService} from './navigation';

const App = () => {
  const setNavigator = ref => NavigationService.setAppNavigator(ref);
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <Navigation ref={setNavigator} />
      </PersistGate>
    </Provider>
  );
};

export default App;
