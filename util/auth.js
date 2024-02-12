import axios from "axios";
import { Alert } from "react-native";

const API_KEY = "AIzaSyCccvYNSO5EiwtGGgq7tfoD2khPoYLZUXY";
export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const userEmail = response.data.email;

  return { token: token, email: userEmail };
};

export async function createUser(email, password) {
  try {
    const result = await authenticate("signUp", email, password);
    return result;
  } catch (error) {
    Alert.alert("Signup Failed. Please Check Your Input Or Try Again Later.");
  }
}

export async function login(email, password) {
  try {
    const result = await authenticate("signInWithPassword", email, password);
    return result;
  } catch (error) {
    Alert.alert("Login Failed. Please Check Your Input Or Try Again Later.");
  }
}
// export async function createUser(email, password) {
//   console.log(email + "and" + password);

//   try {
//     const response = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
//       {
//         email: email,
//         password: password,
//         returnSecureToken: true,
//       }
//     );
//     console.log("User created successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating user:", error.response.data.error.message);
//     throw error;
//   }
// }
