import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ article }) => {
  const disqusShortname = "followmytripcomment"
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/article/${article.slug}`,
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
