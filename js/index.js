$( document ).ready(function() {
    console.log( "ready!" );
      
    loadContent();

});

loadContent = function(){

	var season= 'Fall 2019';
	$("#text-container").html('');
    $.ajax({
	  url: '/api/batch/get?season='+season,
	  dataType: 'JSON',
	  success: function(e){
	  		console.log(e);
	  		var ss = '';
	  		$.each(e, function(i,elem){
	  			ss = ss+'<img style="width:10%" src=';
	  			ss = ss+elem.pathImage;
	  			ss = ss+' /><span id="" style="text-align:top">';
	  			ss = ss+elem.batchName;
	  			ss = ss + " -- "+elem.weightCurrent;
	  			ss = ss+'</span>';
	  		})
	  		$("#text-container").html("<div>"+season+"<br/>"+ss+"</div>");
	  }
	});

}

submit = function(verb){
	//var verb = $("#update input[name=verb]").val();
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
	  }
	});

}