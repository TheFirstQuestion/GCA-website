import React, { Component } from 'react';

import { gapi } from 'gapi-script'

var SCOPE = 'https://www.googleapis.com/auth/drive.file';
var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const API_KEY = "AIzaSyB62kAzqYdxNXg0vWj-kqEo_Ls1BvZJ-mI";

class GoogleDrive extends Component {
  state = {
    name: '',
    googleAuth: ''
  }
  componentDidMount(){
      this.initGapi();
    var script = document.createElement('script');
    //script.onload=this.handleClientLoad;
    script.src="https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }
  
  loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client!');
    console.log(script)
    if(script.getAttribute('gapi_processed')){
      /*console.log('Client is ready! Now you can access gapi. :)');
      if(window.location.hostname==='localhost'){


          gapi.client.load('youtube', 'v3')
        //gapi.client.load("http://localhost:8080/_ah/api/discovery/v1/apis/metafields/v1/rest")
        .then((response) => {
          console.log("Connected to metafields API locally.");
          },
          function (err) {
            console.log("Error connecting to metafields API locally.");
          }
        );
      }*/

      try{
       /* window.gapi.client.init({
            'apiKey': API_KEY,
            'scope': SCOPE,
            'discoveryDocs': [discoveryUrl]
          }).then(() => {
                console.log("IN GOOGLE")

                var parentId = '';//some parentId of a folder under which to create the new folder
                var fileMetadata = {
                'name' : 'New Folder',
                'mimeType' : 'application/vnd.google-apps.folder',
                'parents': [parentId]
                };
                gapi.client.drive.files.create({
                resource: fileMetadata,
                }).then(function(response) {
                switch(response.status){
                    case 200:
                    var file = response.result;
                    console.log('Created Folder Id: ', file.id);
                    break;
                    default:
                    console.log('Error creating the folder, '+response);
                    break;
                    }
                });
        });*/


      /*  gapi.client.init({
            'apiKey': API_KEY,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
        }).then(function() {
            return gapi.client.sheets.spreadsheets.values.get({
                'spreadsheetId': '1ns55-xpCrh6gls5eLvWOpNmyqesjpxnEHe2RyauD1FM',
                 'range': 'Sheet1!A:E'
            });
        }, "failed").then(function(response) { // Code to process the response });
                console.log("IT WORKED")
                console.log(response)
            });*/

            var scraperapiClient = require('scraperapi-sdk')('d3316a379867bbb44fc3a4cab2b132e8')

             scraperapiClient.post('https://sheets.googleapis.com/v4/spreadsheets/1ns55-xpCrh6gls5eLvWOpNmyqesjpxnEHe2RyauD1FM/values/Sheet1!A:E:clear')
            .then(response => {
                console.log("RESPONSE")
                console.log(response);    })
            .catch(error => {
                console.log("ERROR")
                console.log(error)
            });

            /*gapi.client.init({
                'apiKey': API_KEY,
                'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
            }).then(function() {
                return gapi.client.sheets.spreadsheets.values.clear({
                    'spreadsheetId': '1ns55-xpCrh6gls5eLvWOpNmyqesjpxnEHe2RyauD1FM',
                     'range': 'Sheet1!A:E'
                });
            }, "failed").then(function(response) { // Code to process the response });
                    console.log("IT WORKED")
                    console.log(response)
                });*/


      }catch(e){
        console.log(e);
      }
    }
    else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
    }
  }

  initGapi = () => {
    console.log('Initializing GAPI...');
    console.log('Creating the google script tag...');

    const script = document.createElement("script");
    script.onload = () => {
      console.log('Loaded script, now loading our api...')
      // Gapi isn't available immediately so we have to wait until it is to use gapi.
      this.loadClientWhenGapiReady(script);
    };
    script.src = "https://apis.google.com/js/client.js";
    
    document.body.appendChild(script);
  }

/*initClient() {
    window.gapi.client.init({
        'apiKey': "AIzaSyB62kAzqYdxNXg0vWj-kqEo_Ls1BvZJ-mI",
    }).then(function () {
      console.log("IN GOOGLE"      )

      gapi.client.drive.files.list({
            'q': "fileExtension = 'zip' or fileExtension = 'rar' or fileExtension = 'tar'",
            'pageSize': 10,
            'fields': "nextPageToken, files(id, name)",
        }).then(function (respo) {
            console.log('Files:');
      var files = respo.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log(file.name + ' (' + file.id + ')');
        }
      } else {
        console.log('No files found.');
      }
        })
    });
  }*/


  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default GoogleDrive;