// helpful resources
// https://www.sitepoint.com/use-jquerys-ajax-function/
// https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
// https://www.w3schools.com/tags/tag_select.asp

/*global $*/
/*global API_KEY*/

API_KEY = 'abc123';

$(document).ready(function(){
    
    function fillDropDown(data){
        
        var dropDown = document.getElementById("selection");
        
        data.sources.forEach(function (source){
            var name = source.name;
            var queryName = source.id;
            console.log(name);
            
            var option= document.createElement("OPTION");
            option.setAttribute("value", queryName);
            option.innerHTML = name;
            dropDown.appendChild(option);
            
        });
        
    }
    
    function createTile(input){
        var tile = document.createElement("DIV");
        tile.setAttribute("class", "news-tile");
        var headline = document.createElement("A");
        headline.setAttribute("class", "news-header");
        headline.setAttribute("href", input.url);
        headline.setAttribute("target", "_new");
        headline.innerHTML = input.title;
        tile.appendChild(headline);
        
        var storyDescription = document.createElement("P");
        storyDescription.setAttribute("class", "story-text");
        storyDescription.innerHTML = input.description;
        tile.appendChild(storyDescription);
        return tile;
        
    }
    
    function getArticles(data){
        console.log(data);
        var topHeadlines = document.getElementById("headlines");
        
        data.articles.forEach(function (article){
            var input = {
                title: article.title,
                url: article.url,
                description: article.description,
            }
            var storyTile = document.createElement("LI");
            storyTile.appendChild(createTile(input));
            topHeadlines.appendChild(storyTile);
            
        });
        
    }
    
    var url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
    ajaxCall(url, fillDropDown);

    document.getElementById("userSelection").addEventListener('click', function(){
        var dropDown = document.getElementById("selection");
        var dropDownSelection =dropDown.options[dropDown.selectedIndex].value;
        console.log(dropDownSelection);
        url = 'https://newsapi.org/v2/top-headlines?';
        url += `sources=${dropDownSelection}`;
        url += `&apiKey=${API_KEY}`;
        ajaxCall(url, getArticles);
        
        
    });

    function apiExample(url){
        $.ajax({
          type: 'GET',
          url: url,
          data: {
            format: 'json'
          },
          success: function(data) {
            return data;
          },
          error: function(err) {
            console.log('error:' + err)
          }
        });
        
    }
    
    function ajaxCall(actionUrl, successCallBack) {
    $.ajax({
        type: 'GET',
        url: actionUrl,
        data: {
            format: 'json'
        },
        success: successCallBack,
        error: function(err){
            console.log('Error:' + err)
        }
    });
}
    
    
    
});
