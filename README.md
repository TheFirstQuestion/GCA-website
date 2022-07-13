# GCA Website

Website to collect digital trace data for the Gender Composition of Hiring Pools Study at Stanford University.

## Creating URLs

The website requires certain parameters to be specified in the URL in order to decide which candidates to show. The format is the following:

```
https://www.gcaproject.com/#/page/:pageNum/:qualtricsUserId/?name1=a&name2=b&name3=c&name4=d&name5=e&name6=f
```

`:pageNum` and `:qualtricsUserId` should be replaced with the specific values needed. Names should be passed after the `=` and will be displayed in numberical order.

## Install

- `npm install`

## Run Project Locally

You'll need to copy-paste the Firebase config from the Project Settings, and create the file `src/config.js` that exports it.

- `npm start`
- In your browser, visit a valid URL, such as http://localhost:3000/#/page/1/0TESTING/?name1=Stephanie%20Lawrence&name2=Guadalupe%20Hernandez&name3=Tremayne%20Washington&name4=Emily%20Rodriguez&name5=Ashley%20Gneiss&name6=Daniel%20Reid

## Embed in Qualtrics

```HTML
<iframe height="830px" width="100%" src="https://www.gcaproject.com/#/page/1/${e://Field/ResponseID}/?name1=${e://Field/name1}&name2=${e://Field/name2}&name3=${e://Field/name3}&name4=${e://Field/name4}&name5=${e://Field/name5}&name6=${e://Field/name6}"></iframe>
```
