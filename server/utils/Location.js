const extIP = require("ext-ip")();
const geoip = require('geoip-lite');

// GRABS CORDS BASED OFF IP
class Location {
    static async get(req) {

        const client = req.ip
        console.log(req, "REQ")
        console.log(client, 'CLIENT')
        if (client === '::1' || client === '::ffff:127.0.0.1') {
            try {
                const response = await extIP.get().then(ip => {
                    const locationData = geoip.lookup(ip)
                    const lat = locationData.ll[0];
                    const lon = locationData.ll[1];
                    const { city, state } = locationData
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
                })
                return response;
            } catch (error) {
                console.error(error)
            }
        } else {
            const ip = geoip.lookup(client);
            const { city, state } = ip
            const data = {
                city: city,
                state: state,
                lat: ip.ll[0],
                lon: ip.ll[1],
            }
            return data;
        }
    }

    static async user(args, context) {
        const { latitude, longitude, } = args;
        if (latitude == undefined || longitude == undefined) {
            try {
                const { lat, lon } = await Location.get(context);
                return {
                    latitude: lat,
                    longitude: lon
                }
            } catch (error) {
                console.error("Error occurred while fetching location details", error)
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