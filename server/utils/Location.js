const extIP = require("ext-ip")();
const geoip = require('geoip-lite');

// GRABS CORDS BASED OFF IP
class Location {
    static async get(req) {

        const client = req.ip
        if (client === '::1' || client === '::ffff:127.0.0.1') {
            const response = await extIP.get().then(ip => {
                const locationData = geoip.lookup(ip)
                const lat = locationData.ll[0];
                const lon = locationData.ll[1];
                const city = locationData.city;
                const state = locationData.region;
                const data = {
                    city: city,
                    state: state,
                    lat: lat,
                    lon: lon,
                }
                return data
            }, err => {
                console.log(err);
                return
            }).catch(e => {
                console.log(e)
                return
            })
            return response
        } else {
            const ip = geoip.lookup(client);
            const data = {
                city: ip.city,
                state: ip.region,
                lat: ip.ll[0],
                lon: ip.ll[1],
            }
            return data
        }
    }

    static async user(args, context) {
        const { latitude, longitude, } = args
        console.log(`++++LAT LON+++++++`)
        if (latitude == undefined || longitude == undefined) {
            const { lat, lon } = await Location.get(context);
            return {
                latitude: lat,
                longitude: lon
            }
        } else {
            return {
                latitude: latitude,
                longitude: longitude
            }
        }
    };
}


module.exports = Location;