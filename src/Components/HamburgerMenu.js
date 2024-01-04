import React from "react";

export function HamburgerMenu({ strokeColor, onClick }) {
    return(
        <div className="hamburger-menu" onClick={onClick}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L4 7" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
            <path d="M20 12L4 12" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
            <path d="M20 17L4 17" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </div>
    )
}