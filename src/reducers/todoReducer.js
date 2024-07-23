import axios from "axios"

const initState = {
    loading: false,
    todoList: [],
    error: '',
    addToDoItemResponse: '',
    removeTodoItemResponse: '',
    updateToDoItemResponse: '',
    closeEditTab: false,
    getUserByIdResponse: '',
}

 // LOAD_ALL_TODOS Actions 
const GET_USER_BY_ID = 'GET_USER_BY_ID'
function getUserById() {
    return {
        type: GET_USER_BY_ID,
        info: 'load Todos function' 
    }
}

const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS'
const getUserByIdSuccess = response => {
    return {
        type: GET_USER_BY_ID_SUCCESS,
        payload: response.data,
        response: response 
    }
}

const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE'
const getUserByIdFailure = error => {
    return {
        type: GET_USER_BY_ID_FAILURE,
        error: error 
    }
}

// LOAD_ALL_TODOS Actions 
const LOAD_ALL_TODOS = 'LOAD_ALL_TODOS'
function loadAllTodos() {
    return {
        type: LOAD_ALL_TODOS,
        info: 'load Todos function' 
    }
}

const LOAD_ALL_TODOS_SUCCESS = 'LOAD_ALL_TODOS_SUCCESS'
const loadAllTodosSuccess = todoList => {
    return {
        type: LOAD_ALL_TODOS_SUCCESS,
        payload: todoList 
    }
}

const LOAD_ALL_TODOS_FAILURE = 'LOAD_ALL_TODOS_FAILURE'
const loadAllTodosFailure = error => {
    return {
        type: LOAD_ALL_TODOS_FAILURE,
        error: error 
    }
}


// ADD_TODO_ITEM Actions 
const ADD_TODO_ITEM = 'ADD_TODO_ITEM'
function addTodoItemDefault() {
    return {
        type: ADD_TODO_ITEM,
        info: 'load Todos function' 
    }
}

const ADD_TODO_ITEM_SUCCESS = 'ADD_TODO_ITEM_SUCCESS'
const addTodoItemSuccess = (todoList, response) => {
    // debugger;
    return {
        type: ADD_TODO_ITEM_SUCCESS,
        payload: todoList ,
        response: response
    }
}

const ADD_TODO_ITEM_FAILURE = 'ADD_TODO_ITEM_FAILURE'
const addTodoItemFailure = error => {
    return {
        type: ADD_TODO_ITEM_FAILURE,
        error: error 
    }
}

// REMOVE_TODO_ITEM Actions 
const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM'
function removeTodoItemDefault() {
    return {
        type: REMOVE_TODO_ITEM,
        info: 'load Todos function' 
    }
}

const REMOVE_TODO_ITEM_SUCCESS = 'REMOVE_TODO_ITEM_SUCCESS'
const removeTodoItemSuccess = response => {
    // debugger;
    return {
        type: REMOVE_TODO_ITEM_SUCCESS,
        response: response 
    }
}

const REMOVE_TODO_ITEM_FAILURE = 'REMOVE_TODO_ITEM_FAILURE'
const removeTodoItemFailure = error => {
    return {
        type: REMOVE_TODO_ITEM_FAILURE,
        error: error 
    }
}


// UPDATE_TODO_ITEM Actions 
const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM'
function updateTodoItemDefault() {
    return {
        type: UPDATE_TODO_ITEM,
        info: 'load Todos function' 
    }
}

const UPDATE_TODO_ITEM_SUCCESS = 'UPDATE_TODO_ITEM_SUCCESS'
const updateTodoItemSuccess = (todoList, response) => {
    // debugger;
    return {
        type: UPDATE_TODO_ITEM_SUCCESS,
        payload: todoList ,
        response: response,
        closeEditTab: true
    }
}

const UPDATE_TODO_ITEM_FAILURE = 'UPDATE_TODO_ITEM_FAILURE'
const updateTodoItemFailure = error => {
    return {
        type: UPDATE_TODO_ITEM_FAILURE,
        error: error 
    }
}

