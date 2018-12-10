<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Header :onUpdate="onUpdateSubreddit" />
    <Listing />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Header from '@/components/Header.vue'; // @ is an alias to /src
import Listing from '@/components/Listing.vue';

@Component({
  components: {
    Header,
    Listing,
  },
})
export default class Home extends Vue {
  public onUpdateSubreddit(subreddit: string): void {
    if (subreddit) {
      this.$router.push({ name: 'subreddit', params: { subreddit }});
    } else {
      this.$router.push('/');
    }
  }
}
</script>
<style lang="stylus">
#main.night-mode
  background-color #000
  color: #ddd

  a
    color #3d93f9
    text-decoration none
</style>