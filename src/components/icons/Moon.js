import * as React from "react";

function SvgMoon(props) {
    return (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
    );
}

export default SvgMoon;
