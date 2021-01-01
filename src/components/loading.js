import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { LoadingIcon as Icon } from "./icons"
import { styled } from "twin.macro"

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: "1rem",
  paddingBottom: "5rem",
}

const LoadingIcon = styled(Icon)`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
  color: #3f83f8;

  animation: spin 1s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const Loading = ({ inline }) => {
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimedOut(true)
    }, 12000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ ...containerStyle, height: !inline ? "85vh" : "100%" }}>
      {!timedOut ? (
        <LoadingIcon />
      ) : (
        <div className="text-sm">Timeout. Please reload page</div>
      )}
    </div>
  )
}

Loading.propTypes = {
  inline: PropTypes.bool,
}
Loading.defaultProps = {
  inline: true,
}

export default Loading
