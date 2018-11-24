export default function mapComments({ data: comment }: any) {
  return ({
    author: comment.author,
    body: comment.body, // there's also body_html
    created: comment.created,
    downvotes: comment.downs,
    id: comment.id,
    replies: comment.replies, // will use this in the future
    upvotes: comment.ups,
  });
}
