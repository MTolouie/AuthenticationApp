import axios from "axios";

const API_KEY = "AIzaSyCccvYNSO5EiwtGGgq7tfoD2khPoYLZUXY";
export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
    console.log(response.data);
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
    ) {
      console.error(
        "Error While Authenticating:",
        error.response.data.error.message
      );
    } else {
      console.error("An error occurred while authenticating:", error.message);
    }
    throw error;
  }
};

export async function createUser(email, password) {
  await authenticate("signUp", email, password);
}

export async function login(email, password) {
  await authenticate("signInWithPassword", email, password);
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
