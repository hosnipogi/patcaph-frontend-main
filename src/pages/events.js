import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"

const events = () => {
  return (
    <>
      <SEO title="Events" />
      <div>
        <h3>No upcoming events!</h3>
        <Link to="/" className="text-blue-500 hover:underline">
          &larr; Come back later
        </Link>
      </div>
    </>
  )
}

export default events
