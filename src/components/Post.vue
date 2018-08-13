<template>
  <div class="post">
    <h2>{{title}}</h2>
    <img :src="image" />
    <div>{{selfText}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    author: String,
    selfText: String,
    image: String,
    title: String,
  },
})
export default class Post extends Vue {}
</script>

<style lang="stylus">
.post
  img
    max-width: 100%
    max-height: 100%
</style>