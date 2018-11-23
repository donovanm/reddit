<template>
  <div class="comment">
    <div class="author">{{comment.author}}</div>
    <div class="body" v-html="formattedBody" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import parseMarkdown from '../utils/parseMarkdown';

@Component
export default class Comment extends Vue {
  @Prop() private comment!: { body: string };

  get formattedBody() {
    return parseMarkdown(this.comment.body);
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
</style>
