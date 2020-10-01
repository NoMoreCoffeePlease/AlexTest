import React from "react";
import { View, Button, TextInput, Picker, StyleSheet } from "react-native";

const Inputs = props => {
  let template = null;
  switch (props.type) {
    case "textinput":
      template = (
        <TextInput {...props} style={[styles.input, props.overrideStyle]} />
      );
      break;
    default:
      return template;
  }
  return template;
};
const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "blue",
    fontSize: 16,
    padding: 5,
    marginTop: 10
  }
});
export default Inputs;