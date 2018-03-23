<template>
  <div padding class="q-pa-lg col">
    <q-field
      :error="$v.profile.email.$error"
      error-label="Please type a valid email"
      class="q-display-1 text-center q-ma-md"
    >
      <q-input
        autofocus
        type="email"
        placeholder="Email"
        v-model="profile.email"
        @blur="$v.profile.email.$touch"
        @keyup.enter="submit"
        class="q-display-1 text-weight-light q-pr-md q-pl-md q-mb-md text-center"
      />
    </q-field>
    <q-field
      :error="$v.profile.password.$error"
      error-label="Please enter your password"
      class="q-display-1 text-center q-ma-md"
    >
      <q-input
        autofocus
        type="password"
        placeholder="Password/Create a new password if you are new"
        v-model="profile.password"
        @keyup.enter="submit"
        class="q-display-1 text-weight-light q-pr-md q-pl-md q-mb-md text-center"
      />
    </q-field>
    <div class="row justify-center q-mt-md">
      <q-btn class="self-center row" flat dense color="white" size="xl" @click="submit">Submit</q-btn>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ComponentSignin',
  data () {
    return {
      profile: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    profile: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    submit () {
      this.$v.profile.$touch()

      if (this.$v.profile.$error) {
        this.$q.notify('Please check the fields again.')
      }
      this.$root.$emit('signed')
      console.log(this)
    }
  }
}
</script>

<style>
input.q-input-target {
  min-height: 48px;
}
.q-field-error {
  font-size: 24px;
  line-height: 27px;
  color: #37474f;
}
input {
  text-align: center;
}
</style>
