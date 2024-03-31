import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import PageContainer from "../components/PageContainer";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import colors from "../constants/colors";
import logo from "../assets/images/logo.png";

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} />
            </View>
            {isSignUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              onPress={() => setIsSignUp((prevState) => !prevState)}
              style={styles.linkContainer}
            >
              <Text style={styles.link}>{`Switch to ${
                isSignUp ? "sign in" : "sign up"
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: colors.blue,
    fontWeight: 500,
    letterSpacing: 0.3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
    resizeMode: "contain",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AuthScreen;
