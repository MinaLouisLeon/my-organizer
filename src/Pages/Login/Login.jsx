import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import './Login.css';
import {app} from '../../backend'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
// import { initializeApp } from "firebase/app";
import { useState } from "react";
import { actionLoggedIn } from "../../actions";
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
      e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        console.log(user);
        dispatch(actionLoggedIn(user))
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/user-not-found'){console.log('Wrong Email')}
        else if(errorCode === 'auth/wrong-password'){console.log('Wrong Password')}
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='login-container'>
          <IonCard className='tc shadow-2 ma2 pa2'>
            <form onSubmit={handleSubmit}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Email :</IonLabel>
                  <IonInput
                    required
                    placeholder="Email"
                    type="email"
                    clearInput={true}
                    onIonChange={(e) => setEmail(e.detail.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Password :</IonLabel>
                  <IonInput
                    required
                    placeholder="password"
                    clearOnEdit={true}
                    type="password"
                    onIonChange={(e) => setPassword(e.detail.value)}
                  />
                </IonItem>
              </IonList>
              <IonButton type="submit">Login</IonButton>
            </form>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
