export const getCountries = () => async dispatch => {
    const data = await getData('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;flag;languages;population;subregion;numericCode;currencies')

	dispatch({
	  type: 'GET_COUNTRIES',
	  payload: data || [],
	})
}

export const getCountryCapitalData = (name) => async dispatch => {
    const data = await getData(`https://restcountries.eu/rest/v2/capital/${name}`);

    dispatch({
      type: 'GET_CAPITAL_DATA',
      payload: data.length > 0 ? data[0] : {},
    })
}


const getData = (url, params={})=> {
    return new Promise((resolve, reject)=> {
        fetch(`${url}`)
        .then((response)=> {
            if(response.status >= 400) {
                response.json().then((data)=>{
                    reject(data);
                })
                return;
            }
            console.log('response', response)
            response.json().then((data)=>{
                resolve(data);
            });
        }).catch((e)=> {
            console.log('ERROR', e);
            reject(e);
        });
    });
};