import { IonButton, IonInput, IonItem, IonList } from '@ionic/react';
import { useState } from 'react';

const AddProject = () => {

    const [name,setName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <IonList>
                <IonItem>
                    <IonInput
                        type='text'
                        placeholder='Enter Project Name'
                        clearInput={true}
                        autofocus={true}
                        value={name}
                        onIonChange={(e) => setName(e.detail.value)}
                    />
                    <IonButton slot='end' type='submit'>
                        Add Project
                    </IonButton>
                </IonItem>
            </IonList>
        </form>
    )
}

export default AddProject;