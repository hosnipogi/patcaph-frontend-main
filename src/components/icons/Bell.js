import * as React from "react";

function SvgBell(props) {
    return (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
    );
}

export default SvgBell;
