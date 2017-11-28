// helpful resources
// https://www.sitepoint.com/use-jquerys-ajax-function/
// https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
// https://www.w3schools.com/tags/tag_select.asp

/*global $*/

API_KEY = '8fbff174ea8e4b34ba374dcea2baf754';

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
    
    var url = 'https://newsapi.org/v2/sources?apiKey=8fbff174ea8e4b34ba374dcea2baf754';
    ajaxCall(url, fillDropDown);
    document.getElementById("userSelection").addEventListener('click', function(){
        var dropDown = document.getElementById("selection");
        var dropDownSelection =dropDown.options[dropDown.selectedIndex].value;
        console.log(dropDownSelection);
        url = 'https://newsapi.org/v2/top-headlines?';
        url += `sources=${dropDownSelection}`;
        url += '&apiKey=8fbff174ea8e4b34ba374dcea2baf754';
        ajaxCall(url, getArticles);
        
        
    });
    
    // url for businesses sources that report in english
    /*var url = 'https://newsapi.org/v2/sources?' +
                'category=business&' +
                'language=en&' +
                'country=us&' +
                'apiKey=8fbff174ea8e4b34ba374dcea2baf754';*/
    // all sources
    //var url = 'https://newsapi.org/v2/sources?apiKey=8fbff174ea8e4b34ba374dcea2baf754';
    //ajaxCall(url, fillDropDown);
    
    //top headlines
    //var url = 'https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=8fbff174ea8e4b34ba374dcea2baf754';

    //var data = apiExample(url);
    

    function apiExample(url){
        /*var url = 'https://newsapi.org/v2/everything?' +
              'q=Apple&' +
              'from=2017-11-28&' +
              'sortBy=popularity&' +
              'apiKey=8fbff174ea8e4b34ba374dcea2baf754';*/
    
        $.ajax({
          type: 'GET',
          url: url,
          data: {
            format: 'json'
          },
          success: function(data) {
            // passed function object for data processing 
            //console.log(data);
            //console.log(data.status);
            //console.log(data.sources[2].description)
            //console.log(data.sources[8].url)
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
