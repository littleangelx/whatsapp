import { FontAwesome } from "@expo/vector-icons";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { useReducer, useCallback, useEffect, useState } from "react";
import { reducer } from "../utils/reducers/formReducer";
import { signIn } from "../utils/actions/authActions";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";

import colors from "../constants/colors";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "rachel@example.com" : "",
    password: isTestMode ? "Password" : "",
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};

const SignInForm = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const dispatch = useDispatch();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <>
      <Input
        id="email"
        label="Email"
        autoCapitalize="none"
        icon="mail"
        iconPack={Feather}
        initialValue={formState.inputValues.email}
        onInputChanged={inputChangedHandler}
        keyboardType="email-address"
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        autoCapitalize="none"
        secureTextEntry
        icon="lock"
        iconPack={Feather}
        initialValue={formState.inputValues.password}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["password"]}
      />

      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign in"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;
