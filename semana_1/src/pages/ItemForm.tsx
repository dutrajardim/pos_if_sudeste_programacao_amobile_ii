import React, { useContext, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { closeCircle } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';
import { TodoContext } from '../context/TodoContext';
import { TodoContextType } from '../@types/todo';

const ItemForm: React.FC = () => {

  const [key, setKey] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const { search } = useLocation()

  useIonViewWillEnter(() => {
    const queryParams = new URLSearchParams(search)
    setKey(queryParams.get('key'))
    setTitle(queryParams.get('title') || "")
    setDescription(queryParams.get('description') || "")
  })

  let history = useHistory()
  const { saveTodo, updateTodo } = useContext(TodoContext) as TodoContextType

  const saveItem = () => {
    if (key == null) {
      saveTodo({ title, description })
    }
    else {
      updateTodo(Number(key), { title, description })
    }
    history.goBack()
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color={"secondary"}>
          <IonTitle>{key == null ? 'Add Item' : 'Update Item'}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink='/home' routerDirection='back'>
              <IonIcon slot='icon-only' icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>Title</IonLabel>
            <IonInput type='text' value={title}
              onIonInput={e => setTitle(e.target.value?.toString() || "")} />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Description</IonLabel>
            <IonInput type='text' value={description}
              onIonInput={e => setDescription(e.target.value?.toString() || "")} />
          </IonItem>
        </IonList>
        <IonButton expand='full' color={'secondary'} onClick={() => saveItem()}>Save</IonButton>
      </IonContent>

    </IonPage>
  )
}

export default ItemForm