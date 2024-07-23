import axios from "axios"

const initState = {
    loading: false,
    sensorTypes: [],
    error: ''
}

// LOAD_ALL_SENSOR_TYPES Actions 
const LOAD_ALL_SENSOR_TYPES = 'LOAD_ALL_SENSOR_TYPES'
function loadAllSensorTypes() {
    return {
        type: LOAD_ALL_SENSOR_TYPES,
        info: 'load SensorTypes function' 
    }
}

const LOAD_ALL_SENSOR_TYPES_SUCCESS = 'LOAD_ALL_SENSOR_TYPES_SUCCESS'
const loadAllSensorTypesSuccess = sensorTypes => {
    return {
        type: LOAD_ALL_SENSOR_TYPES_SUCCESS,
        payload: sensorTypes 
    }
}

const LOAD_ALL_SENSOR_TYPES_FAILURE = 'LOAD_ALL_SENSOR_TYPES_FAILURE'
const loadAllSensorTypesFailure = error => {
    return {
        type: LOAD_ALL_SENSOR_TYPES_FAILURE,
        error: error 
    }
}


export const addNewHomeReducer = (state = initState, action) => {
    // debugger;
    // debugger;
    switch (action.type) {
        case LOAD_ALL_SENSOR_TYPES:
            return {
                ...state,
                loading: true
            }  
        case LOAD_ALL_SENSOR_TYPES_SUCCESS:
            return {
                loading: false,
                error: '',
                sensorTypes: action.payload
            }
        case LOAD_ALL_SENSOR_TYPES_FAILURE:
            return {
                loading: false,
                error: action.payload,
                sensorTypes: []
            }
        default:
            return state
    }
}
export const loadAllSensorTypesFunction =  () => {
 
    return async function(dispatch) { 
        await dispatch(loadAllSensorTypes())
        await axios.get('http://localhost:8080/sensor-management/api/sensor-types/all').then(
           async response => {
            // debugger;
            // const sensorTypes = response.data.map(todo => todo.id);
            await dispatch(loadAllSensorTypesSuccess(response.data)) 
           }      

        ).catch(async error => {
            await dispatch(loadAllSensorTypesFailure(error.message))      
        })   
    }
}

export default addNewHomeReducer;