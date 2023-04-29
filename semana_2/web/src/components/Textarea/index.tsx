import React from 'react'

import './styles.css'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
}

export default function Textarea({ name, label, ...rest }: Props) {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  )
}