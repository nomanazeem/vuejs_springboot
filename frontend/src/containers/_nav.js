export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
        icon: 'cil-user'
      },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Todos',
        to: '/todos',
        icon: 'cil-user'
      },
      

      {
        _name: 'CSidebarNavDropdown',
        name: 'Pages',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Login',
            to: '/pages/login'
          },
          {
            name: 'Register',
            to: '/pages/register'
          },
          {
            name: 'Error 404',
            to: '/pages/404'
          },
          {
            name: 'Error 500',
            to: '/pages/500'
          }
        ]
      },
    ]
  }
]