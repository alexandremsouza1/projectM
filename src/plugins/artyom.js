import Artyom from 'artyom.js'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  const Jarvis = new Artyom()
  Vue.prototype.$jarvis = Jarvis
}
