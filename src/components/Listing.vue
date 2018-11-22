<template>
  <div class="listing">
    <ul>
      <li v-for="item in items" :key="item.id">
        <ListItem
          :author="item.author"
          :id="item.id"
          :onClick="handleClickPost"
          :subreddit="item.subreddit"
          :thumbnail="item.thumbnail"
          :title="item.title"
          :type="item.type"
        />
      </li>
    </ul>
    <content>
      <Post
        :downvotes="post.downvotes"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListItem from './ListItem.vue';
import Post from './Post.vue';

@Component({
  components: { ListItem, Post },
})
export default class Listing extends Vue {
  private items: object[] = [];
  private post: object = {};

  public handleClickPost(id: string) {
    this.getPost(id);
  }

  public getPost(id: string = '7mjw12') {
    const post = this.items.find((item) => item.id === id) || {};

    this.post = {};
    setTimeout(() => this.post = post);

// fetch(`https://www.reddit.com/comments/${id}.json`)
    //   .then((res) => res.json())
    //   .then((results) => {
    //     const data = results[0].data.children[0].data;
    //     this.post = {
    //       category: data.category,
    //       commentCount: data.num_comments,
    //       downvotes: data.downs,
    //       isMediaOnly: data.media_only,
    //       isMeta: data.isMeta,
    //       isRedditMedia: data.is_reddit_media_domain,
    //       isVideo: data.is_video,
    //       linkFlair: data.link_flair_text,
    //       media: data.media,
    //       nsfw: data.over_18,
    //       postType: data.post_hint,
    //       selfText: data.selftext,
    //       title: data.title,
    //       type: data.is_self ? 'self' : data.url.match(/\.gifv/) ? 'video' : 'image',
    //       upvotes: data.ups,
    //       url: data.url.replace(/\.gifv$/, '.mp4'),
    //     };
    //   });
  }

  private mounted() {
    fetch('https://www.reddit.com/top.json?limit=50')
      .then((res) => res.json())
      .then((results) => {
        this.items = results.data.children.map((result: any) => ({
          author: result.data.author,
          category: result.data.category,
          commentCount: result.data.num_comments,
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
          selfText: result.data.selftext,
          subreddit: result.data.subreddit_name_prefixed,
          thumbnail: result.data.thumbnail,
          title: result.data.title,
          type: result.data.post_hint !== 'link' ? result.data.post_hint :
            result.data.url.match(/\.gifv/) ? 'video' : 'link', // TODO need to clean this up
          upvotes: result.data.ups,
          url: result.data.url.replace(/\.gifv$/, '.mp4'),
        }));
        this.getPost(results.data.children[0].data.id);
      });
  }
}
</script>

<style lang="stylus">
h2
  font-family "Product Sans"
  font-weight 400

li
  list-style none

.listing
  display grid
  grid-template-columns 2fr 3fr

.listing > ul
  height calc(100vh - 40px)
  margin 0
  max-width 500px
  min-width 350px
  overflow-y auto
  padding 0

content
  max-height calc(100vh - 40px)
  overflow hidden auto
</style>
