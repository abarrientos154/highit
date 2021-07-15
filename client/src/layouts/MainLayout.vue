<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer
        v-model="drawer1"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        content-class=""
      >
        <q-scroll-area class="fit">
          <div class="row justify-center q-py-md">
            <img src="noimg.png" style="width: 70%; border-radius: 100%" />
          </div>
          <div class="text-center text-grey-8 text-subtitle1 text-bold">¿Qué quieres hacer?</div>

          <q-list>
            <template v-for="(item, index) in menu">
              <q-item :key="index" clickable :active="item.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="item.separator" />
            </template>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-drawer
        side="right"
        v-model="drawer2"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        content-class=""
      >
        <q-scroll-area class="fit">
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer1: true,
      drawer2: true,
      menu: [
        {
          icon: 'inbox',
          label: 'Inbox',
          separator: true
        },
        {
          icon: 'send',
          label: 'Outbox',
          separator: false
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
