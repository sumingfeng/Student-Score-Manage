require.config({
	
	//baseUrl:"/script",
	
	paths:{
		
		"jquery" : "script/jq",
		
		"underscore":"script/underscore/underscore",
		
		"backbone":"script//backbone/backbone",
		
		"selectui" : "plugin/jquery.selectui"
	
	},
	
	shim:{
		
		'underscore':{
			
			exports:"_"
		},
		
		'backbone':{
		
			deps:['underscore','jquery'],
			
			exports:"Backbone"
			
		},
		
		'selectui':{
			
			deps:['jquery'],
			
			exports:"selectui"
			
		}
	}
	
});

require(["app"])