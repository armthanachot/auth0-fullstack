var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-s3o1avy9.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: {
    grant_type: 'authorization_code',
    client_id: 'Tp3dVHDLkHO4ta8HYrapeHGoadllUYuX',
    client_secret: 'YOUR_CLIENT_SECRET',
    code: '2E7NwaBCWmzn2Sal',
    redirect_uri: 'http://localhost:4040/profile'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
