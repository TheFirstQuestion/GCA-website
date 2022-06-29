# GCA Website

Gender Composition of Hiring Pools Study at Stanford University.

## Creating URLs

The website requires certain parameters to be specified in the URL in order to decide which candidates to show. The format is the following:

```
https://www.gcaproject.com/#/page/:pageNum/:qualtricsUserId/?name1=a&name2=b&name3=c&name4=d&name5=e&name6=f
```

`:pageNum` and `:qualtricsUserId` should be replaced with the specific values needed. [URL-encoded](https://www.tutorialspoint.com/html/html_url_encoding.htm) names should be passed after the `=` and will be displayed in order.

## Install

- `npm install`

## Run Project Locally

- `npm start`
- In your browser, visit a valid URL, such as http://localhost:3000/#/page/2/TESTING/?name1=Stephanie%20Lawrence&name2=Guadalupe%20Hernandez&name3=Tremayne%20Washington&name4=Emily%20Rodriguez&name5=Ashley%20Gneiss&name6=Daniel%20Reid
