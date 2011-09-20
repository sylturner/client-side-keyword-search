$(document).ready(function(){
    // add a handler to the form    
    $("#search-form").submit(function(){
        // when the form is submitted, we'll hit the search function...
        search();
        // ...and return 'false' for the submit so we cancel the 'action'
        return false;
    })
});

// this is our main search function
function search() {
		// show the search results div on other pages
		$("#hidden-search-results").slideDown();
		
    // show an indicator that the search is doing something. In this case, it's an animated gif with the word "searching" next to it.
    // we also need to wrap 'system-asset' tags around the path so Cascade knows how to rewrite it.
    $("#search-results").html("<span id=\"loading\"><img src=\"[system-asset]/images/loading.gif[/system-asset]\"/>Searching...</span>");

    // perform the ajax request to get the XML we're searching through
    // we need to use the "system-view:internal" and ":external" tags so we can grab the rendered content internally (/render/page.act?id=...) 
    // and the regular path to a file when published (blogs.xml)
    $.get('[system-view:internal]/render/page.act?id=449b5d3f0a00024e12439978feafa2b3&type=page[/system-view:internal][system-view:external]/search/blogs.xml[/system-view:external]', function(xml) {      
        // use the xml2json jquery plugin to conver our XML to JSON
        // details about the plugin here: http://www.fyneworks.com/jquery/xml-to-json/
        var blogs = $.xml2json(xml);
        // grab the value of the word the user is searching for
        var search_term = $("#search-text-box").val();
        // get the search results div to update with our search results
        var results = $("#search-results");
        // start by clearing the existing content (the "searching..." or previous search results)
        results.html("<ul>");
        
        // this count is the number of results
        var count = 0;
        // loop through every page in our JSON object
        for(var x=0; x < blogs.page.length; x++) {
            // check for the following conditions:
            // 1. the page has a title: blogs.page[x].title != ''
            // 2a. the search term and the keywords match: blogs.page[x].keywords.toLowerCase().indexOf(search_term.toLowerCase()) != -1
            // 2b. OR the search term and title match: blogs.page[x].title.toLowerCase().indexOf(search_term.toLowerCase()) != -1
            // if these conditions are met, then add the <li> and update the result count
            if (blogs.page[x].title != '' && (blogs.page[x].keywords.toLowerCase().indexOf(search_term.toLowerCase()) != -1 || blogs.page[x].title.toLowerCase().indexOf(search_term.toLowerCase()) != -1)) {           
                results.append("<li><a target=\"_parent\" href=\""+blogs.page[x].path+"\">" + blogs.page[x].title+ "</a></li>");
                count++;
            }                           
        }
        // if we don't get any results, display a nice lil' message here
        if (count == 0) {
            results.append("<li>No results for \"" + search_term + "\"</li>");
        }
        // close the ul
        $("#search-results").append("</ul>");
    });
}