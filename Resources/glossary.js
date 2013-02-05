var win_glossary = Ti.UI.currentWindow;
var tab_glossary=Ti.UI.currentTab;
Ti.include('js/conf.js');

// var dadyezburlit = Ti.UI.createLabel({
// 	text:'item.title Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
// 	top:5,
// 	left:10,
// 	font:{fontSize:14,fontFamily:main_font_family,fontWeight:'bold'}
// });
// 
// 
// win_glossary.add(dadyezburlit);
// alert (dadyezburlit.toImage().height);


var make_row=function(item){
	
	
	var row1=Ti.UI.createTableViewRow({
		header:item.header,
		height:'auto'
	});
	
	
	var wrapper = Ti.UI.createView({
		layout:'vertical',
		height:'auto',
		left:10,
		top:5,
		width:270,
		bottom:5
	});
	
 	var row_title = Ti.UI.createLabel({
		text:item.title,
		height:'auto',
		font:{fontSize:14,fontFamily:main_font_family,fontWeight:'bold'}
	});
	
	var row_desc = Ti.UI.createLabel({
		text:item.desc,
		height:'auto',
		font:{fontSize:13,fontFamily:main_font_family}
	});

	wrapper.add(row_title);
	wrapper.add(row_desc);
	
	row1.add(wrapper);
	return row1;
};


// create table view data object
var data = [
	{title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', header:'A'},
	{title:'Alice row 2',desc:'The description of row 2 of this goes here, after the dash maybe a little longer to see if it falls'},
	{title:'Alexander row 3 ',desc:'The description of row 3 of this goes here, after the dash'},
	{title:'Amos'},
	{title:'Alonzo'},
	{title:'Brad', header:'B'},
	{title:'Brent'},
	{title:'Billy'},
	{title:'Brenda'},
	{title:'Callie', header:'C'},
	{title:'Cassie'},
	{title:'Chris'},
	{title:'Cameron'},
	{title:'Don', header:'D'},
	{title:'Dilbert'},
	{title:'Deacon'},
	{title:'Devin'},
	{title:'Darin'},
	{title:'Darcy'},
	{title:'Erin', header:'E'},
	{title:'Erica'},
	{title:'Elvin'},
	{title:'Edrick'},
	{title:'Frank', header:'F'},
	{title:'Fred'},
	{title:'Fran'},
	{title:'Felicity'},
	{title:'George', header:'G'},
	{title:'Gina'},
	{title:'Gary'},
	{title:'Herbert', header:'H'},
	{title:'Henry'},
	{title:'Harold'},
	{title:'Ignatius', header:'I'},
	{title:'Irving'},
	{title:'Ivan'},
	{title:'Dr. J', header:'J'},
	{title:'Jefferson'},
	{title:'Jenkins'},
	{title:'Judy'},
	{title:'Julie'},
	{title:'Kristy', header:'K'},
	{title:'Krusty the Clown'},
	{title:'Klaus'},
	{title:'Larry', header:'L'},
	{title:'Leon'},
	{title:'Lucy'},
	{title:'Ludwig'},
	{title:'Mary', header:'M'},
	{title:'Mervin'},
	{title:'Malcom'},
	{title:'Mellon'},
	{title:'Ned', header:'N'},
	{title:'Nervous Eddie'},
	{title:'Nelson'},
	{title:'The Big O', header:'O'},
	{title:'Orlando'},
	{title:'Ox'},
	{title:'Pluto', header:'P'},
	{title:'Paris'},
	{title:'Potsie'}
];

var table_data=[];
for (var i=0; i < data.length; i++) {
	var row=make_row(data[i]);
	table_data.push(row);
};

var search = Titanium.UI.createSearchBar();

// create table view
var tableview = Titanium.UI.createTableView({
	data:table_data,
	search:search,
	backgroundColor:'transparent'
	
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.index === 0){
		tableview.index = index2;
	}
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
});
// set filters
var index = [
	{title:'A',index:0},
	{title:'B',index:5},
	{title:'C',index:9},
	{title:'D',index:13},
	{title:'E',index:19},
	{title:'F',index:23},
	{title:'G',index:27},
	{title:'H',index:30},
	{title:'I',index:33},
	{title:'J',index:36},
	{title:'K',index:41},
	{title:'L',index:44},
	{title:'M',index:48},
	{title:'N',index:52},
	{title:'O',index:55},
	{title:'P',index:(data.length -1)}
];
tableview.index = index;
var index2 = [
{title:'AA',index:0},
{title:'BB',index:5},
{title:'CC',index:9},
{title:'DD',index:13},
{title:'EE',index:19},
{title:'FF',index:23},
{title:'GG',index:27},
{title:'HH',index:30},
{title:'II',index:33},
{title:'JJ',index:36},
{title:'KK',index:41},
{title:'LL',index:44},
{title:'MM',index:48},
{title:'NN',index:52},
{title:'OO',index:55},
{title:'PP',index:(data.length -1)}

];
// add table view to the window
win_glossary.add(tableview);
