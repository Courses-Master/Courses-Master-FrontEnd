import React from 'react'

export default function Button({ action, text, className, type, style }) {
    return (
        <button style={style} type={type} className={className} onClick={action}>{text}</button>
    )
}
