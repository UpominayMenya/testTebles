  var dataBase = localStorage.getItem('dataBase')? JSON.parse(localStorage.getItem('dataBase')	) :  [{"task":"Task 1", "taskProgress" : [{"date":"10.03", "progres" : "in work"}, {"date" : "17.03", "progres"  : "done"}]},{"task":"Task 2","taskProgress" : [{"date":"17.03", "progres" : "in work"}, {"date" : "24.03", "progres"  : "done"}]}, {"task":"Task 3", "taskProgress" : [{"date":"10.03", "progres" : "in work"}, {"date" : "17.03", "progres"  : "test"}, {"date" : "24.03", "progres" : "in work"}, {"date" : "31.03", "progres" : "done"}]}];
  //var dataBase = [{"task":"Task 1", "taskProgress" : [{"date":"10.03", "progres" : "in work"}, {"date" : "17.03", "progres"  : "done"}]},{"task":"Task 2","taskProgress" : [{"date":"17.03", "progres" : "in work"}, {"date" : "24.03", "progres"  : "done"}]}, {"task":"Task 3", "taskProgress" : [{"date":"10.03", "progres" : "in work"}, {"date" : "17.03", "progres"  : "test"}, {"date" : "24.03", "progres" : "in work"}, {"date" : "31.03", "progres" : "done"}]}];
  var arrOfDate = [];
  var arrOfTask = [];
  var arrprogress = {};
  var vision = false;

  var takeDataFromDataBase = () => {
  	arrOfDate = [];
  	arrOfTask = [];
    arrprogress = {};
  for(let i in dataBase){
  	
  	if(!arrOfTask.includes(dataBase[i]["task"])){
  		arrOfTask.push(dataBase[i]["task"]);
  		if(!arrprogress[dataBase[i]["task"]]) arrprogress[dataBase[i]["task"]] = {};
  		
  		for(let j in dataBase[i]["taskProgress"]){
  			if(!arrOfDate.includes(dataBase[i]["taskProgress"][j]["date"])){
  				arrOfDate.push(dataBase[i]["taskProgress"][j]["date"]);

  			}

  			

  			arrprogress[dataBase[i]["task"]][dataBase[i]["taskProgress"][j]["date"]] = dataBase[i]["taskProgress"][j]["progres"];
  		}
  	}
  	
  }

  for(let task of arrOfTask){
  	for(let date of arrOfDate){
  		if(!arrprogress[task][date]) arrprogress[task][date] = "";

	}
  }


  arrOfDate.sort();

}
takeDataFromDataBase();
  //отсортировать массивы, если порядок в бд рандомный и всё пофиксится))))

  var app7 = new Vue({
  el: '#main_block',
  data: {
    dateList : arrOfDate,
    taskList : arrOfTask,
    Progress : arrprogress,	
    progress_check: '',
    vision: vision
  },
  methods: {
  	Change: function(event){
  		let temp = false;
  		event.target.parentNode.classList = event.target.value;//потом над сделать так чтоб в бд менялась эта хуйня
  		for(var i in dataBase){
  			if(dataBase[i]["task"] === arrOfTask[event.target.parentNode.parentNode.rowIndex - 1] ){
  				for(let j in dataBase[i]["taskProgress"]){
  					if(dataBase[i]["taskProgress"][j]["date"] === arrOfDate[event.target.parentNode.cellIndex - 1]){
  						dataBase[i]["taskProgress"][j]["progres"] = event.target.value;
  						temp = true;
  						break;
  					}
  				}

  				if(!temp){
  					let tempObj = {};
  					tempObj["date"] = arrOfDate[event.target.parentNode.cellIndex - 1];
  					tempObj["progres"] = event.target.value;
  					dataBase[i]["taskProgress"].push(tempObj);
  				}	

  			}
  			
  		}

  		takeDataFromDataBase();	
  		app7.taskList = arrOfTask;
  		app7.dateList = arrOfDate;	
  		app7.Progress = arrprogress;
  	},
  	addTask: function(event){
  		let temp = prompt("Введите название задачи");

  		if(temp !== '' && temp !== null && !arrOfTask.includes(temp)){
  			let tempObj = {};
  			tempObj["task"] = temp;
  			tempObj["taskProgress"] = [];
  			dataBase.push(tempObj);
  		}
  		takeDataFromDataBase();
  		app7.taskList = arrOfTask;
  		app7.Progress = arrprogress;

  	},
  	addConfig: function(event){
  		vision = !vision;
  		app7.vision = vision; 		
  	},
  	addDate: function(event){
  		let temp = prompt("Введите нужную дату");
  		if(temp !== '' && temp !== null && !arrOfDate.includes(temp))
  			arrOfDate.push(temp);
  		arrOfDate.sort();
  		app7.dateList = arrOfDate;
  	},
  	reName: function(event){
  		let temp = prompt("Введите новое название");
  		if(event.target.parentNode.tagName === "TH"){
  			if(temp !== '' && temp !== null && !arrOfDate.includes(temp)){
  			
  					for(let i  in dataBase){
  						for(let j in dataBase[i]["taskProgress"]){
  							if(dataBase[i]["taskProgress"][j]["date"] === arrOfDate[event.target.parentNode.cellIndex - 1]){
  							  	dataBase[i]["taskProgress"][j]["date"] = temp;
  							}
  						}
  					}
  				//arrOfDate[event.target.parentNode.cellIndex - 1] = temp;
  			
  			}
	  	}
	  	else{
	  		if(temp !== '' && temp !== null && !arrOfTask.includes(temp)){
  			
  					for(let i  in dataBase){
  						if(dataBase[i]["task"] === arrOfTask[event.target.parentNode.parentNode.rowIndex - 1]){
  							dataBase[i]["task"] = temp;
  						}
  						
  					}
  			}
	  	}
  		takeDataFromDataBase();
  		app7.taskList = arrOfTask;
  		app7.dateList = arrOfDate;	
  		app7.Progress = arrprogress;
  	},
  	deleteButt: function(event){
  		if(event.target.parentNode.tagName === "TH"){
  			for(let i  in dataBase){
  						for(let j in dataBase[i]["taskProgress"]){
  							if(dataBase[i]["taskProgress"][j]["date"] === arrOfDate[event.target.parentNode.cellIndex - 1]){
  							  	dataBase[i]["taskProgress"].splice(j, 1);
  							}
  						}
  					}
  		}
  		else{
  			for(let i  in dataBase){
  						if(dataBase[i]["task"] === arrOfTask[event.target.parentNode.parentNode.rowIndex - 1]){
  							dataBase.splice(i, 1);
  						}
  						
  					}
  		}
  		takeDataFromDataBase();
  		app7.taskList = arrOfTask;
  		app7.dateList = arrOfDate;	
  		app7.Progress = arrprogress;
  	},
  	setLocalStorage: function(event){
  		localStorage.setItem('dataBase', JSON.stringify(dataBase));
  		takeDataFromDataBase();
  		app7.dateList = arrOfDate;
  		app7.taskList = arrOfTask;
  		app7.Progress = arrprogress;
  	}
  }
   
  	
})



