import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api'

interface Props {
  coach: Coach
}

interface Coach {
  id: number
  name: string
  avatar: string
  bio: string
  cost: number
  subject: string
  whatsapp: string
  week_day: number
  from: string
  to: string
}

// utils
const convertMinutesToHourString = (minutes: string) =>
  `${Math.floor(Number(minutes) / 60)}h ${Number(minutes) % 60}min`

export default function CoachItem({ coach: { id, avatar, name, subject, cost, whatsapp, bio, from, to } }: Props) {

  const createNewConnection = () =>
    api.post('connections', { coach_id: id })

  return (
    <article className="coach-item">
      <header>
        <img src={avatar} alt="Caveira" />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>
      <span>{convertMinutesToHourString(from) + ' até ' + convertMinutesToHourString(to)}</span>

      <footer>
        <p>Preço/hora <strong>{Number(cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        <a href={`https://wa.me/${whatsapp}?text=Olá%20`} target='_blank' rel='noopener noreferrer' onClick={createNewConnection}>
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}