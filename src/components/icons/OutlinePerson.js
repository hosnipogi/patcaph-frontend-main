import * as React from "react";

function SvgOutlinePerson(props) {
    return (
        <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...props}
        >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

export default SvgOutlinePerson;
