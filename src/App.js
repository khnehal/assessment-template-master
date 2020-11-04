import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './components/dashboard.jsx';
import './App.css';

import { getCountries, getCountryCapitalData } from './actions/simpleAction';

class App extends Component {

  componentWillMount() {
    this.props.getCountries();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> Countries </p>
          <Dashboard 
              countries={this.props.countries} 
              capitalDetails={this.props.capitalDetails}
              getCountryCapitalData={this.props.getCountryCapitalData}
          />
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    countries: state.simpleReducer.countries || [],
    capitalDetails: state.simpleReducer.capitalDetails || [],
})

const mapDispatchToProps = dispatch => ({
    getCountries: () => dispatch(getCountries()),
    getCountryCapitalData: (name) => dispatch(getCountryCapitalData(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
