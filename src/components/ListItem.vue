<template>
  <div class="list-item" @click="handleClick">
    <h3>
      <a>{{title}}</a>
      <img v-if="stickied" class="stickied" src="../assets/sticky2.png" alt="Stickied post" title="Stickied post" />
      <span class="post-type">{{type || 'self'}}</span>
    </h3>
    <div class="info">
      <div class="thumbnail">
        <img :src="thumbnail" v-if="thumbnailVisible" />
        <div v-if="nsfw" class="thumbnail-nsfw">
          NSFW
        </div>
      </div>
      <div>
        <div class="author">by <span>u/{{author}}</span></div>
        <div class="subreddit">
          <a :href="subreddit">{{subreddit}}</a>
          <div class="domain">{{domain}}</div>
        </div>
      </div>
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
  @Prop() private stickied!: boolean;
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

<style scoped lang="stylus">
#main .list-item
  border-bottom 2px solid #ccc
  cursor pointer
  font-size 14px
  padding 5px 10px 5px 0

  &:hover h3 a
    color: #00c1ff

.thumbnail
  img
    border-radius 4px

h3
  font-family "Product Sans"
  font-size 16px
  font-weight 500
  grid-column 1 / -2
  line-height 1.4
  margin 5px 0 15px

.stickied
  display inline-block
  height 15px
  margin-left 5px
  vertical-align middle

.info
  display flex
  flex-direction row-reverse
  justify-content space-between

.author
  color #6d6d6d
  font-weight 400

  span
    color #823535

.subreddit
  font-style italic

  a
    color #38b6ad
    text-decoration none

  .domain
    color #7e7e7e
    font-style normal
    margin-right 15px

.post-type
  background-color #393939
  border-radius 3px
  color 8b8b8b
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
    border-color #4b4b4b
    a
      color: white
</style>
