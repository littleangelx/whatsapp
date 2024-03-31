import { StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../constants/colors";

const SubmitButton = ({ color, disabled, title, onPress, style }) => {
  const enabledBgColor = color || colors.primary;
  const disabledBgColor = colors.lightgrey;
  const bgColor = disabled ? disabledBgColor : enabledBgColor;
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...style, ...{ backgroundColor: bgColor } }}
      onPress={disabled ? () => {} : onPress}
    >
      <Text style={{ color: disabled ? colors.grey : "#fff" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SubmitButton;
