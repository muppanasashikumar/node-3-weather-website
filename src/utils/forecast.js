const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/b01c64d0ea12ccc33cc24138b20502e2/' + latitude + ',' + longitude

    request( {url : url, json : true}, (error,response) => {
        if(error) {
            console.log('Unable to connect to weather service',undefined)
        } else if(response.body.error) {
            console.log('Unable to find location',undefined)
        } else {
            callback(undefined,'It is currently '
            + response.body.daily.data[0].summary 
            + 'It is currently ' 
            + response.body.currently.temperature)
        }
    } )
}

module.exports = forecast