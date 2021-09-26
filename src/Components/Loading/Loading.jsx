import { IonProgressBar } from '@ionic/react';

const Loading = ({title}) => {
    return(
        <div className='loading-container'>
            <p className='fw6 blue'>{title}</p>
            <IonProgressBar color='primary' type='indeterminate' />
        </div>
    )
}

export default Loading;