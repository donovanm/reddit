<template>
  <div class="listing">
    <ul :class="{ loading: isLoadingListing }">
      <li v-for="item in items" :key="item.id" :class="{ active: item.id === postId }">
        <ListItem
          :author="item.author"
          :domain="item.domain"
          :id="item.id"
          :nsfw="item.nsfw"
          :onClick="handleClickPost"
          :stickied="item.stickied"
          :subreddit="item.subreddit"
          :thumbnail="item.thumbnail"
          :title="item.title"
          :type="item.type"
        />
      </li>
    </ul>
    <content :class="{ loading: isLoadingListing }">
      <Post
        :author="post.author"
        :commentCount="post.commentCount"
        :comments="comments"
        :downvotes="post.downvotes"
        :redditVideo="post.redditVideo"
        :selfText="post.selfText"
        :title="post.title"
        :type="post.type"
        :upvotes="post.upvotes"
        :url="post.url"
      />
    </content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ListItem from './ListItem.vue';
import Post from './Post.vue';
import mapComments from '../utils/mapComments';

function parseRedditVideo(data: { secure_media: { reddit_video: { fallback_url: string, hls_url: string }}}): string {
  if (!data.secure_media || !data.secure_media.reddit_video) {
    return '';
  }
  return data.secure_media.reddit_video.fallback_url;
}

@Component({
  components: { ListItem, Post },
})
export default class Listing extends Vue {
  private comments: object[] = [];
  private isLoadingListing: boolean = true;
  private items: object[] = [];
  private post: object = {};
  private postId: string = '';

  @Watch('$route')
  public onSubredditChanged(val: string, oldVal: string) {
    this.getListing();
  }

  get subreddit(): string {
    const subreddit = this.$route.params.subreddit;
    return subreddit ? `r/${subreddit}` : '';
  }

  public handleClickPost(id: string): void {
    this.getPost(id);
  }

  public getPost(id: string = '7mjw12'): void {
    const post = this.items.find((item: any) => item.id === id) || {};

    this.postId = post.id;
    this.post = {};
    setTimeout(() => this.post = post);
    this.getComments(id);
  }

  public getComments(id: string = '7mjw12') {
    this.comments = [];
    fetch(`https://www.reddit.com/comments/${id}.json`)
      .then((res) => res.json())
      .then((results) => {
        const comments = results[1].data.children;
        this.comments = comments.map(mapComments);
      });
  }

  private mounted() {
    this.getListing();
  }

  private getListing() {
    this.isLoadingListing = true;
    fetch(`https://www.reddit.com/${this.subreddit}/best.json?limit=50`)
      .then((res) => res.json())
      .then((results) => {
        this.items = results.data.children.map((result: any) => ({
          author: result.data.author,
          category: result.data.category,
          commentCount: result.data.num_comments,
          domain: result.data.domain,
          downvotes: result.data.downs,
          id: result.data.id,
          isMediaOnly: result.data.media_only,
          isMeta: result.data.isMeta,
          isRedditMedia: result.data.is_reddit_media_domain,
          isVideo: result.data.is_video,
          linkFlair: result.data.link_flair_text,
          media: result.data.media,
          nsfw: result.data.over_18,
          permalink: result.data.permalink,
          redditVideo: parseRedditVideo(result.data),
          selfText: result.data.selftext_html || '',
          stickied: result.data.stickied,
          subreddit: result.data.subreddit_name_prefixed,
          thumbnail: result.data.thumbnail,
          title: result.data.title,
          type: result.data.post_hint !== 'link' ? result.data.post_hint :
            result.data.url.match(/\.gifv/) ? 'video' : 'link', // TODO need to clean this up
          upvotes: result.data.ups,
          url: result.data.url.replace(/\.gifv$/, '.mp4'),
        }));
        this.getPost(results.data.children[0].data.id);
        this.isLoadingListing = false;
      });
  }
}
</script>

<style lang="stylus">
.listing
  display grid
  grid-template-columns 350px 3fr

  & > ul
    background-color #222
    height calc(100vh - 40px)
    margin 0
    opacity 1
    overflow hidden
    padding 0
    transition opacity 0

    &.loading
      opacity 0
      transition opacity 300ms

    li
      box-sizing content-box
      list-style none
      padding 0 20px 0 10px
      width 330px

      &.active
        background-color #29465c80

    &:hover
      overflow-y auto

  content
    max-height calc(100vh - 40px)
    opacity 1
    overflow hidden auto
    transition opacity 0

    &.loading
      opacity 0
      transition opacity 300ms
</style>
