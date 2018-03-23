<template>
  <div id="questions">
    <div class="row items-center q-mb-lg">
      <q-btn icon="play_arrow" round color="indigo-12" @click="replay"/>
      <div class="text-white  text-weight-bold q-ml-md" @click="replay">Hear word</div>
    </div>
    <q-field class="text-weight-thin q-display-1">
      <q-input
        v-model="question.answer"
        type="text"
        ref="inputfield"
        placeholder="Your Answer"
        color="white"
        upper-case autofocus="true" dark
        @keyup.enter="next"
        :after="[
          {
            icon: this.icon,
            handler: next
          }
        ]"
        class="text-weight-thin q-display-1 uppercase" />
    </q-field>
  </div>
</template>

<script>
const timeLimit = 60500
const interval = 100

export default {
  name: 'ComponentQuestion',
  props: {
    question: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    this.voice = { lang: 'en-US' }
  },
  mounted () {
    this.stop()
    this.endtime = Date.now() + timeLimit
    this.$jarvis.say(this.question.word, this.voice)
    this.tick()
  },
  destroyed () {
    this.stop()
  },
  data () {
    return {
      word: this.question.word || 'error',
      icon: 'navigate_next',
      current: 0,
      timeLimit: 60,
      timeleft: 0
    }
  },
  computed: {
  },
  methods: {
    narrate () {
      this.$jarvis.say(this.word, this.voice)
    },
    stop () {
      this.$jarvis.shutUp()
      clearTimeout(this.timer)
    },
    replay () {
      this.narrate(this.word)
      this.$refs.inputfield.focus()
    },
    next () {
      this.stop()
      if (this.question.answer) {
        this.question.answer = this.question.answer.toLowerCase()
      } else {
        this.question.answer = ''
      }
      this.question.timetaken = Math.min(60000, timeLimit - 500 - this.timeleft)
      this.$root.$emit('increment', this.question)
    },
    tick () {
      var vm = this
      this.timer = setTimeout(function () {
        vm.timeleft = vm.endtime - Date.now()
        vm.$root.$emit('time', Math.max(0, vm.timeleft))
        if (vm.timeleft > 0) {
          vm.tick()
        } else {
          vm.next()
        }
      }, interval)
    }
  }
}
</script>
<style>
#questions input.q-input-target, #question .q-field-label-inner {
  height: 36px;
  color: white;
}
#questions .q-if-control {
  font-size: 36px;
}

</style>
