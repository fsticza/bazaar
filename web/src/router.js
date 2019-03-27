import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import SignIn from '@/auth/SignIn'
import AccountCreate from '@/account/Create'
import ProductList from '@/product/List'

import AdminAccountList from '@/account/admin/List'
import AdminProductCreate from '@/product/admin/Create'
import AdminProductList from '@/product/admin/List'

import store from '@/store'

Vue.use(Router)

const ensureAuthenticated = () => {
  return new Promise((resolve, reject) => {
    if (!store.getters['auth/isAuthenticated']) {
      const error = new Error('Unauthorized')
      error.code = 401
      reject(error)
    }
    resolve()
  })
}

const ensureRole = (role) => {
  return ensureAuthenticated().then(() => {
    return new Promise((resolve, reject) => {
      if (!store.getters[role]) {
        const error = new Error('Forbidden')
        error.code = 403
        reject(error)
      }
      resolve()
    })
  })
}

const checkPermissions = (to) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    return ensureAuthenticated()
  } else if (to.matched.some(record => record.meta.requiresAdminRole)) {
    return ensureRole('account/hasAdminRole')
  } else if (to.matched.some(record => record.meta.requiresUserCreateRole)) {
    return ensureRole('account/hasUserRole')
  }
  return Promise.resolve()
}

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      beforeEnter (to, from, next) {
        return store.dispatch('auth/signOut')
          .then(() => {
            store.dispatch('account/setAccount', null)
            next({name: 'Home'})
          })
          .catch(err => {
            console.error(err)
            next({name: 'Home'})
          })
      }
    },
    {
      path: '/accounts/create',
      name: 'AccountCreate',
      component: AccountCreate
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList
    },

    // ADMIN

    {
      path: '/admin/accounts',
      name: 'AdminAccountList',
      component: AdminAccountList,
      meta: {
        tag: 'account',
        requiresAdminRole: true
      }
    },
    {
      path: '/admin/products/create',
      name: 'AdminProductCreate',
      component: AdminProductCreate,
      meta: {
        tag: 'product',
        requiresAdminRole: true
      }
    },
    {
      path: '/admin/products/list',
      name: 'AdminProductList',
      component: AdminProductList,
      meta: {
        tag: 'product',
        requiresAdminRole: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('auth/updateLocalToken')
  store.dispatch('account/updateLocalAccount')
  store.dispatch('modal/closeAllModals')
  store.dispatch('setHttpError', null)

  return checkPermissions(to)
    .then(() => next())
    .catch(() => {
      store.dispatch('auth/signOut')
      store.dispatch('account/setAccount', null)
      next({
        name: 'Home',
        query: {
          httpError: 401,
          redirect: to.fullPath
        }
      })
    })
})

export default router
