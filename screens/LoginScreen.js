import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { authenticateUser } from "../store/redux/user";
import { useDispatch } from "react-redux";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const response = await login(email, password);
      dispatch(
        authenticateUser({ token: response.token, email: response.email })
      );
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Could Not Log You In Please Check Your Credentials, Or Try Agian later"
      );
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={"Loggin User In ..."} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
