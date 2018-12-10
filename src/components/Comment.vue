<template>
  <div class="comment" v-if="comment.author">
    <div class="author">
      <span class="upvotes">{{comment.upvotes}}</span>
      {{comment.author}}
      <span class="op" v-if="comment.isOP">OP</span>
      <span class="comment-info">{{createdTimeAgo}}</span>
      <span v-if="comment.edited" class="comment-info"> (edited {{editedTimeAgo}})</span>
    </div>
    <div class="body" ref="body" v-html="formattedBody" />
    <Comments v-if="hasChildren" :comments="children" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import timeago from 'timeago.js';
import Comments from './Comments.vue';
import convertLinks from '@/utils/convertLinks';
import decodeHTMLEntities from '@/utils/decodeHTMLEntities';
import mapComments from '@/utils/mapComments';

@Component
export default class Comment extends Vue {
  @Prop() private comment!: {
    body: string,
    created: number,
    edited: number | boolean,
    replies: {
      data: {
        children: object[],
      },
    },
  };

  public mounted() {
    convertLinks((this.$refs.body as Element), this.$router);
  }

  public beforeCreate() {
    // This has to be done because of a circular reference
    this.$options.components.Comments = require('./Comments.vue').default;
  }

  get children() {
    return this.comment.replies.data.children.map(mapComments);
  }

  get createdTimeAgo(): string {
    return timeago().format((Number(this.comment.created)) * 1000);
  }

  get editedTimeAgo(): string {
    return timeago().format((Number(this.comment.edited)) * 1000);
  }

  get formattedBody() {
    return decodeHTMLEntities(this.comment.body);
  }

  get hasChildren(): boolean {
    return Boolean(this.comment && this.comment.replies && this.comment.replies.data.children.length);
  }
}
</script>

<style lang="stylus">
.comment
  line-height 1.35
  margin-bottom 10px

  .author
    color #aa4823
    color #d16841

    .op
      background-color #3e88ad
      border-radius 4px
      color white
      display inline-block
      font-size 70%
      font-weight bold
      margin 2px 0
      padding 1px 4px 0
      vertical-align top

    .comment-info
      color #747474
      font-size 80%
      font-style italic
      margin-left 5px

  .body
    font-size 14px
    max-width 500px

  .upvotes
    color #aaa
    padding 0 5px 0 0

    &.upvoted
      color #ff4500

  blockquote
    background-color #1e1e1e
    border-color #565656
    border-style solid
    border-width 1px 0px
    margin-left 0
    padding 5px 10px

    p
      margin 5px 0

  p:first-child
    margin-top 0

</style>
