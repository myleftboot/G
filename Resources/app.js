var gcse = {
	ui:{},
	book:{},
	is_tablet:Titanium.Platform.osname == 'ipad' // ti detect all the tablets
};

var is_ipad = Titanium.Platform.osname == 'ipad';


Ti.include('/js/conf.js','/js/jsonpath.js','/ui.js','/units.js');

Titanium.UI.setBackgroundColor(bgcolor);

gcse.ui.makeTabGroup();

// var table_units = gcse.ui.makeUnitIndex();
// gcse.ui.win_index.add(table_units);
gcse.ui.win_index.add(gcse.ui.makeUnitIndex());

gcse.ui.search_window.add(gcse.ui.makeSearch());



gcse.performSearch =  function(term) {

	var search_in_title = (jsonPath(gcse.book.units,"$..subunits[?(@.title.toLowerCase().indexOf('"+term.toLowerCase()+"') > -1)]")) || [];
	
	Ti.API.info(search_in_title);
	
	var search_in_content = (jsonPath(gcse.book.units,"$..subunits[?(@.file != '')]"));
	
	for (var i=0; i < search_in_content.length; i++) {
		if (gcse.contentSearch(term,search_in_content[i].file) && search_in_title.indexOf(search_in_content[i]) == -1) {
			search_in_title.push(search_in_content[i]);
			Ti.API.info(search_in_title);
		}
	};

	return search_in_title;

};

gcse.cacheSearch =  function(term,result_set) {
	
	
	
	
};


gcse.contentSearch = function(term, file_name) {
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'book/'+file_name);
	return (file.read().text.toLowerCase().indexOf(term.toLowerCase()) != -1);
};