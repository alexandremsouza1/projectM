<template>
  <q-page class="flex flex-center">
    <div class="row col-7 justify-center">
      <div class="col-8 text-center q-display-4 text-indigo-12 self-center">
        <div class="ura">tqx</div>
        <div class="q-display-2 text-weight-thin text-white">Traqxion-Murdoch Collaboration</div>
      </div>
    </div>
    <div class="col-5 q-pr-xl q-pl-xl glow bg-indigo-14">
      <div class="text-weight-light q-display-2 text-center text-white self-center q-ma-xl" >
        Sign In
      </div>
      <signin />
    </div>
  </q-page>
</template>

<style>
.glow {
  box-shadow: -3px 0px 30px 5px white;
  min-height: 400px;
}
</style>

<script>
import Signin from '../components/signin'
export default {
  name: 'SignInForm',
  components: {Signin}
}
</script>
