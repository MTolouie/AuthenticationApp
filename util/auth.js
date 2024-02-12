import axios from 'axios';

const API_KEY = "AIzaSyCccvYNSO5EiwtGGgq7tfoD2khPoYLZUXY";

export async function createUser(email, password) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  );
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
