<template>
  <div class="list-item" @click="handleClick">
    <h3><a>{{title}}</a></h3>
    <div class="thumbnail">
      <img :src="thumbnail" v-if="thumbnail != 'default'" />
    </div>
    <div class="author">by {{author}}</div>
    <div class="subreddit">
      <a :href="subreddit">{{subreddit}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    author: String,
    id: String,
    onClick: Function,
    subreddit: String,
    thumbnail: String,
    title: String,
  },
})
export default class ListItem extends Vue {
  public handleClick() {
    this.onClick(this.id);
  }
}
</script>

<style lang="stylus">
.list-item
  border 1px solid #eee
  cursor pointer
  display grid
  grid-template-columns repeat(3, 1fr) auto
  padding 5px 10px

  &:hover h3 a
    color: #00c1ff

.thumbnail
  padding 20px 5px 5px

  img
    border-radius 4px

h3
  font-family Oswald
  font-weight 400
  grid-column 1 / -2;

.author
  font-size 80%
  font-weight 300
  grid-column: span 2;

.subreddit
  font-size 80%
  font-style italic
  grid-column span 2
  text-align right

  a
    color #38b6ad
    text-decoration none
</style>
