import React from 'react'

export default function Button({ action, text, className, type }) {
    return (
        <button  type={type} className={className} onClick={action}>{text}</button>
    )
}
