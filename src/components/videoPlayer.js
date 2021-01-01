import PropTypes from "prop-types"
import React from "react"
import ReactPlayer from "react-player/youtube"

const VideoPlayer = ({ url }) => (
  <div className="my-10 player-wrapper h-96">
    <ReactPlayer
      className="react-player"
      url={url}
      width="100%"
      height="100%"
      light={true}
    />
  </div>
)

VideoPlayer.propTypes = {
  url: PropTypes.string,
}

export default VideoPlayer
