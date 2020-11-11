const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b0f8be7a00470f36ab4a53d7f651e392&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to location services! ', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search. ', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress . It feels like ' + body.current.feelslike + ' degrees' + ' and the humidity is '  +body.current.humidity + ' degree. '+ ' The local time is '+  body.current.observation_time +  'Time of day is ' + body.current.is)
            // (undefined, body.location.timezone_id)
        }

        })   
        
    }



module.exports = forecast