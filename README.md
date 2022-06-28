# GCA Website

Gender Composition of Hiring Pools Study at Stanford University.

## Creating URLs

The website requires certain parameters to be specified in the URL in order to decide which candidates to show. The format is the following:

```
https://www.gcaproject.com/#/:qualtricsUserId/:pageNum?name=hello&name=world
```

Any number of names can be passed as parameters.

## Install

- `npm install`

## Run Project

- `npm start`
- In your browser, visit a valid URL, such as http://localhost:3000/#/page/2/:qualtricsUserId/?name=Brittany%20Lawrence&name=Sarah%20Smith&name=Christopher%20Piech&name=Emily%20Rodriguez&name=Ashley%20Gneiss&name=Daniel%20Reid
