import React from 'react';

import Main from './Main'

const SearchBar = ({ handleKeyPress, change }) => {
  return (<nav class=" navbar-fixed-top">
    <div className="container margin-left" >
      <form className="card my-6"
        onKeyUp={(e) => handleKeyPress(e)}
        onSubmit={(e) => e.preventDefault()}>
        <div className="card-body row no-gutters align-items-center">

          <div className="col">
            <input className="form-control form-control-lg form-control-borderless" type="search"
              placeholder="Search ..." onChange={(e) => { e.preventDefault(); change(e) }} />
          </div>
        </div>
      </form>

    </div>
  </nav>)
}


const Footer = () => {
  return (<footer>
    <p>Weather Data from <a href="https://openweathermap.org" target="_blank">Openweathermap.org</a></p>
  </footer>)
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      APIKey: '9801116366b39f0b265a8bcd3d184e55',
      forecast: {},
      query: '',
      date: new Date().toDateString,
      wallpaper: "",
      error: String
    }
  }

  componentDidMount() {
    this.query()
  }

  onChange = (e) => {
    this.setState({ query: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      e.target.value = ''
      this.query() 
    }
  }

  query = () => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.query + '&APPID=' + this.state.APIKey
    console.log(url)
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(response => {
        this.fetch(response)
      }).then(() => {
        this.setState({ wallpaper: this.wallpaper(this.state.forecast.icon) })
        this.child.changeUnit()
      })
      .catch(error => {
        console.log(error.message)
        this.setState({ error: error.message });
      })
  }

  wallpaper = (icon) => {

    if (icon == "01d") {
      return "clear"
    }
    if (icon == "02d") {
      return "clouds"
    }

    if (icon == "03d") {
      return "scattered"
    }

    if (icon == "04d") {
      return "broken"
    }

    if (icon == "09d") {
      return "shower"
    }
    if (icon == "10d") {
      return "rain"
    }

    if (icon == "11d") {
      return "thunderstorm"
    }

    if (icon == "13d") {
      return "snow"
    }

    if (icon == "50d") {
      return "mist"
    }

    if (icon == "01n" || icon == "02n" || icon == "03n" || icon == "04n", icon == "09n" || icon == "10n" || icon == "11n" || icon == "13n" || icon == "50n") {
      return "night"
    }
  }

  fetch = (forecast) => {
    let weather = forecast.weather[0]
    let main = forecast.main
    let info = weather.main
    let sys = forecast.sys
    let code = sys.country.toLowerCase()
    let description = weather.description
    let icon = weather.icon
    let temp = main.temp
    let city = forecast.name
    let dailyForecast = { info: info, description: description, icon: icon, temp: temp, city: city, code: code }
    this.setState({ forecast: dailyForecast });
  }

  formatDate = () => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString([], options);
  }

  render() {
    return (
      <div className={this.state.wallpaper}>
        <SearchBar change={this.onChange} handleKeyPress={this.handleKeyPress} />
        <Main forecast={this.state.forecast} query={this.state.query} date={this.formatDate()} onRef={ref => (this.child = ref)}/>
        <Footer />
      </div>
    );
  }
}

export default App;
