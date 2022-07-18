# GCA Website

Website to collect digital trace data for the Gender Composition of Hiring Pools Study at Stanford University.

## Creating URLs

The website requires certain parameters to be specified in the URL in order to decide which candidates to show. The format is the following:

> https://www.gcaproject.com/#/page/:pageNum/:qualtricsUserId/?name1=a&name2=b&name3=c&name4=d&name5=e&name6=f

`:pageNum` and `:qualtricsUserId` should be replaced with the specific values needed. Names should be passed after the `=` and will be displayed in numberical order.

## Install

- `npm install`

## Run Project Locally

You'll need to copy-paste the Firebase config from the Project Settings, and create the file `src/config.js` that exports it.

- `npm start`
- In your browser, visit a valid URL, such as http://localhost:3000/#/page/1/0TESTING/?name1=Stephanie%20Lawrence&name2=Guadalupe%20Hernandez&name3=Tremayne%20Washington&name4=Emily%20Rodriguez&name5=Ashley%20Gneiss&name6=Daniel%20Reid

In order to download the data, you will also need to create and export `adminPassword` in `src/config.js`. Visit http://localhost:3000/#/admin, and input the password to download the data.

## Embed in Qualtrics

> `<iframe height="830px" width="100%" src="https://www.gcaproject.com/#/page/1/${e://Field/ResponseID}/?name1=${e://Field/name1}&name2=${e://Field/name2}&name3=${e://Field/name3}&name4=${e://Field/name4}&name5=${e://Field/name5}&name6=${e://Field/name6}"></iframe>`

---

# How It Works

The GCA website is designed to be embedded within an `<iframe>` in a Qualtrics survey, allowing researchers to combine the survey responses with the digital trace data collected by the site.

The site consists of a single `App`. When the URL is `/page/`, the `App` contains a `Pool`, which consists of one `JobDescription` and six `Candidate`s. When the URL is `/admin`, the `App` instead contains one `Admin`.

The GCA website is built with React.js and stores its data in Google Firebase.

## Firebase Setup

The site pulls the job description and resume items from Firebase. These are provided by the researcher and presented to the user verbatim. The expected schema is:

```
|- job_description
  |- values
    |- job_title
    |- main_tasks
    |- req_skills
|- resumes
  |- resume_1
    |- edu_degree
    |- edu_distinction
    |- edu_duration
    |- edu_major
    |- edu_university
    |- work1_company
    |- work1_description
    |- work1_duration
    |- work1_location
    |- work1_title
    |- work2_company
    |- work2_description
    |- work2_duration
    |- work2_location
    |- work2_title
    |- work3_company
    |- work3_description
    |- work3_duration
    |- work3_location
    |- work3_title
  |- resume_2
    |- <same>
  |- resume_3
    |- <same>
  |- resume_4
    |- <same>
  |- resume_5
    |- <same>
  |- resume_6
    |- <same>
```

## Components

### `App`

The `App` establishes a connection to the database and passes the function `recordActivity` to its children components. This function ensures digital trace data is logged in a consistent, helpful format. The `App` also manages the routes, rendering the correct components based on the URL.

### `Pool`

The `Pool` parses the candidate names, response ID, and page number from the URL, which Qualtrics determines in creating the `<iframe>`. On the user's first visit to the site (`pageNum` is 1), the `Pool` randomizes the resume order. This order is stored in Firebase and retrieved on subsequent visits by the user (`pageNum` is 2, 3, or 4). The `Pool` also records in Firebase what names the user saw, and which resume was associated with which name.

The `Pool` is responsible for communicating with Firebase to retrieve the resume items and job description text. It passes this information on to the `JobDescription` and `Candidate`s.

The `Pool` has 7 `Tab`s, corresponding to the `JobDescription` and the six `Candidate`s. Each time the user clicks on a `Tab` or scrolls the page (within the `<iframe>`), the action is recorded in Firebase.

### `Candidate`

The `Candidate` displays the relevant fields passed to it by `Pool`. This information may take time to load, so if the `Candidate` is rendered before the Firebase data has arrived, it shows a loading screen.

### `JobDescription`

The `JobDescription` simply displays the relevant fields passed to it by `Pool`.

### `Admin`

`Admin` is a bare-bones front-end for researchers to download the digital trace data from Firebase as a helpful CSV file for later import into Stata. The researcher enters the password (as defined in `/src/config.js`) and then starts the download. In order to not overwhelm Firebase with requests, the data is downloaded synchronously; it may take a while. The download progress is displayed so researchers can be assured things are working right.

## Digital Trace Data

`Admin` produces two CSV files: `userData` and `activityData`. The filenames also contain the date and time of download. CSV files can be opened in any spreadsheet program for easy viewing.

### `userData`

`userData` has 7 columns.

- `userID` is the Qualtrics ResponseID, passed by Qualtrics to the `<iframe>`.
- The `candidateN_resume` columns each contain the resume number the user saw for the nth `Candidate`.

### `activityData`

- `userID` is the Qualtrics ResponseID, passed by Qualtrics to the `<iframe>`.
- `pageNum` is which page of the survey the user is on. (The Qualtrics survey requires re-embedding the site as the user moves through the questions and evaluates different candidates.)
- `activityid` is the unique identifier for this piece of digital trace data. They are generated sequentially, so can be used to determine order of user activities.
- `timeReadable` is the time of the activity in a human-readable format.
- `timestamp` is a timestamp, passed from a native JavaScript `Date` to Firebase as a timestamp.
- `timeEpoch` is the number of miliseconds between 00:00:00 UTC on 1 January 1970 and the time of the action ([Unix time](https://en.wikipedia.org/wiki/Unix_time)). It can be used as a simple way to order actions chronologically.
- `category` denotes what kind of activity this is:
  - `log` = an interaction with Firebase (probably not helpful for analysis)
  - `loading` = loading status of the page
  - `click` = user clicked on a tab
  - `scroll` = user scrolled a certain amount
- `value` is the value of this specific action, and depends on the `category` of the action.
  - `log`:
    - `job_description_fetched`
    - `resume_order_stored`
    - `name_order_stored`
  - `loading`:
    - `accessed` → the user has opened page and is waiting for the site to load
    - `render` → the page has (re)rendered
    - `ready` → the page is rendered and ready for user interaction
  - `click` → a number [0,6]
    - 0 = the job descripion
    - 1-6 = the resume number
  - `scroll` → the percent that the user has scrolled down the page
