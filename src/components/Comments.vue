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
</style>
