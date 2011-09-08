$(document).ready(function(){
	// this is a way of caching the xml result
	// based on the example from: http://jqueryui.com/demos/autocomplete/#xml
	$.ajax({
				url: '[system-view:internal]/render/page.act?id=449b5d3f0a00024e12439978feafa2b3&type=page[/system-view:internal][system-view:external]blogs.xml[/system-view:external]',
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
								window.location = ui.item.id;
						}
					});
				}
			});
});