import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '@actions/sessionActions';
import {userSelector, tokenSelector} from '@selectors/sessionSelector';
import {NavigationService} from '@navigation';

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const token = useSelector(tokenSelector);
  const handleLogin = useCallback(
    () => dispatch(login('eve.holt@reqres.in', 'cityslicka')),
    [dispatch],
  );
  const returnHome = useCallback(() => NavigationService.navigate('Home'), []);

  const loginButton = () => (
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text>Login</Text>
    </TouchableOpacity>
  );

  const welcomeUser = () => {
    const {first_name, last_name} = user;
    return <Text>{`Welcome, ${first_name} ${last_name}`}</Text>;
  };

  return (
    <View style={styles.container}>
      {user && token ? welcomeUser() : loginButton()}
      <TouchableOpacity
        style={[styles.button, {marginTop: 16}]}
        onPress={returnHome}>
        <Text>Go back to home screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    borderColor: '#000',
    borderRadius: 4,
    borderWidth: 1,
    minHeight: 48,
    paddingHorizontal: 8,
  },
};
