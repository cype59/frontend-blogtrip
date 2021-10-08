import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ article }) => {
  const disqusShortname = "followmytripcomment"
  const disqusConfig = {
    url: `http://localhost:3000/article/${article.slug}`,
    identifier: article.slug,
    title: article.title,
  }
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
export default DisqusComments
