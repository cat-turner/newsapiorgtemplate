// helpful resources
// https://www.sitepoint.com/use-jquerys-ajax-function/
// https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
// https://www.w3schools.com/tags/tag_select.asp
/*global $*/
/*global API_KEY*/

var storedItems = [];

$(document).ready(function() {
    var url = `https://newsapi.org/v2/sources?`;
    ajaxCall(url, fillDropDown);
    document.getElementById("selection").setAttribute("onchange", "SelectNews()");


});

function ajaxCall(actionUrl, successCallBack) {
    $.ajax({
        type: 'GET',
        url: actionUrl,
        data: {
            format: 'json',
            country: "us",
            language:"en",
            apiKey:API_KEY,
        },
        success: successCallBack,
        error: function(err) {
            console.log('Error:' + err)
        }
    });
}

// User selection will trigger get Articles
function SelectNews() {
    var dropDown = document.getElementById("selection");
    var dropDownSelection = dropDown.options[dropDown.selectedIndex].value;
    var url = 'https://newsapi.org/v2/top-headlines?';
    url += `sources=${dropDownSelection}`;
    ajaxCall(url, getArticles);
    event.preventDefault();
};

function getArticles(data) {
    var topHeadlines = document.getElementById("headlines");
    topHeadlines.innerHTML = "";
    let newsTile = new TextTile();
    var idx = 0;
    data.articles.forEach(function(article) {
        var storyItem = document.createElement("LI");
        storyItem.appendChild(newsTile.create(article,idx));
        topHeadlines.appendChild(storyItem);
        idx += 1;

    });
}

function addStoredItems(){
    if (storedItems.length > 0){
        var storedItemsUL = document.getElementById("stored-headlines");
        storedItems.forEach(function(item){
            storedItemsUL.prepend(item);
            console.log(item);
            
        });
    }
    storedItems = [];
    
}


function fillDropDown(data) {

    var dropDown = document.getElementById("selection");

    data.sources.forEach(function(source) {
        var name = source.name;
        var queryName = source.id;

        var option = document.createElement("OPTION");
        option.setAttribute("value", queryName);
        option.innerHTML = name;
        option.setAttribute("class", "sources")
        dropDown.appendChild(option);

    });
}


function deleteAction(node){
    var parentNode = node.parentNode;
    parentNode.setAttribute("class", "removed-item");
    parentNode.innerHTML = '<h2>Done reading!</h2>';
    setTimeout(function(){
        parentNode.remove();
    }, 1000);
}

function stashAction(node){
    var tileId = node.value;
    var newsTiles = document.getElementById("headlines");
    var storyItem = document.getElementById(tileId);
    var storyItemClone = storyItem.cloneNode(true);
    storyItemClone.removeChild(storyItemClone.childNodes[0]);
    let t = new TextTile();
    storyItemClone.prepend(t.deleteButton());
    storedItems.push(storyItemClone);
    storyItem.setAttribute("class", "stashed-item");
    storyItem.innerHTML = '<h2>Shashed!</h2>';
    setTimeout(function(){
        storyItem.remove();
    }, 1000);
    
}

class TextTile {
    
    constructor(){
        this.url = "";
        this.title = "";
        this.description = "";
        this.idx = "";
    }

    deleteButton(){
        var stashBtn = document.createElement("BUTTON");
        stashBtn.innerHTML = '<i class="fa fa-minus" aria-hidden="true"></i>';
        stashBtn.setAttribute("class", "stash-button");
        stashBtn.setAttribute("onclick", 'deleteAction(this)');
        return stashBtn;
        
    }
    
    stashButton(tileId){
        var stashBtn = document.createElement("BUTTON");
        stashBtn.innerHTML = '<i class="fa fa-asterisk" aria-hidden="true"></i>';
        stashBtn.setAttribute("class", "stash-button");
        stashBtn.value = tileId;
        stashBtn.setAttribute("onclick", 'stashAction(this)');
        return stashBtn;
    }
    
    getHeadline(){
        var headline = document.createElement("A");
        headline.setAttribute("class", "news-header");
        headline.setAttribute("href", this.url);
        headline.setAttribute("target", "_new");
        headline.innerHTML = this.title;
        return headline;
    }
    
    getStory(){
        var storyDescription = document.createElement("P");
        storyDescription.setAttribute("class", "story-text");
        storyDescription.innerHTML = this.description;
        return storyDescription;
    }
    
    create(input, idx){
        this.url = input.url;
        this.title = input.title;
        this.description = input.description;
        var tile = document.createElement("DIV");
        tile.id = "tile-" + idx;
        tile.setAttribute("class", "row news-tile");
        tile.appendChild(this.stashButton("tile-" + idx));
        tile.appendChild(this.getHeadline());
        tile.appendChild(this.getStory());
        return tile;
        
    }

}



