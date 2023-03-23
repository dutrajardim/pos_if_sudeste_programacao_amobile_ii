import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonList, IonItem } from '@ionic/react';
import { addCircle, create, eye, trash } from 'ionicons/icons'
import { ITodo, TodoContextType } from '../@types/todo';
import { TodoContext } from '../context/TodoContext';


const Home: React.FC = () => {

  const getLink = (route: string, item: ITodo, key?: string) =>
    `${route}?${(new URLSearchParams(key ? { ...item, key } : { ...item })).toString()}`

  const { todos, deleteTodo } = useContext(TodoContext) as TodoContextType

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color={"success"}>
          <IonTitle>TO-DO!</IonTitle>
          <IonButtons slot='end'>
            <IonButton routerLink="/item-form" routerDirection='forward' >
              <IonIcon slot="icon-only" icon={addCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonList>
          {todos.map((todo, key) => (
            <IonItem key={key} >
              {todo.title}
              <IonButtons slot='end'>
                <IonButton routerLink={getLink("/item-form", todo, key.toString())} routerDirection='forward' >
                  <IonIcon slot="icon-only" icon={create} />
                </IonButton>
                <IonButton routerLink={getLink("/item-detail", todo)} routerDirection='forward'>
                  <IonIcon slot='icon-only' icon={eye} />
                </IonButton>
                <IonButton onClick={() => deleteTodo(key)}>
                  <IonIcon slot='icon-only' icon={trash} />
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

    </IonPage >
  );
};

export default Home;
