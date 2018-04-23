import axios from 'axios';

class SessionApi {
  static login(credentials) {
    return axios({
      method: 'POST',
      url: '/api/login',
      data: {
        auth: credentials,
      },
    });
  }

  static signup(credentials) {
    return axios({
      method: 'POST',
      url: '/api/users',
      data: {
        auth: credentials,
      },
    });
  }
}

export default SessionApi;
