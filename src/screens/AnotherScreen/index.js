import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationService} from '@navigation';

export default () => {
  const returnHome = useCallback(() => NavigationService.navigate('Home'), []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={returnHome}>
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
