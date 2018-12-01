<template>
  <div class="post" v-if="url" ref="container">
    <header class="default-padding">
      <h2 style="margin: 0">{{title}}</h2>
      <h3 style="font-size: 70%; margin: 0 0 10px">
        <span style="color: rgb(255, 69, 0);">{{upvotes}}</span>
        |
        <span style="color: rgb(113, 147, 255);">{{downvotes}}</span>
      </h3>
    </header>
    <img v-if="type === 'image'" :src="url" />
    <video v-if="type === 'video' || type === 'hosted:video'" ref="video"
      type="video/mp4"
      preload="auto"
      autoplay="autoplay"
      loop="loop"
      webkit-playsinline=""
      :width="width"
    >
      <source :src="redditVideo || url">
    </video>
    <audio v-if="type === 'hosted:video'" :src="audioURL" autoplay />
    <iframe
      v-if="isYoutubeVideo"
      :height="width * 9 / 16"
      :src="youtubeEmbeddedUrl"
      :width="width"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameborder="0"
      allowfullscreen
      autoplay
    ></iframe>
    <div class="default-padding">
      <a v-if="type && type !== 'self'" :href="url" target="_blank">{{url}}</a>
      <div class="self-text" v-html="renderedSelfText" />
      <h3>Comments ({{comments.length}})</h3>
      <Comments :comments="comments" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Comments from './Comments.vue';
import parseMarkdown from '../utils/parseMarkdown';

@Component({
  components: { Comments },
})
export default class Post extends Vue {
  @Prop() private author!: string;
  @Prop() private comments!: object[];
  @Prop() private downvotes!: number;
  @Prop() private redditVideo!: string;
  @Prop() private selfText!: string;
  @Prop() private title!: string;
  @Prop() private type!: string;
  @Prop() private upvotes!: number;
  @Prop() private url!: string;

  private reader: any;
  private width: number = 0;
  private writer: any;

  public getContainerWidth() {
    const { container }: { container: { offsetWidth: number }} = this.$refs;

    if (container && this.width !== container.offsetWidth) {
      this.width = container.offsetWidth;
    }
  }

  private updated() {
    this.getContainerWidth();
  }

  get audioURL(): string {
    return this.redditVideo.replace(/DASH.*$/, 'audio');
  }

  get isYoutubeVideo(): boolean {
    return !this.url.startsWith('https://www.youtube.com/channel') &&
      (this.url.startsWith('https://www.youtube.com/') || this.url.startsWith('https://youtu.be/'));
  }

  get videoSource(): string {
    if (this.type === 'hosted:video') {
      return this.redditVideo;
    }
    return this.url;
  }

  get renderedSelfText(): string {
    return parseMarkdown(this.selfText);
  }

  get youtubeEmbeddedUrl(): string {
    const autoplay = `${this.url.includes('?') ? '&' : '?'}autoplay=1`;
    const url: any = new URL(this.url);
    let id = url.searchParams.get('v') || url.searchParams.get('video');

    if (!id && url.origin === 'https://youtu.be') {
      id = url.toString().match(/https:\/\/youtu\.be\/([0-9a-zA-Z_-]+)/)[1];
    }

    if (!id) {
      const matches = decodeURIComponent(url.toString()).match(/watch\?v=([0-9a-zA-Z_-]+)&/);

      if (matches) {
        id = matches[1];
      }
    }

    return `https://youtube.com/embed/${id}?autoplay=1`;
  }
}
</script>

<style lang="stylus">
.post
  background-color #000
  img
    max-width 100%
    max-height 100%
  h2, h3
    font-weight 400
  h3
    font-size 16px
  header
    padding-top 5px

.default-padding
  padding-left 20px
  padding-right 20px

.self-text
  font-size 14px
  font-weight 400
  line-height 1.6
  max-width 800px

  a
    color #099be4
    font-weight 400
    text-decoration none

  pre
    display block
    line-height 1.6
    overflow auto
    width 100%

#main.night-mode .post
  pre
    background-color #363636
    overflow auto
</style>