import PropTypes from "prop-types"
import React from "react"
import ReactPlayer from "react-player/youtube"

const VideoPlayer = ({ url }) => (
  <div className="my-4 player-wrapper">
    <ReactPlayer
      className="react-player"
      url={url}
      width="100%"
      height="100%"
    />
  </div>
)

VideoPlayer.propTypes = {
  url: PropTypes.string,
}

export default VideoPlayer
