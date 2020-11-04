export default (state = {}, action) => {
 
	switch (action.type) {
		case 'GET_COUNTRIES':
			return {
				...state,
				countries: action.payload
			};

		case 'GET_CAPITAL_DATA':
			return {
				...state,
				capitalDetails: action.payload
			};
			
		default:
			return state
	}

}
