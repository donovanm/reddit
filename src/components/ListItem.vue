<template>
  <div class="list-item" @click="handleClick">
    <h3><a>{{title}}</a><span class="post-type">{{type || 'self'}}</span></h3>
    <div class="thumbnail">
      <img :src="thumbnail" v-if="thumbnailVisible" />
      <div v-if="nsfw" class="thumbnail-nsfw">
        NSFW
      </div>
    </div>
    <div class="author">by {{author}}</div>
    <div class="subreddit">
      <span class="domain">{{domain}}</span>
      <a :href="subreddit">{{subreddit}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  @Prop() private author!: string;
  @Prop() private domain!: string;
  @Prop() private id!: string;
  @Prop() private nsfw!: boolean;
  @Prop() private onClick!: (id: string) => void;
  @Prop() private subreddit!: string;
  @Prop() private thumbnail!: string;
  @Prop() private title!: string;
  @Prop() private type!: string;

  public handleClick() {
    this.onClick(this.id);
  }

  get thumbnailVisible() {
    return this.thumbnail !== 'default' && this.thumbnail !== 'self' && this.thumbnail !== 'nsfw';
  }
}
</script>

<style lang="stylus">
#main .list-item
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

  .domain
    color #7e7e7e
    font-style normal
    margin-right 15px

.post-type
  background-color #eee
  border-radius 3px
  color #333
  font-size 70%
  margin-left 10px
  padding 2px 10px

.thumbnail-nsfw
  background-color #f5f5f5
  border-radius 4px
  color orangered
  padding 30px 0
  text-align center
  width 140px

#main.night-mode
  .list-item
    border-color #555
    a
      color: white
</style>
