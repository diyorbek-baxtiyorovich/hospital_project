import {setupLayouts} from 'virtual:generated-layouts'
import {createRouter, createWebHistory} from 'vue-router/auto'
import checkPermission from "@/utils/checkPermission.js"

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])

    return route
  }

  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return {el: to.hash, behavior: 'smooth', top: 60}

    return {top: 0}
  },
  extendRoutes: pages => [
    ...[...pages].map(route => recursiveLayouts(route)),
  ],
})

// ✅ Add permission check
router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const username = userData?.user?.username

  const {endpoint, superuserOnly} = to.meta || {}

  // ✅ Allow if no endpoint or superuser restriction
  if (!endpoint && !superuserOnly) return next()

  // ✅ Allow superuser-only routes for superusers
  if (superuserOnly && username === 'superuser') return next()

  // ✅ Check normal permissions
  if (endpoint && checkPermission(endpoint)) return next()

  // ❌ Redirect to login or 403
  next('/login')
})


export {router}

export default function (app) {
  app.use(router)
}
