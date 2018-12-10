<template>
  <header class="main-header">
    <h1>Reddit</h1>
    <h2>/r/<input v-model="text" v-on:keypress="handleKeyPress" /></h2>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private onUpdate!: (text: string) => {};

  private text: string = '';

  public mounted() {
    this.text = this.$route.params.subreddit;
  }

  @Watch('$route')
  public onRouteChanged() {
    this.text = this.$route.params.subreddit;
  }

  public handleKeyPress(event: { key: string }) {
    if (event.key === 'Enter') {
      this.onUpdate(this.text);
    }
  }

}
</script>

<style lang="stylus">
.main-header
  background-color #141414
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
    font-size 18px

  input
    background-color #f5f5f5
    border 1px solid #f5f5f5
    border-radius 2px
    color #ff4500

    &:focus
      background-color white
      border-color #ff4500

#main.night-mode
  input
    background-color #242424
    border-color #414141

    &:focus
      border-color #ff4500
</style>
