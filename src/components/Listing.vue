<template>
  <div class="listing">
    <ul>
      <li v-for="item in items" :key="item.permalink">
        <ListItem
          :author="item.author"
          :subreddit="item.subreddit"
          :thumbnail="item.thumbnail"
          :title="item.title"
        />
      </li>
    </ul>
    <content>
      <h3>Content goes here</h3>
    </content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListItem from './ListItem.vue';

@Component({
  components: { ListItem },
})
export default class Listing extends Vue {
  private items: string[] = [];

  private mounted() {
    fetch('https://www.reddit.com/top.json?limit=15')
      .then((res) => res.json())
      .then((results) => {
        this.items = results.data.children.map((result: any) => ({
          author: result.data.author,
          downvotes: result.data.downs,
          permalink: result.data.permalink,
          selfText: result.data.selftext,
          subreddit: result.data.subreddit_name_prefixed,
          thumbnail: result.data.thumbnail,
          title: result.data.title,
          upvotes: result.data.ups,
        }));
      });
  }
}
</script>

<style lang="stylus">
li
  list-style none

.listing
  display grid
  grid-template-columns 2fr 3fr
</style>
