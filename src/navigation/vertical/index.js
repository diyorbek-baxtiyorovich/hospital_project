import checkPermission from "@/utils/checkPermission.js"

export const navItems = [
  {
    title: 'Asosiy',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Departaments',
    to: { name: 'host-depart' },
    icon: { icon: 'tabler-building-bank' },
  },
  {
    title: 'Mijozlar ro\'yxati',
    to: { name: 'clients' },
    icon: { icon: 'mdi-account-multiple' },
  },
  {
    title: 'Agentlar daromadlari',
    to: { name: 'agents' },
    icon: { icon: 'mdi-account-multiple' },
  },
  {
    title: 'Struktura',
    to: { name: 'region' },
    icon: { icon: 'mdi-cog' },
    children: [
      // {
      //   title: 'Viloyat',
      //   to: { name: 'region' },
      //   icon: { icon: 'mdi-folder-wrench-outline' },
      // },

      // // {
      // //   title: 'Tuman',
      // //   to: {name: 'district'},
      // //   icon: {icon: 'mdi-map'},
      // // },
      // {
      //   title: 'Lokal kod',
      //   to: { name: 'local-code' },
      //   icon: { icon: 'mdi-map' },
      // },
      // {
      //   title: 'Departament',
      //   to: { name: 'department' },
      //   icon: { icon: 'mdi-map' },
      // },
      {
        title: 'Xodimla ro\'yxati',
        to: { name: 'user' },
        icon: { icon: 'mdi-map' },
      },
    ],
  },
  {
    title: 'RBAC',
    to: { name: 'rbac' },
  },
]

export const filterNavItems = navItems => {
  // Get username from localStorage
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const username = userData?.data?.username

  return navItems.filter(item => {
    const permissionKey = item.permission || null

    // Special case: only show "RBAC" if user is superuser
    if (item.title === 'RBAC') {
      // return username === 'superuser | admin'
      return true
    }

    // Handle children
    if ('children' in item && Array.isArray(item.children)) {
      item.children = filterNavItems(item.children)

      return item.children.length > 0 || (permissionKey ? checkPermission(permissionKey) : true)
    }

    // Normal permission check
    return permissionKey ? checkPermission(permissionKey) : true
  })
}
