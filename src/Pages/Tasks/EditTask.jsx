import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import reactCSS from "reactcss";
import { useSelector , useDispatch } from "react-redux";
import { CirclePicker } from "react-color";
import "./Tasks.css";
import { editTask } from "../../backend/database";
import { actionClearEditTask, actionSetAllTasks, actionSetUrl } from "../../actions";
const EditTask = () => {
    const dispatch = useDispatch();
  const taskId = useSelector((state) => state.tasksReducer.editTask[0].id);
  const taskData = useSelector((state) => state.tasksReducer.editTask[0].data);
  const userUID = useSelector(state => state.loginReducer.userUID);
  const projectId = useSelector(state => state.projectsReducer.openProject[0].id);
  const [name, setName] = useState(taskData.name);
  const [color, setColor] = useState(taskData.color);
  const [note, setNote] = useState(taskData.note);
  const [colorPopoverState, setColorPopoverState] = useState({
    colorShowPopover: false,
    event: undefined,
  });
  const colors = [
    "#f44336",
    "#e91e63",
    "#FA28FF",
    "#880E4F",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  const EditTaskStyles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: color,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
    },
  });

  const handleShowColorPicker = (e) => {
    e.persist();
    setColorPopoverState({
      colorShowPopover: true,
      event: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('taskId',typeof taskId)
    // editTask('Tasks/' + userUID + '/tasks' , taskId.toString(),name,color,note)
    // .then((data) => {
    //     dispatch(actionClearEditTask());
    //     dispatch(actionSetAllTasks(data));
    //     dispatch(actionSetUrl('allTasks'));
    // })
    editTask("Users/" + userUID + "/Projects/" + projectId.toString() + "/tasks",taskId.toString(),name,color,note)
    .then((data) => {
      dispatch(actionClearEditTask());
      dispatch(actionSetAllTasks(data));
      dispatch(actionSetUrl('allTasks'));
    })
  };

  return (
    <IonPage>
      <IonPopover
        event={colorPopoverState.event}
        isOpen={colorPopoverState.colorShowPopover}
        onDidDismiss={() => {
          setColorPopoverState({
            colorShowPopover: false,
            event: undefined,
          });
        }}
      >
        <div className="pa2 ma2">
          <CirclePicker
            circleSpacing={10}
            width={230}
            color={color}
            colors={colors}
            onChange={(e) => setColor(e.hex)}
          />
        </div>
      </IonPopover>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="fw6 black">Edit Task</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger">back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="all-tasks-container">
          <div className="all-tasks-inner-container">
            <form onSubmit={handleSubmit}>
              <IonList className="tc shadow-2">
                <IonItem>
                  <IonLabel position="stacked">Task Name:</IonLabel>
                  <IonInput
                    type="text"
                    clearInput={true}
                    required
                    value={name}
                    onIonChange={(e) => setName(e.detail.value)}
                  />
                </IonItem>
                <IonItem>
                  <div className="color-picker-style">
                    <IonLabel className="pr2">Change Color :</IonLabel>
                    <div
                      style={EditTaskStyles.swatch}
                      onClick={(e) => handleShowColorPicker(e)}
                    >
                      <div style={EditTaskStyles.color} />
                    </div>
                  </div>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Note :</IonLabel>
                  <IonTextarea onIonChange={(e) => setNote(e.detail.value)} ></IonTextarea>
                </IonItem>
                <br />
                <IonButton type="submit">Save</IonButton>
              </IonList>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditTask;
