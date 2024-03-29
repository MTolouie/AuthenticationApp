import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authenticateUser } from "../store/redux/user";
import { useDispatch } from "react-redux";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password);
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
    return <LoadingOverlay message={"Creating User ..."} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
