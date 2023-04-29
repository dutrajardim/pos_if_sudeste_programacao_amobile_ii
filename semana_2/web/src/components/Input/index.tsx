import React from 'react'

import './styles.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export default function Input({ name, label, ...rest }: Props) {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  )
}