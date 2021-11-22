import React from "react";
import '../App.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Search() {

    const MY_KEY = 'AIzaSyDRArBEbALIFDhVUV9jrpNgSGdbRW4j_hU';
    const tlv_latitude = '32.08088';
    const tlv_longtitude = '34.78057';
    const axios = require('axios');

    const [selectedCity, setSelectedCity] = React.useState('');
    
    const fetchPlacesAxios = () => {
        const config = {
            method: 'get',
            mode: 'cors',
            url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${tlv_latitude}%2C${tlv_longtitude}&radius=1500&type=restaurant&keyword=cruise&key=${MY_KEY}`,
            headers: { 
            // "Content-Type":"application/json",
            // "Access-Control-Allow-Origin": '*',
            // "Access-Control-Allow-Methods": 'GET'
            }
          };
          
        return axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
    
    }
    const fetchPlaces = () => {
        
        return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${tlv_latitude}%2C${tlv_longtitude}&radius=1500&type=restaurant&keyword=cruise&key=${MY_KEY}`, {
                    mode: 'cors',
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        // "Content-Type":"application/json",
                        // "Access-Control-Allow-Origin": '*',
                        // "Access-Control-Allow-Methods": 'GET'
                    }
                })
                .then((res) => {
                    if (res.status.OK) {
                        console.log(JSON.stringify(res.results))
                    }
                    console.log('Not Ok')
                })
                .catch((err) => {
                    console.log(err)
                })
    }

    
    React.useEffect(() => {
        onSelect()
    }, [selectedCity])

    function onSelect() {
        console.log(selectedCity)
    }

    return (
        <div className="search-bar">
            <GooglePlacesAutocomplete
                  apiKey={MY_KEY}
                  autocompletionRequest={{
                    componentRestrictions:{
                        country: 'il'
                    },
                  }}
                  selectProps={{
                    selectedCity,
                    onChange: setSelectedCity,
                  }}
                />
        </div>
    );
}