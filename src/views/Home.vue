<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Header :onUpdate="onUpdateSubreddit" />
    <Listing :subreddit="formattedSubreddit" />
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
  public subreddit: string = '';

  public onUpdateSubreddit(text: string): void {
    this.subreddit = text;
  }

  get formattedSubreddit() {
    return this.subreddit ? `/r/${this.subreddit}` : '';
  }
}
</script>
<style lang="stylus">
#main.night-mode
  background-color #000
  color: #eee

  a
    color rgb(113, 147, 255)
</style>