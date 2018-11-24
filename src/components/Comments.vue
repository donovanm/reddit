<template>
  <div class="comments">
    <ul class="comments-list">
      <li v-for="comment in comments" :key="comment.id">
        <Comment :comment="comment" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Comment from './Comment.vue';

@Component({
  components: { Comment },
})
export default class Comments extends Vue {
  @Prop() private comments!: object[];
}
</script>

<style lang="stylus">
.comments
  margin-left 20px
  ul
    padding-left 0
  li ul
    padding-left 25px
  .comments
    border-left 2px solid #efefef
    margin-left 0
</style>
