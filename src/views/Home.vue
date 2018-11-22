<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <header>
      <h1>Reddit</h1>
      <h2>/r/funny</h2>
    </header>
    <Listing />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Listing from '@/components/Listing.vue'; // @ is an alias to /src

@Component({
  components: {
    Listing,
  },
})
export default class Home extends Vue {}
</script>
<style lang="stylus">
.home
  & > header
    border-bottom 1px solid #ddd
    color rgb(255, 69, 0)
    padding 0 10px

    h1
      display inline
      font-size 20px
      font-weight 300
      line-height 1.6
      margin 0 10px 0 0

    h2
      display inline
</style>