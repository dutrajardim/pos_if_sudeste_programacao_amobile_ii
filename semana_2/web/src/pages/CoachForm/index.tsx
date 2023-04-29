import React, { FormEvent } from 'react'

import warningIcon from '../../assets/images/icons/warning.svg'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'

import './styles.css'
import { useNavigate } from 'react-router-dom'

const emptyScheduleItem = { week_day: 0, from: '', to: '' }

export default function CoachForm() {

  const [name, setName] = React.useState('')
  const [avatar, setAvatar] = React.useState('')
  const [whatsapp, setWhatsapp] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [cost, setCost] = React.useState('')
  const [scheduleItems, setScheduleItems] = React.useState([emptyScheduleItem])

  const navigate = useNavigate()

  const handlerAddScheduleItem = () => setScheduleItems([...scheduleItems, emptyScheduleItem])
  const setScheduleItemValue = (position: number, field: string, value: string) => setScheduleItems(scheduleItems.map((scheduleItem, index) => (index === position) ? ({ ...scheduleItem, [field]: value }) : scheduleItem))

  const handleCreateClass = (event: FormEvent) => {
    event.preventDefault()

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      navigate('/')
    }).catch(() => {
      alert('Erro no cadastro!')
    })
  }

  return (
    <div id="page-coach-form" className="container">
      <PageHeader
        title="Que incrível que você quer ensinar algo."
        description="O primeiro passo é preencher esse formulário de inscrição." >


        <main>
          <form onSubmit={handleCreateClass}>

            <fieldset>
              <legend>Seus dados</legend>

              <Input name='name' label='Nome completo' value={name} onChange={({ target }) => setName(target.value)} />
              <Input name='avatar' label='Avatar' value={avatar} onChange={({ target }) => setAvatar(target.value)} />
              <Input name='whatsapp' label='Whatsapp' value={whatsapp} onChange={({ target }) => setWhatsapp(target.value)} />
              <Textarea name='bio' label='Biografia' value={bio} onChange={({ target }) => setBio(target.value)} />

            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>

              <Select
                name='subject'
                label='Matéria'
                defaultValue={subject}
                onChange={({ target }) => setSubject(target.value)}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciáncias', label: 'Ciáncias' },
                  { value: 'Educação física', label: 'Educação física' },
                  { value: 'Física', label: 'Física' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'Histária', label: 'Histária' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Portugués', label: 'Portugués' },
                  { value: 'Química', label: 'Química' }
                ]} />
              <Input name='cost' label='Custo da sua hora por aula' value={cost} onChange={({ target }) => setCost(target.value)} />

            </fieldset>

            <fieldset>
              <legend>
                Horários disponíveis
                <button type='button' onClick={handlerAddScheduleItem}>+ Novo horário</button>
              </legend>

              {scheduleItems.map(({ week_day, from, to }, key) => (
                <div className="schedule-item" key={key}>
                  <Select
                    name='week_day'
                    label='Dia da semana'
                    defaultValue={week_day}
                    onChange={({ target }) => setScheduleItemValue(key, 'week_day', target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' }
                    ]} />
                  <Input name='from' label='Das' type='time' value={from} onChange={({ target }) => setScheduleItemValue(key, 'from', target.value)} />
                  <Input name='to' label='Até' type='time' value={to} onChange={({ target }) => setScheduleItemValue(key, 'to', target.value)} />
                </div>
              ))}

            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <button type="submit">Salvar cadastro</button>
            </footer>
          </form>

        </main>
      </PageHeader>
    </div>
  )
}