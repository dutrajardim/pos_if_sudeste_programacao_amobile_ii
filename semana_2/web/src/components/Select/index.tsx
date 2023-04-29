import React from 'react'

import './styles.css'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: Array<{ value: string, label: string }>
}

export default function Select({ name, label, options, ...rest }: Props) {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select defaultValue='' id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}