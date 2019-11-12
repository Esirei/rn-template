import {
  GestureResponderEvent,
  Platform,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from 'react-native';
import React from 'react';

export interface Props extends TouchableNativeFeedbackProps, TouchableHighlightProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const Touchable = ({ style, children, ...props }: Props) => {
  const android = () => (
    <TouchableNativeFeedback {...props}>
      <View {...{ style }}>{children}</View>
    </TouchableNativeFeedback>
  );

  const others = () => <TouchableHighlight {...{ style, ...props }}>{children}</TouchableHighlight>;

  return Platform.OS === 'android' ? android() : others();
};

Touchable.defaultProps = {
  underlayColor: '#E0E0E0',
};

export default React.memo(Touchable);
