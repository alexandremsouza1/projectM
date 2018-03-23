import Say from 'say'

// leave the export, even if you don't use it
export default ({ Vue }) => {
  console.log(Say)
  Say.setPlatform(Say.platforms.WIN32)
  Vue.prototype.$say = Say
}
