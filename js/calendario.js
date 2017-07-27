 var holiday;

  function holidays(){
  	var c = document.getElementById("t").value;
  	var year = new Date(document.getElementById("d").value);
  	var y = year.getFullYear();
    $.getJSON('https://holidayapi.com/v1/holidays?key=be42477a-0d10-4623-8ec1-33ade4e092d9&country='+c+'&year='+y, function(data) {
		 holiday = data;
		 console.log(holiday);
		 console.log(data);
    });
    console.log(holiday);
    
  }

  function last_day(d){
  	var date = new Date(d.getFullYear(),d.getMonth()+1,0);
  	return date;
  }

  function calculate(){
  	var nu = parseInt(document.getElementById("n").value);
  	var fin = new Date(document.getElementById("d").value);
  	fin.setDate(fin.getDate()+nu);
  	var date = new Date(document.getElementById("d").value);
  	date.setDate(date.getDate()+1);

  	console.log("n -->"+n);
  	console.log("fin -->"+fin);
  	console.log("inicio -->"+date);
  	printmonths(date,fin);
  }


  function printmonths(datebegin,dateend){
  	var date = new Date(datebegin);
  	var dateend = new Date(dateend);
  	var lastday = last_day(datebegin);
  	content = "";
  	if (lastday < dateend) {
  		console.log("este es el last antes del ciclo-->"+lastday);
  		content += printmonth(date,lastday);
  		lastday.setDate(lastday.getDate()+1);
  		console.log(lastday);
  		console.log(dateend);
  		while (lastday<dateend){
  			var final = last_day(lastday);
  			if (lastday.getMonth()==dateend.getMonth()){
  				content += printmonth(lastday,dateend);
  			}else{
  				content+=printmonth(lastday,final);
  			}
  			lastday = final;
  			lastday.setDate(lastday.getDate()+1);		
  		}
  		console.log("final total -->"+dateend);
  	}else{
  		content+=printmonth(date,dateend);
  	}
  	document.getElementById("calendar").innerHTML=content;
  }


  function printmonth(datebegin,dateend) {
  	var date = new Date(datebegin);
  	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  	var days = ["S","M","T","W","T","F","S"];
  	var end_date = new Date(dateend);
  	var content = "<div class='col-md-2' style='height:250px'><table><tr><th colspan=7 style='border-bottom:1px solid black'>"+months[date.getMonth()]+" "+date.getFullYear()+"</th></tr>";
  	for(j=0;j<7;j++){
  			content+="<th>"+days[j]+"</th>";
  	}
  	content+="</tr><tr>"
  	content+=space(date.getDay());
  	content+=numbers(date,end_date);
  	content+=space(6-end_date.getDay())+"</tr></table></div>";
  	return content;
  }

  function space(days){
	var spaces = ""
	for (i=0;i<days;i++){
		spaces+="<td class='gra'></td>";
	}
  	return spaces;
  }

  function numbers(start,end){
  	var content = "";
  	console.log(start);
  	console.log(holiday);
  	for (i=start.getDate(); i<= end.getDate();i++){
  		console.log(start);
  		if (holiday.holidays[start.toISOString().substring(0, 10)] !== undefined){
  			if (start.getDay() == 0){
	  			content+="<tr>";
	  		}
  			content+="<td class='ora'><div class='w3-tooltip'><span class='w3-text w3-tag tooltiptext'>"+holiday.holidays[start.toISOString().substring(0, 10)][0].name+"</span>"+i+"</div>";
  		}else{
  			if (start.getDay() == 0){
	  			content+="<tr><td class='yel'>"+i;
	  		}
	  		else if (start.getDay() == 6){
	  			content+="<td class='yel'>"+i;
	  		}
	  		else{
	  			content+="<td class='gre'>"+i;
	  		}
  		}
  		content+="</td>";
  		if (start.getDay() == 6){
  			content+="</tr>";
  		}
  		start.setDate(start.getDate()+1);
  	}
  	return content;
  }
