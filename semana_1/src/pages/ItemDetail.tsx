import React from "react"
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { closeCircle } from "ionicons/icons"
import { useLocation } from "react-router"

const ItemDetail: React.FC = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const title = queryParams.get('title')
  const description = queryParams.get('description')

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color={'secondary'}>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home" routerDirection="back">
              <IonIcon slot="icon-only" icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonCard>
          <IonCardContent>
            {description}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default ItemDetail