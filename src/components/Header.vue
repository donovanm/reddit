<template>
  <header class="main-header">
    <h1>Reddit</h1>
    <h2><input v-model="text" v-on:keypress="handleKeyPress" /></h2>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  public text: string = this.subreddit;
  @Prop() private onUpdate!: (text: string) => {};
  @Prop() private subreddit!: string;

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
</style>
