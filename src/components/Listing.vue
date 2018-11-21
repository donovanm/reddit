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
  private items: string[] = [];
  private post: string[] = [];

  public handleClickPost(id: string) {
    this.getPost(id);
  }

  public getPost(id: string = '7mjw12') {
    this.post = {};
    fetch(`https://www.reddit.com/comments/${id}.json`)
      .then((res) => res.json())
      .then((results) => {
        const data = results[0].data.children[0].data;
        this.post = {
          downvotes: data.downs,
          selfText: data.selftext,
          title: data.title,
          type: data.url.match(/\.gifv/) ? 'video' : 'image',
          upvotes: data.ups,
          url: data.url.replace(/\.gifv$/, '.mp4'),
        };
      });
  }

  private mounted() {
    fetch('https://www.reddit.com/top.json?limit=50')
      .then((res) => res.json())
      .then((results) => {
        this.items = results.data.children.map((result: any) => ({
          author: result.data.author,
          downvotes: result.data.downs,
          id: result.data.id,
          permalink: result.data.permalink,
          selfText: result.data.selftext,
          subreddit: result.data.subreddit_name_prefixed,
          thumbnail: result.data.thumbnail,
          title: result.data.title,
          upvotes: result.data.ups,
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
  height: 100vh
  margin: 0
  min-width 400px
  overflow-y: auto

</style>
