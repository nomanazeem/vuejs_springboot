//import { path } from 'chromedriver'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

//Todo
const Todos = () => import('@/views/todos/Todos')
const Todo = () => import('@/views/todos/Todo')


Vue.use(Router);

/*
export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});
*/
const router =  new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },

        {
          path: "todos",
          name: "Todos",
          component: Todos
        },
        {
          path: "todos/:id",
          name: "todo-details",
          component: Todo
        },
        {
          path: "todos/add",
          name: "add-todo-details",
          component: Todo
        },
        
        /* {
          path: "/add",
          name: "add",
          component: () => import("./components/AddTutorial")
        } */

        /* {
          path: 'todos',
          meta: {
            label: 'Todos'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Todos',
              component: Todos
            },
            {
              path: ':id',
              meta: {
                label: 'Todo Details'
              },
              name: 'Todo',
              component: Todo
            }
          ]
        }, */

        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

router.beforeEach((to, from, next)=>{

    //debugger;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log('secure pages.....');
        //console.log(to);
        
        
        //check the security....
        if(!store.getters.isLoggedIn){
          next({
            path: "/pages/login" 
          });
        }else {
          next();
        }
    }else {
      console.log('unsecure pages.....');
      //console.log(to);

      next();
    }
});

export default router;
