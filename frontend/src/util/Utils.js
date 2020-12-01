import { API_BASE_URL } from './Constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log("options: ",options);
    console.log("options.url: ",options.url);
    return fetch(options.url, options)
    .then(response => 
        
        response.json().then(json => {
            console.log("util resp", response);
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};



export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + year;
}
  
export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug", 
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}  

// export function getCurrentUser() {
//     if(!localStorage.getItem(ACCESS_TOKEN)) {
//         return Promise.reject("No access token set.");
//     }

//     return request({
//         url: API_BASE_URL + "/user/me",
//         method: 'GET'
//     });
// }

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/authenticate",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function postProduct(postProductRequest) {
    return request({
        url: API_BASE_URL + "/auth/postProduct",
        method: 'POST',
        body: JSON.stringify(postProductRequest)
    });
}

export function purchaseProduct(postProductRequest) {
    return request({
        url: API_BASE_URL + "/auth/purchaseProduct",
        method: 'POST',
        body: JSON.stringify(postProductRequest)
    });
}

export function getProducts() {
    return request({
        url: API_BASE_URL + "/auth/getAllProducts",
        method: 'GET'
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}



// export function getUserProfile(username) {
//     return request({
//         url: API_BASE_URL + "/users/" + username,
//         method: 'GET'
//     });
// }