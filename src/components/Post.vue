<template>
  <div class="post" v-if="url" ref="container">
    <header>
      <h2 style="margin: 0">{{title}}</h2>
      <h3 style="font-size: 70%; margin: 0 0 10px">
        <span style="color: rgb(255, 69, 0);">{{upvotes}}</span>
        |
        <span style="color: rgb(113, 147, 255);">{{downvotes}}</span>
      </h3>
    </header>
    <img v-if="type === 'image'" :src="url" />
    <video v-if="type === 'video'" ref="video"
      type="video/mp4"
      preload="auto"
      autoplay="autoplay"
      loop="loop"
      webkit-playsinline=""
    >
      <source :src="url">
    </video>
    <a v-if="type && type !== 'self'" :href="url" target="_blank">{{url}}</a>
    <div>{{selfText}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    author: String,
    downvotes: Number,
    selfText: String,
    title: String,
    type: String,
    upvotes: Number,
    url: String,
  },
})
export default class Post extends Vue {
  public resizeVideo() {
    const { container, video } = this.$refs;

    if (video) {
      video.width = container.offsetWidth;
    }
  }
  private updated() {
    this.resizeVideo();
  }
}
</script>

<style lang="stylus">
.post
  img
    max-width 100%
    max-height 100%
  header
    padding 5px 10px 0
</style>