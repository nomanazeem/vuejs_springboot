import axios from 'axios';

export default {
    /* state : {
        isAuthenticated:false,
        isLoggedIn:false,
    }, */

    state : {
        token: localStorage.getItem('user-token') || '',
        status :'',
    },

    date() {
        return {
            abc:true,
            xyz:true,
        }
    },

    methods:{
        method1(){

        },
        method2 = function(){

        },
    }
}


const myLoginRoutine = user => new Promise((resolve, reject)=> {
    axios({url:'', data:user, method:'POST'})
    .then(resp=>{
         //return resp.data;   

         //set in local storage
         localStorage.setItem('user-token', response.data.token);
        
         //Get user's token
         //var user_token = localStorage.getItem('user-token');
         
         resolve(resp);
    })
    .catch(err=>{
        
        //remove from local storage
        localStorage.removeItem('user-token');

        reject(err);
        
    });
});

//Set token in state

const state = {
    token : localStorage.getItem('user-token')|| '',
    status:'',
}
const getters = {
    isAuthenticate : state=>!! state.token,
    authSatus : state=>state.status,
}


//SPREAD AND REST
//MAPS AND SET
//CLASS INHERITANCE
//TEMPLATE LITERALS
//DESTRUCTURING
//PROMISES
//THE FETCH API

//exporting const as a module
export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS="AUTH_SUCCESS";
export const AUTH_ERROR="AUTH_ERROR";
export const AUTH_LOGOUT="AUTH_LOGOUT";


//login.vue
//data, action login -->call to store login calls
//

export default {
    state:{

    },
    data(){
        return {
            username:'',
            password:'',
        }
    },
    computed:{
        isLoggedIn = function(){ return this.$store.getters.isLoggedIn;}
    },
    methods:{
        login = function(){
           let data = {
               username: this.username,
               password: this.password,
           }
            this.$store.dispatch('login', data)
            .then(resp=>{
                //Get token and store in local storage
                var token = resp.data.token;
                localStorage.setItem('user-token', token);

                //redirect to dashboard if successfull
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err);
            });    
        },
        logout = function(){
            this.$store.dispatch('logout')
            .then(resp => {
                localStorage.removeItem('user-token');
                this.$router.push('/login');
            })
            .catch(err=>{
                console.log(err);
            });
        },
        register=function(){
            let data = {
                name:this.name,
                username:this.username,
                password:this.password,
                email:this.email,
            }
            this.$store.dispatch('register', data)
            .then(resp=>{
               console.log('you have successfully registered to awesome app!');

            })
            .catch(err =>{
                console.log(err);
            });
        }
    }
}

axios.defaults.headers.common['Authorization'] = token;
delete axios.defaults.headers.common['Authorization'];

//Auth module
//Option 1
var mystore = new Vue.Store({

});
export default mystore;

//These necessary files needs to include in store....
import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';

//Option 2
export default new Vue.Store({
    state:{
        loggedIn:false,
        user:{},
        status:false,
    },
    mutations:{
        success_login(state, user){
            state.loggedIn = true;
            state.user = user;
            state.status = false;
        },
        register(state, user){
            state.loggedIn=false;
            state.user={};
            state.status=false;
        },
        logout_user(state){
            state.loggedIn=false;
            state.user={};
            state.status=false;
        },
    },
    actions:{
        login({commit, dispatch}, user){
            new Promise((resolve, rejected)=>{
                
                //call to axios api
                axios({url:'http://localhost:9090/api/auth/signin', data: user, method:'POST'})
                .then(resp=>{
                    //Get token
                    var token = resp.data.token;

                    //call the mutation, and update state variable
                    commit('success_login', user);

                    //Store in local storage
                    localStorage.setItem('user-token', token);

                    //Set token in axios header so that every call to api will have header
                    axios.defaults.headers.common['Authorization']= token;
                    
                    //callback
                    resolve(resp);
                })
                .catch(err=> {
                    console.log(err);
                    //remove local storage
                    localStorage.removeItem('user-token');

                    //Remove token from authorization header
                    remove axios.defaults.headers.common['Authorization'];

                    //call rejected callback
                    rejected(err);
                });
            });
        },
        register({commit, dispatch}, user){

        },
        logout({commit, dispatch}){

        },
    },
    getters:{
        isLoggedIn : this.state.loggedIn,
        status:this.state.status,
        user : this.state.user,
    }
});