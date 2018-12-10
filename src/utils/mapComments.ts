export default function mapComments({ data: comment }: any) {
  return ({
    author: comment.author,
    body: comment.body_html,
    created: comment.created_utc,
    downvotes: comment.downs,
    edited: comment.edited,
    id: comment.id,
    isOP: comment.is_submitter,
    replies: comment.replies,
    upvotes: comment.ups,
  });
}
