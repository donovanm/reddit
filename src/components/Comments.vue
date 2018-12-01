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
  font-size 14px

  ul
    padding-left 0
  ul > li
    list-style none
  li ul
    padding-left 20px
  .comments
    border-left 2px solid #efefef
    margin-left 0

#main.night-mode
  .comments .comments
    border-color #2a2a2a
</style>
