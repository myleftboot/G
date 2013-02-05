gcse.ui.makeInfoButton = function() {
	var info_btn = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.INFO_LIGHT
	});

	info_btn.addEventListener('click', function() {

		var close_btn = Ti.UI.createButton({
			title: 'Done'
		});

		close_btn.addEventListener('click', function() {
			info_win.close({
				transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		})

		var info_win = Titanium.UI.createWindow({
			backgroundColor: bgcolor,
			barColor: bar_color,
			title: 'Legal',
			// modal:true,
			leftNavButton: close_btn
			// titleControl: units_title
		});

		info_win.add(close_btn);

		info_win.open({
			transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		})

	});

	return info_btn;
}

gcse.ui.makeWindow = function(opts) {

}

gcse.ui.makeTabGroup = function() {
	var tabGroup = Titanium.UI.createTabGroup();

	var units_title = Titanium.UI.createLabel({
		color: '#fff',
		left: 10,
		height: 'auto',
		text: 'Complete Core GCSE Science',
		font: {
			fontSize: 16,
			fontFamily: main_font_family,
			fontWeight: 'bold'
		}
	});

	// tabs
	gcse.ui.win_index = Titanium.UI.createWindow({
		backgroundImage: bgimage,
		barColor: bar_color,
		rightNavButton: gcse.ui.makeInfoButton(),
		titleControl: units_title
	});

	gcse.ui.tab_units = Titanium.UI.createTab({
		icon: 'images/53-house.png',
		title: 'Units',
		window: gcse.ui.win_index
	});

	var win2 = Titanium.UI.createWindow({
		title: 'Exam Practice',
		backgroundColor: bgcolor,
		backgroundImage: bgimage,
		barColor: bar_color,
		rightNavButton: gcse.ui.makeInfoButton()
	});
	var tab2 = Titanium.UI.createTab({
		icon: 'images/216-compose.png',
		// title: 'Exam Practice',
		title: 'Practice',
		window: win2
	});

	var win3 = Titanium.UI.createWindow({
		title: 'Glossary',
		backgroundColor: bgcolor,
		backgroundImage: bgimage,
		barColor: bar_color,
		rightNavButton: gcse.ui.makeInfoButton(),
		url: 'glossary.js'
	});
	var tab3 = Titanium.UI.createTab({
		icon: 'images/96-book.png',
		title: 'Glossary',
		window: win3
	});

	gcse.ui.search_window = Titanium.UI.createWindow({
		title: 'Search',
		backgroundColor: bgcolor,
		backgroundImage: bgimage,
		barColor: bar_color,
		rightNavButton: gcse.ui.makeInfoButton()
	});
	var tab4 = Titanium.UI.createTab({
		icon: 'images/06-magnify.png',
		title: 'Search',
		window: gcse.ui.search_window
	});

	//  add tabs
	tabGroup.addTab(gcse.ui.tab_units);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	// open tab group
	tabGroup.open();
}

gcse.ui.makeUnitIndex = function() {
	var index_tbl = Ti.UI.createTableView({
		minRowHeight: 80,
		backgroundColor: 'transparent',
		footerView: Ti.UI.createView({
			height: 0
		})

	});
	var data = [];

	for (var i = 0; i < gcse.book.units.length; i++) {
		data.push(gcse.ui.makeUnitItem(gcse.book.units[i], i));
	};

	index_tbl.setData(data);
	return index_tbl;
}

gcse.ui.makeSubunitIndex = function(unit_data) {
	

	
	var index_tbl = Ti.UI.createTableView({
		minRowHeight: 47,
		backgroundColor: 'transparent',
		footerView: Ti.UI.createView({
			height: 0
		})
	});
	var data = [];

	for (var i = 0; i < unit_data.subunits.length; i++) {
		data.push(gcse.ui.makeSubunitItem(unit_data.subunits[i],i));
	};

	index_tbl.setData(data);
	return index_tbl;
}


gcse.ui.makeSubunitItem =  function(unit_data, i) {
	
	
	
	var subunit = Titanium.UI.createTableViewRow({
		height: 'auto',
		className: 'Units_Row',
		hasDetail: true,
		top: 0,
		left: 0,
		// width: 300,
		height: 'auto',
		subunit_data: unit_data,
		backgroundColor: i % 2 ? '#d2efff' : '#b3dcf5'
		// backgroundGradient: {
		// 		        type: 'linear',
		// 		        startPoint: { y: '0%', x: '50%' },
		// 		        endPoint: { y: '100%', x: '50%' },
		// 		        colors: [ { color: '#5a98a5', offset: 0 }, { color: '#569aa5', offset: 1 } ],
		// 		    }

	});

	var subunit_title = Titanium.UI.createLabel({
		color: unit_row_color,
		left: 10,
		height: 'auto',
		// width: 260,
		text: unit_data.idx + ' ' + unit_data.title,
		font: {
			fontSize: gcse.is_tablet ? 20 : 16,
			fontFamily: unitlist_font_family,
			fontWeight: 'bold'
		}
	});

	subunit.addEventListener('click', function(e) {
		var unit_reader = gcse.ui.makeUnitReader(e.row.subunit_data);
		gcse.ui.tab_units.open(unit_reader);
	})

	subunit.add(subunit_title);
	
	return subunit;
}

gcse.ui.makeUnitItem = function(unit_data, i) {
	var unit = Titanium.UI.createTableViewRow({
		height: 'auto',
		className: 'Units_Row',
		hasDetail: true,
		top: 0,
		left: 0,
		height: 'auto',
		unit_data: unit_data,
		// backgroundColor:'#d27832'
		backgroundColor: i % 2 ? '#eabc89' : '#f4d8b4'
		// backgroundGradient: {
		//     type: 'linear',
		//     startPoint: { y: '0%', x: '50%' },
		//     endPoint: { y: '100%', x: '50%' },
		//     colors: [ { color: '#ec8130', offset: 0 }, { color: '#d67935', offset: 1 } ],
		// }
	});

	unit.addEventListener('click', function(e) {
		var subunit_win = Ti.UI.createWindow({
			title: e.row.unit_data.title,
			backgroundColor: bgcolor,
			backgroundImage: bgimage,
			barColor: bar_color
		});
		var subunit_tbl = gcse.ui.makeSubunitIndex(e.row.unit_data);

		subunit_win.add(subunit_tbl);
		gcse.ui.tab_units.open(subunit_win);
	});

	var unit_idx = Titanium.UI.createLabel({
		color: unit_row_color,
		left: 0,
		top: 5,
		width: 30,
		textAlign: 'right',
		height: 'auto',
		text: unit_data.idx + '.',
		font: {
			fontSize: gcse.is_tablet ? 20 : 16,
			fontFamily: unitlist_font_family,
			fontWeight: 'bold'
		}
	});

	// 
	var unit_title = Titanium.UI.createLabel({
		// color: main_text_color_dark,
		color: unit_row_color,
		left: 33,
		top: 5,
		width: 250,
		height: 'auto',
		text: unit_data.title,
		font: {
			fontSize: gcse.is_tablet ? 20 : 16,
			fontFamily: unitlist_font_family,
			fontWeight: 'bold'
		}
	});

	var unit_syl = Titanium.UI.createLabel({
		// color: main_text_color_dark,
		color: unit_row_color,
		textAlign: 'right',
		right: -20,
		top: 5,
		height: 20,
		text: unit_data.syl,
		font: {
			fontSize: gcse.is_tablet ? 18 : 14,
			fontFamily: unitlist_font_family
		}
	});

	unit.add(unit_idx);
	unit.add(unit_title);
	unit.add(unit_syl);

	var top = unit_title.toImage().height + 5;

	for (var s = 0; s < unit_data.subunits.length; s++) {

		var idx = Titanium.UI.createLabel({
			// color: main_text_color,
			color: unit_row_color,
			top: top,
			left: 10,
			textAlign: 'right',
			height: 'auto',
			width: 40,

			// backgroundColor:'#ff0',
			

			text: unit_data.subunits[s].idx + ' ',
			font: {
				fontSize: gcse.is_tablet ? 18 : 14,
				fontFamily: subunit_font_family
			}
		});

		var subunit = Titanium.UI.createLabel({
			color: unit_row_color,
			top: top,
			left: 47,
			width: 230,
			height: 'auto',
			
			// backgroundColor:'#f00',
			
			text: unit_data.subunits[s].title,
			font: {
				fontSize: gcse.is_tablet ? 18 : 14,
				fontFamily: subunit_font_family
			}
		});

		unit.add(idx);
		unit.add(subunit);

		top = top + subunit.toImage().height +2;
		
		if (i == unit_data.subunits.length-1) {
			// subunit.bottom = 10;
			unit.add(Ti.UI.createView({height:5, top:top}))
		} 
	};

	// unit.add(unit_view);
	return unit;
};

gcse.ui.makeUnitReader = function(unit_data) {

	var unit_reader = Ti.UI.createWindow({
		backgroundColor: bgcolor,
		backgroundImage: background_image,
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT],
		barColor: bar_color,
		// translucent:true,
		// barColor:'transparent'
	});

	var unit_wrapper = Ti.UI.createView({
		// backgroundImage: gcse.is_tablet ? '/book/assets/images/diagonal-noise.png':'transparent'
		backgroundImage: bgimage
	});

	if (gcse.is_tablet) {
		unit_wrapper.left = 15
		unit_wrapper.right = 15;
		unit_wrapper.top = 15;
		unit_wrapper.bottom = 15;
		unit_wrapper.borderRadius = 10;
		// unit_wrapper.borderColor = '#6d889e';
		unit_wrapper.borderColor = '#cfcfcf';
		unit_wrapper.borderWidth = 3;
	}

	var unit_webview = Ti.UI.createWebView({
		backgroundColor: 'transparent',
		opacity: 0,
		url: '/book/' + unit_data.file
	});

	Ti.App.addEventListener('page_loaded', function(e) {

		Ti.API.info('page_loaded');
		setTimeout(function() {
			unit_webview.animate({
				opacity: 1
			});
		},
		1000);
	});

	unit_wrapper.add(unit_webview);

	unit_reader.add(unit_wrapper);

	return unit_reader;
}




gcse.ui.makeSearch = function(){
	var wrapper = Ti.UI.createView();
	
	var search_bar = Ti.UI.createSearchBar({
		top:0,
		height:43,
		barColor:'#222',
		showCancel:true,
		hintText:'Min 4 chars'
	});


	var search_tbl = Ti.UI.createTableView({
		top:43,
		backgroundColor:'transparent',
		// footerView:Ti.UI.createView({height:0})
	});
	
	wrapper.add(search_bar);
	wrapper.add(search_tbl);
	
	search_bar.focus();
	
	search_bar.addEventListener('return', function(){
		if (this.value.length < 4) {
			alert(err.search_length);
		}
		else {
			this.blur();
			var result = gcse.performSearch(this.value);
			var data = [];
			for (var i=0; i < result.length; i++) {
				data.push(gcse.ui.makeSubunitItem(result[i],i));
			};
			
			search_tbl.setData(data);
			
		}
	});

	search_bar.addEventListener('cancel', function(){
		this.value='';
		this.blur();
	});
	
	
	
	return(wrapper);
};


