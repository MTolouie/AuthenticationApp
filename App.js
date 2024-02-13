import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { store } from "./store/redux/store";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import IconButton from "./components/ui/IconButton";
import { logUserOut, setToken } from "./store/redux/user";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logUserOut());
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={logoutHandler}
          />
        ),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const dispatch = useDispatch();
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        dispatch(setToken({ token: token }));
      }

      setIsTryingLogin(false);
    };

    fetchToken();
  }, []);
  const isUserAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync(); // splash screen until loading
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      {!isUserAuthenticated && <AuthStack />}
      {isUserAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
