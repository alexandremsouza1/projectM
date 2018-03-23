<template>
  <q-layout view="hhh lpr lff">
    <q-layout-header class="no-shadow">
      <q-toolbar class="transparent" v-show="signedin">
        <!--<q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>-->

        <q-toolbar-title>
          Traqxion Learning Lab
          <div slot="subtitle">Hacking Education</div>
        </q-toolbar-title>
        <q-btn
          round
        >
          <q-icon name="person" />
          <q-popover class="bg-blue-grey-9">
            <q-list inset-delimiter link dark no-border>
              <q-item to="/calibration">
                <q-item-main label="Profile" />
              </q-item>
              <q-item to="/">
                <q-item-main label="Sign Out" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <!-- <q-layout-drawer
      v-model="leftDrawerOpen"
    >
    <q-scroll-area class="fit q-pa-sm">
      <q-list
        dark
        no-border
        link
        inset-delimiter>
        <q-item to="/">
          <q-item-main label="Profile" />
        </q-item>
        <q-item to="/calibration">
          <q-item-main label="Calibration" />
        </q-item>
      </q-list>
    </q-scroll-area>
    </q-layout-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    this.$root.$on('signed', this.signed)
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      signedin: false
    }
  },
  methods: {
    signed () {
      this.signedin = !this.signedin
    }
  }
}
</script>

<style>
</style>
