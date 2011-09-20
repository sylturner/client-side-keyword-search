$(document).ready(function(){
    // this is a way of caching the xml result
    // based on the example from: http://jqueryui.com/demos/autocomplete/#xml
    $.ajax({
                url: '/search/blogs.xml',
                dataType: "xml",
                success: function(xmlResponse){
                    var data = $("page", xmlResponse).map(function() {
                        return {
                            value: $("title", this).text() + ", " + $("keywords", this).text(),
                            label: $("title", this).text(),
                            id: $( "path", this ).text()
                        };
                    }).get();
                    
                    $("#search-text-box").autocomplete({
                        source: data,
                        minLength: 0,
                        select: function(event, ui) {
                            // go to the page
                            if (ui.item)
                                parent.window.location = ui.item.id;
                        }
                    });
                }
            });
});