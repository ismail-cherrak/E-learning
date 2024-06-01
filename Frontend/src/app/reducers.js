







// import { combineReducers } from 'redux';

// const initialState = {
//   additionalElements: [],
// };

// const elementsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_ELEMENT': {
//       return {
//         ...state,
//         additionalElements: [...state.additionalElements, action.payload],
//       };
//     }
//     case 'DELETE_ELEMENT': {
//       const indexToDelete = action.payload;
//       return {
//         ...state,
//         additionalElements: state.additionalElements.filter((_, index) => index !== indexToDelete),
//       };
//     }
//     case 'UPDATE_ELEMENT': {
//       const { index, updatedElement } = action.payload;
//       const updatedElements = [...state.additionalElements];
//       updatedElements[index] = updatedElement;
//       return {
//         ...state,
//         additionalElements: updatedElements,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };

// const rootReducer = combineReducers({
//   elements: elementsReducer,
// });

// export default rootReducer;