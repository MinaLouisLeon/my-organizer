const initialState = {
  allProjects: [],
  links: [],
  editProject: [
    {
      id: 0,
      data: [],
    },
  ],
  openProject : [
    {
      id : 0,
      data : []
    }
  ]
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setAllProjects":
      return {
        ...state,
        allProjects: action.payload,
      };
    case "setProjectsLinks":
      return {
        ...state,
        links: action.payload,
      };
    case "setEditProject":
      return {
        ...state,
        editProject: [
          {
            id: action.id,
            data: action.data,
          },
        ],
      };
    case "clearEditProject" :
        return{
            ...state,
            editProject : [
                {
                    id : 0,
                    data : []
                }
            ]
        }
    case "setOpenProject" :
      return{
        ...state,
        openProject : [
          {
            id : action.id,
            data : action.data,
          }
        ]
      }
    case "clearOpenProject" :
      return{
        ...state,
        openProject : [
          {
            id : 0,
            data : []
          }
        ]
      }
    case "loggedOut":
      return {
        ...state,
        links: [],
        allProjects: [],
        editProject : [
            {
                id : 0,
                data : []
            }
        ],
        openProject : [
          {
            id : 0,
            data : []
          }
        ]
      };
    default:
      return state;
  }
};

export default projectsReducer;
