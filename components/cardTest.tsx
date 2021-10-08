import React from "react"
import Link from "next/link"
import MyImage from "./image"

const CardTest = ({ article }) => {
  return (
    <Link as={`/article/${article.slug}`} href={`/article/${article.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <MyImage image={article.image} fullRatio={false} />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.category.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardTest
