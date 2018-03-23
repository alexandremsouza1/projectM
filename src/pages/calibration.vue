<template>
  <q-page padding class="row">
    <div class="col-3">
      <div id="data-panel">
        <h4 class="text-weight-thin dark"> Test Alpha </h4>
      </div>
      <div id="description">
        <p class="text-white q-subheading text-weight-thin">This test is to evaluate your current mastery level. It consists of {{test.length}} questions and you have a time limit of 1 min per question.
           If you have answered the question before the time is up, click the > button or press enter to move to the next question
           You will not be able to go back to change your answer after moving on to the next question.
        </p>
        <br>
        <p class="text-white q-subheading text-weight-thin"> Good Luck!</p>
      </div>
      <div class="bg-indigo-12 q-pt-lg q-pb-lg">
        <p class="text-white text-center q-display-3">Progress</p>
        <p class="text-center text-white q-display-3 text-weight-thin">
          {{current}} / {{test.length}}
        </p>
      </div>
    </div>
    <div class="col justify-between items-stretch content-center">
      <div class="col" v-show="active.id > 0 && end == false">
        <q-progress :percentage="progress" height="24px" color="indigo-12"/>
        <div class="row justify-end">
          <span class="text-white text-weight-thin q-display-1 q-mt-md">
            Time Remaining: {{timeRemaining}} seconds
          </span>
          <!-- <q-knob
            v-model="progress"
            :min="0"
            :max="100"
            trackColor="indigo-12"
            color="blue-grey-9"
            size="200px"
            :step="0.1"
            lineWidth="6px"
            readonly /> -->
        </div>
      </div>
      <div id="test-panel" class="row justify-center items-center fill-height">
        <div v-show="active.id === -1">
          <q-btn
            color="indigo-12"
            text-color="white"
            size="xl"
            label="Begin"
            icon-right="play_arrow"
            @click="increment"
          />
        </div>
        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutRight"
          mode="out-in"
          v-if="end == false"
        >
          <question
            :question="question"
            v-if="active.id === question.id"
            v-for="question in test"
            v-bind:key="question.id"
          />
        </transition>
        <transition
          enter-active-class="animated fadeIn delay"
          leave-active-class="animated fadeOutRight"
          mode="out-in"
        >
          <div v-show="end">
            <q-card color="white" text-color="blue-grey-9" style="min-width:480px">
              <q-card-title>
                Your Results
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <q-list no-border inset-separator>
                  <q-item>
                    <q-item-main label="Total Questions">
                    </q-item-main>
                    <q-item-side right>
                      <q-item-tile>
                        {{test.length}}
                      </q-item-tile>
                    </q-item-side>
                  </q-item>
                  <q-item>
                    <q-item-main label="Answers Correct">
                    </q-item-main>
                    <q-item-side right>
                      <q-item-tile>
                        {{test.length}}
                      </q-item-tile>
                    </q-item-side>
                  </q-item>
                  <q-item>
                    <q-item-main label="Average time taken per question">
                    </q-item-main>
                    <q-item-side right>
                      <q-item-tile>
                        {{test.length}}
                      </q-item-tile>
                    </q-item-side>
                  </q-item>
                </q-list>
              </q-card-main>
            </q-card>
          </div>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script>
import Question from '../components/question'

export default {
  name: 'PageCalibration',
  components: {Question},
  data () {
    this.$root.$on('increment', this.increment)
    this.$root.$on('time', this.onTimerProgress)
    return {
      test: [
        {id: 1, word: 'arrange'},
        {id: 2, word: 'boy'},
        {id: 3, word: 'cat'}
      ],
      current: 0,
      active: { id: -1 },
      timeLimit: 60000,
      timeElapsed: 0,
      timeRemaining: 0,
      end: false
    }
  },
  computed: {
    percentage () {
      return this.current / this.test.length * 100
    },
    progress: function () {
      return this.timeElapsed / this.timeLimit * 100
    }
  },
  methods: {
    increment (data) {
      console.log(data)
      this.test[this.current - 1] = data
      this.timeElapsed = 0
      if (this.current < this.test.length) {
        this.active = this.test[this.current]
        this.current++
      } else {
        this.end = true
        console.log('test ended')
      }
    },
    onCountdownProgress (data) {
      this.timeElapsed = this.timeLimit - data.seconds
    },
    onTimerProgress (data) {
      this.timeRemaining = (data / 1000).toFixed(3)
      this.timeElapsed = this.timeLimit - data
    }
  }
}
</script>

<style>
.dark{
  color: white
}
.fill-height{
  min-height: calc(100% - 80px);
}
.delay{
  animation-delay: 1000ms;
}
</style>
