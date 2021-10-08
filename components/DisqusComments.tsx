import { DiscussionEmbed } from "disqus-react"
import config from "../config.json"

const DisqusComments = ({ article }) => {
  const disqusShortname = "followmytripcomment"
  const disqusConfig = {
    url: `${config.FRONT_URL}/article/${article.slug}`,
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
