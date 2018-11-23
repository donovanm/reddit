<template>
  <header class="main-header">
    <h1>Reddit</h1>
    <h2>/r/<input v-model="text" v-on:keypress="handleKeyPress" /></h2>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  @Prop() private onUpdate!: (text: string) => {};
  @Prop() private subreddit!: string;

  private text: string = this.subreddit;

  public handleKeyPress(event: { key: string }) {
    if (event.key === 'Enter') {
      this.onUpdate(this.text);
    }
  }

}
</script>

<style lang="stylus">
.main-header
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
    font-size 18px

  input
    background-color #f5f5f5
    border 1px solid #f5f5f5
    border-radius 2px
    color #ff4500

    &:focus
      background-color white
      border-color #ff4500
</style>
