$( document ).ready(function() {
    console.log( "ready!" );
    fetchSeasons()
    .then(function(data){
    	for(var i = 0; i < data.length; i++){
    		fetchBatchJsonBySeason(data[i])
    		.then(function(e){
    			loadContent(e);
    		})
    	}
	})

});


fetchSeasons = function(){
	return new Promise(function(resolve, reject) {
	  //var season= 'Fall 2019';
	    $.ajax({
		  url: '/api/batch/seasons',
		  dataType: 'JSON',
		  success: function(e){
		  	resolve(e);
		  }
		});
	});
}

fetchBatchJsonBySeason = function(season){
	return new Promise(function(resolve, reject) {
	  //var season= 'Fall 2019';
		$("#text-container").html('');
	    $.ajax({
		  url: '/api/batch/get?season='+season,
		  dataType: 'JSON',
		  success: function(e){
		  	resolve(e);
		  }
		});
	});
}

loadContent = function(jsonPayload){
	console.log(jsonPayload);
	var ss = '';
	var season = '';

	$.each(jsonPayload, function(i,elem){
		season = elem.season;

		ss = ss+'<div class=display-item>';
		ss = ss+'<img class=element-img src='+elem.pathImage+' />';
		ss = ss+'<span class=element-details id='+elem._id+' style="text-align:top" data='+escape(JSON.stringify(elem))+' onclick=populateform(this)>';
		ss = ss+'Name: '+elem.batchName;
		ss = ss+'<br/>Current Weight: '+elem.weightCurrent;
		ss = ss+'<br/>Description: '+elem.description;
		ss = ss+'<br/>Format: '+elem.format;
		ss = ss+'</span></div>';
	})
	$("#text-container").append("<div><h1>"+season+"</h1><br/>"+ss+"</div>");
}

populateform = function(elem){
	var json = JSON.parse(unescape(elem.attributes.data.value));
	console.log(json);

	for(var key in json){
		$('input[name='+key+']').val(json[key]);
	}

}

submit = function(verb){
	return new Promise(function(resolve, reject) {
		var inputList = $("#update input");
		var batchJSON = {};
		$.each(inputList, function(i,e){
			batchJSON[e.name] = e.value;
		});
		batchJSON['_id'] = batchJSON['batchName'] + batchJSON['season'];

		console.log(batchJSON);
		$.ajax({
		  url: '/api/batch/'+verb,
		  data : JSON.stringify(batchJSON),
		  method: 'POST',
		  contentType: "application/json; charset=utf-8",
		  dataType: 'string',
		  success: function(e){
		  		console.log(e);
		  		loadContent();
		  		resolve(e);
		  }
		});
	});

}