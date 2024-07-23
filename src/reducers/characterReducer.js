//Reducer for character information Initialize State
const initState = {
    name: "Sunny Xue",
    occupation: "Ninja",
    age: 16,
    length: 170
}

//Define Actions
const characterReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case 'CHANGE_NAMEE':
            return {
                ...state,
                name: action.payload
            }

        case 'CHANGE_OCCUPATION':
            return {
                ...state,
                occupation: action.payload
            }
        case 'CHANGE_AGE':
            return {
                ...state,
                age: action.payload
            }
        case 'CHANGE_LENGTH':
            return {
                ...state,
                length: action.payload
            }
        default:
            return state
    }
}

export default characterReducer;