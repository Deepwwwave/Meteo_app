import React, { Component } from 'react';
import './App.css';


const Nav = ({changeUnit, unit}) => {
    return(<nav id="vertical">
    {/* <button id="locateBtn">
        <i class="fa fa-location-arrow" aria-hidden="true"></i>
    </button> */}
    <button id="unitBtn" data-units={unit} onClick={changeUnit}>{unit}</button>
</nav>)
}


export default class Main extends Component {
    constructor(props) {
        super(props)
        //https://openweathermap.org/weather-conditions
        //http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
        //http://api.openweathermap.org/data/2.5/weather?q=London&APPID=9801116366b39f0b265a8bcd3d184e55
        //EXEMPLE REQUETE => http://api.openweathermap.org/data/2.5/weather?q=sydney&APPID=9801116366b39f0b265a8bcd3d184e55
        this.state = {
            temp: this.celsius(), 
            unit: 'c'
        }
    }
    componentWillReceiveProps()  {
       // this.changeUnit()
    }
    componentDidMount() {
        this.setState({temp: this.celsius()}) 
        this.props.onRef(this)
    }
    changeUnit = () => {
        console.log(this.state.unit)
        this.setState({
            unit: this.state.unit == 'f' ? 'c' : 'f',
            temp: this.state.unit == 'f' ? this.fahrenheit() : this.celsius()})
  
        console.log(this.state.unit)
    }
    celsius = () =>  {
        if ( this.props.forecast.temp != null) { return ( this.props.forecast.temp - 273.15).toFixed(0);}
    }

    fahrenheit = () =>  {
        let celsius =  this.props.forecast.temp - 273.15
        let f = ((celsius * 9) / 5)  + 32
        return f.toFixed(0);
    }

    isEmpty = obj => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        const children = this.props
        const forecast = children.forecast
    
        return (
                <div id="current" class="wrapper">
                    <Nav changeUnit={this.changeUnit} unit={this.state.unit == 'c' ? 'c' : 'f'}/>
                  
                    <h1 class="location">{ this.isEmpty(forecast) ? "" : forecast.city } { this.isEmpty(forecast) ?  "" : <img src={`https://www.countryflags.io/${forecast.code}/flat/48.png`} />}  </h1>
                    <h2 class="date">{children.date}</h2>
                    <div class="weatherIcon">
                        <div class="sunny">
                            <div class="inner"><img src={this.isEmpty(forecast) ? "" : `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`} /></div>
                        </div>
                    </div>
       
                    <p class={this.isEmpty(forecast) ? "" : "temp"}>{ this.isEmpty(forecast) ? "" : this.state.temp}</p>
                    <p class="conditions">{forecast.description}</p>
                </div>
        )
    }
}
