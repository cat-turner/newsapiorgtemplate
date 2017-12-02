## Project Goals

Extend your newsapi.org project so that when the user clicks the submit button the site pulls the top articles from newsapi.org and displays the article headlines.

max score: 4 
1 on time
1 requirements
1 for each additional challenge completed

Requirements:
API call should be asynchronous
All headlines from the API should be displayed in a list.

Additional challenge
Have the headline link to the article.
Display the description of the article as well.
Use bootstrap to display the information in an aesthetic way

Note to reviewer:

### Set up

To demo app, do the following (linux):

1. Export your api key as an env variable
```
export API_KEY="your api key"

```

2. Create a file called key.js, and put the API key value in there

```
echo "API_KEY='${API_KEY}';" > $(pwd)/script/key.js
```