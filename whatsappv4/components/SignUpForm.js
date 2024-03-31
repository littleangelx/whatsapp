import { Feather, FontAwesome } from "@expo/vector-icons";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { ActivityIndicator, Alert } from "react-native";
import { validateInput } from "../utils/actions/formActions";
import { useCallback, useReducer, useState, useEffect } from "react";
import { reducer } from "../utils/reducers/formReducer";
import { signUp } from "../utils/actions/authActions";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = () => {
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

      const action = signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      await dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["firstName"]}
      />
      <Input
        id="lastName"
        label="Last Name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["lastName"]}
      />
      <Input
        id="email"
        label="Email"
        autoCapitalize="none"
        icon="mail"
        iconPack={Feather}
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
          title="Sign up"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUpForm;
