<template>
  <div class="comment">
    <div class="author">
      <span class="upvotes">{{comment.upvotes}}</span>
      {{comment.author}}
    </div>
    <div class="body" v-html="formattedBody" />
    <Comments v-if="hasChildren" :comments="children" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Comments from './Comments.vue';
import parseMarkdown from '../utils/parseMarkdown';
import mapComments from '../utils/mapComments';

@Component
export default class Comment extends Vue {
  @Prop() private comment!: { body: string, replies: { data: { children: object[] } } };

  public beforeCreate() {
    // This has to be done because of a circular reference
    this.$options.components.Comments = require('./Comments.vue').default;
  }

  get children() {
    return this.comment.replies.data.children.map(mapComments);
  }

  get formattedBody() {
    return parseMarkdown(this.comment.body || '');
  }

  get hasChildren(): boolean {
    return Boolean(this.comment && this.comment.replies && this.comment.replies.data.children.length);
  }
}
</script>

<style lang="stylus">
.comment
  margin-bottom 10px

  .author
    color #aa4823
    margin-bottom -10px
  .body
    font-size 14px
    max-width 500px
  .upvotes
    color #777
    padding 0 5px 0 0

    &.upvoted
      color #ff4500
</style>
