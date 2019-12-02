export default () => ({
  currentUser: {
    name: '',
    email: '',
    password: '',
    id: ''
  },
  isAdmin: true,
  isAuthorized: true,
  authId: null,
  unsubscribeAuthObserver: null,
  list: []
})