export const todoReducer = (state = initState, action) => {
    // debugger;
    switch (action.type) {
        case GET_USER_BY_ID:
            return {
                ...state,
                loading: true
            }  
        case GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                getUserByIdResponse: action.response
            }
        case GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            } 
        case LOAD_ALL_TODOS:
            return {
                ...state,
                loading: true
            }  
        case LOAD_ALL_TODOS_SUCCESS:
            return {
                loading: false,
                error: '',
                todoList: action.payload
            }
        case LOAD_ALL_TODOS_FAILURE:
            return {
                loading: false,
                error: action.payload,
                todoList: []
            }   
        case ADD_TODO_ITEM:
            return {
                ...state,
                loading: true
            }  
        case ADD_TODO_ITEM_SUCCESS:
            // debugger;
            return {
                loading: false,
                error: '',
                todoList: action.payload,
                addToDoItemResponse: action.response
            }
        case ADD_TODO_ITEM_FAILURE:
            return {
                loading: false,
                error: action.payload,
                todoList: []
            } 
        case UPDATE_TODO_ITEM:
            return {
                ...state,
                loading: true
            }  
        case UPDATE_TODO_ITEM_SUCCESS:
            // debugger;
            return {
                ...state,
                loading: false, 
                updateToDoItemResponse: action.response
            }
        case UPDATE_TODO_ITEM_FAILURE:
            return {
                loading: false,
                error: action.payload,
                todoList: []
            }       
        case REMOVE_TODO_ITEM:
            return {
                ...state,
                loading: true
            }  
        case REMOVE_TODO_ITEM_SUCCESS:
            // debugger;
            return {
                ...state,
                removeTodoItemResponse: action.response,
                loading: false
            }   
        case REMOVE_TODO_ITEM_FAILURE:
            return {
                loading: false,
                error: action.payload,
                todoList: []
            }                 
        default:
            return state
    }
}

export const getUserByIdFunction =  (userId) => {
    return async function(dispatch) { 
        await dispatch(getUserById()) 
        await axios.get('http://localhost:8080/api/users/id/' + userId).then(
           async response => {
            // debugger;
            // const todoList = response.data.map(todo => todo.id);
            await dispatch(getUserByIdSuccess(response)) 
           }      

        ).catch(async error => {
            // debugger
            await dispatch(getUserByIdFailure(error.message))      
        })   
    }
}

export const loadAllTodosFunction =  () => {
 
    return async function(dispatch) { 
        await dispatch(loadAllTodos())
        await axios.get('http://localhost:8080/api/users/all').then(
           async response => {
            // debugger;
            // const todoList = response.data.map(todo => todo.id);
            await dispatch(loadAllTodosSuccess(response.data)) 
           }      

        ).catch(async error => {
            await dispatch(loadAllTodosFailure(error.message))      
        })   
    }
}

export  const addTodoItem = (newTodoObject) => {
 
    return async function(dispatch) {
        
        await dispatch(addTodoItemDefault())
        
         await axios.post('http://localhost:8080/api/users/create', newTodoObject).then(
            async response => {
            // debugger;
            // const todoList = response.data.map(todo => todo.id);
            await dispatch(addTodoItemSuccess(response.data, response)) 
           }      

        ).catch(async error => {
            await dispatch(addTodoItemFailure(error.message))      
        })   
    }
}

export const removeTodoItem = (newTodoObject) => {
 
    return async function(dispatch) {
        
        await dispatch(removeTodoItemDefault()) 
        await axios.delete('http://localhost:8080/api/users/remove/id/' + newTodoObject.id).then(
            async response  => {
            // debugger;
            // const todoList = response.data.map(todo => todo.id);
            await dispatch(removeTodoItemSuccess(response)) 
           }      

        ).catch(async error => {
            await  dispatch(removeTodoItemFailure(error.message))      
        })   
    }
}
export  const updateTodoItem = (newTodoObject) => {
  
    return async function(dispatch) { 
        await dispatch(updateTodoItemDefault())
        
         await axios.put('http://localhost:8080/api/users/update', newTodoObject).then(
            async response => {
            // debugger;
            // const todoList = response.data.map(todo => todo.id);
            await dispatch(updateTodoItemSuccess(response.data, response)) 
           }      

        ).catch(async error => {
            await dispatch(updateTodoItemFailure(error.message))      
        })   
    }
}
export default todoReducer;  