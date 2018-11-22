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
      :width="width"
    >
      <source :src="url">
    </video>
    <iframe
      v-if="url.startsWith('https://www.youtube.com/') || url.startsWith('https://youtu.be/')"
      :height="width * 9 / 16"
      :src="youtubeEmbeddedUrl"
      :width="width"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameborder="0"
      allowfullscreen
      autoplay
    ></iframe>
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
  private width = 0;

  public getContainerWidth() {
    const { container } = this.$refs;

    if (container && this.width !== container.offsetWidth) {
      this.width = container.offsetWidth;
    }
  }
  private updated() {
    this.getContainerWidth();
  }

  get youtubeEmbeddedUrl() {
    const autoplay = `${this.url.includes('?') ? '&' : '?'}autoplay=1`;
    const url = new URL(this.url);
    let id = url.searchParams.get('v') || url.searchParams.get('video');

    if (!id && url.origin === 'https://youtu.be') {
      id = url.toString().match(/https:\/\/youtu\.be\/([0-9a-zA-Z_-]+)/)[1];
    }

    return `https://youtube.com/embed/${id}?autoplay=1`;
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