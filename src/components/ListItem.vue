<template>
  <div class="list-item" @click="handleClick">
    <h3><a>{{title}}</a><span class="post-type">{{type || 'self'}}</span></h3>
    <div class="thumbnail">
      <img :src="thumbnail" v-if="thumbnail !== 'default' && thumbnail !== 'self'" />
    </div>
    <div class="author">by {{author}}</div>
    <div class="subreddit">
      <a :href="subreddit">{{subreddit}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  @Prop() private author!: string;
  @Prop() private id!: string;
  @Prop() private onClick!: (id: string) => void;
  @Prop() private subreddit!: string;
  @Prop() private thumbnail!: string;
  @Prop() private title!: string;
  @Prop() private type!: string;

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
  font-family "Product Sans"
  font-weight 500
  grid-column 1 / -2
  line-height 1.4

.author
  color #6d6d6d
  font-size 90%
  font-weight 400
  grid-column: span 2

.subreddit
  font-size 80%
  font-style italic
  grid-column span 2
  text-align right

  a
    color #38b6ad
    text-decoration none

.post-type
  background-color #eee
  border-radius 3px
  font-size 70%
  margin-left 10px
  padding 2px 10px
</style>
