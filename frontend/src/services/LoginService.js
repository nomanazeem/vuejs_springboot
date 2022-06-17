//import http from '../http-common';

const myLoginRoutine = user => new Promise ((resolve, reject) => {
    axios({url: 'http://localhost:9090/api/auth/signin', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        localStorage.setItem('user-token', token) // store the token in localstorage
        resolve(resp)
      })
    .catch(err => {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      reject(err)
    })
  })
/*
class LoginService {
   doLogin(){
        //return http.get('/hello');

        return http.get('/hello')
        .then(resp => {
            return resp.data
        }).catch(e => {
            console.log('error hello():', e)
        });


        / *.then(resp => {
            //debugger;
            return resp.data;
        }).catch(e => {
           console.log('error get agencies: ', e);
        });* /
   }
   callLogin(userInfo){
        return http.post('/login', userInfo)
        .then(resp => {
            return resp.data;
        }).catch(e => {
            console.log(e);
        });
   }
}

export default new LoginService();
*/
