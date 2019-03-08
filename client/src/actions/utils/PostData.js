// export function PostData(type, userData) {
//   let BaseURL = "https://localhost:5000/auth/google";

//   return new Promise((resolve, reject) => {
//     fetch(BaseURL, {
//       method: "GET",
//       body: JSON.stringify(userData)
//     })
//       .then(response => response.json())
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
