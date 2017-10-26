/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("buttonweather").addEventListener("click",getweather);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function getweather(){
if(navigator.geolocation)
{

    navigator. geolocation.getCurrentPosition(function(position)
    {
        $("#geoLoc").html("latitude:"+position.coords.latitude + "<br>longitude:"+position.coords.longitude);

        var lat=position.coords.latitude;
        var lon=position.coords.longitude;
        var weatherURL="http://api.openweathermap.org/data/2.5/weather? lat="+lat+"&lon ="+lon+" &APPID=aa4ed1d8179ed086885846f358b66fa1";
        $.getJSON(weatherURL).done(function(data)
        {
            $("#currTemp").html("current temp:"+ data.main.temp);

        });},
                          function(er)
                          {
                            alert(er.message);

                          });

    }
}





function getWeather() {
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        generateTable(xmlhttp.responseText);
                    }
                }

                var city = document.getElementById("CityInput").value;
                var state = document.getElementById("StateInput").value;
 
                xmlhttp.open("GET", "http://api.wunderground.com/api/b6e3b1d7c1e3c28f/conditions/q/" + state + "/" + city + ".json", false);
                xmlhttp.send();         
            }

            function generateTable(responseJSON) {
                var weatherData = JSON.parse(responseJSON);

                var pictureURL = weatherData.current_observation.icon_url;
                var condition = weatherData.current_observation.weather;
                var temperature = weatherData.current_observation.temperature_string;
                var humidity = weatherData.current_observation.relative_humidity;

                document.getElementById("WeatherTable").innerHTML = '<tr><td>Icon</td><td><img src="' + pictureURL + '" /></td></tr>';
                document.getElementById("WeatherTable").innerHTML += '<tr><td>Condition</td><td>' + condition + '</td></tr>';
                document.getElementById("WeatherTable").innerHTML += '<tr><td>Temperature</td><td>' + temperature + '</td></tr>';
                document.getElementById("WeatherTable").innerHTML += '<tr><td>Humidity</td><td>' + humidity + '</td></tr>';
            }
    
