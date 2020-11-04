import React from "react";
  
class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filterByName: '',
      filterByCode: '',
      type: null,
    };
  }

  sortCountries = (type) => {
    let sortedCountries = [...this.props.countries];
    const isAscending = (type==='asc');
    
    if (type!== null) {
      sortedCountries.sort((a, b) => {
        if (a.population < b.population) {
          return isAscending ? -1 : 1;
        }
        if (a.population > b.population) {
          return isAscending ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedCountries;
  }

  render() {
    const { filterByName, filterByCode, type } = this.state;

    let countryList = this.sortCountries(type);

    if (filterByName.length > 0) {
      countryList = countryList.filter((elem) => { return (elem.name || '').toLowerCase().startsWith((filterByName || '').toLowerCase())})
    }
    if (filterByCode.length > 0) {
      countryList = countryList.filter((elem) => { return (elem.numericCode || '').includes(filterByCode || '')})
    }

    return (
      <div className="dashboard-table">
        <div>
          <input className="form-control" 
            placeholder="Filter by name..." 
            value={filterByName} 
            onChange={(e) => { this.setState({ filterByName: e.target.value }) }} 
          />
        </div>

        <div className="mb-15">
          <input className="form-control" 
            placeholder="Filter by code..." 
            value={filterByCode} 
            onChange={(e) => { this.setState({ filterByCode: e.target.value }) }} 
          />
        </div>
        
        <div className="mb-15">
          <button onClick={() => this.setState({ type: 'asc' })}> Sort Ascending </button>
          <button onClick={() => this.setState({ type: 'desc' })}> Sort Descending </button>
          {
            !!(type || filterByName || filterByCode) &&
            <button className="close" 
              onClick={() => this.setState({ type: null, filterByName: '', filterByCode: '' }) }
            >&times; Clear </button> 
          }
        </div>

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Capital</th>
              <th>Population</th>
              <th>Language</th>
              <th>Currencies</th>
            </tr>
          </thead>
          <tbody>
            {(countryList || []).length===0 &&
              <tr>
                No Results found.
              </tr>
            }
            {(countryList).map((country, index) => {
              return <tr key={country.name}>
                <td>{country.numericCode}</td>
                <td>
                  <div 
                      // onClick={() => this.props.getCountryCapitalData(country.capital)}
                  >
                    <img src={country.flag} alt="flag" width='20' height='20' /> {country.name}
                  </div>
                </td>
                <td>{country.capital}</td>
                <td>{country.population}</td>
                <td>{(country.languages || []).map(el => { return <div> {el.name} ({el.nativeName}) </div> })}</td>
                <td>{(country.currencies || []).map(el => { return <div className="mb-15"> {el.name} <div>Code: {el.code}</div> <div>Symbol: {el.symbol}</div> </div> })}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
