var idNames = [
    "#square1",
    "#square2",
    "#square3",
    "#square4",
    "#square5",
    "#square6",
    "#square7",
    "#square8"
  ];
  
  
var classNames = [
    "square1",
    "square2",
    "square3",
    "square4",
    "square5",
    "square6",
    "square7",
    "square8"
  ];
  
var positions = [
	[-350,350],
	[-350, 0, 350],
	[-350, -100, 100, 350],
	[-350, -150, 0, 150, 350],
	[-350, -200, -50, 50, 200, 350],
	[-350, -200, -100, 0, 100, 200, 350],
	[-350, -200, -100, -50, 50, 100, 200, 350],
];
  

function divide() {
	
	if (sorted()) {
		return;
	}
	
	var innerhtml = document.getElementById("partition").innerHTML;
    partitions = innerhtml.split(",").map(Number);
	
	color_array();
		
	segNum = partitions.length-1;
	
	for (let i = 0; i<segNum; i++) {
		getPartition((partitions[i]+1), (partitions[i+1]));
	}
	
	// get in new partitions after all been called
	var innerhtml = document.getElementById("partition").innerHTML; 
    partitionsNew = innerhtml.split(",").map(Number);
	segNumNew = partitionsNew.length-1;
	
	newPos = positions[segNumNew-2];
	
	// now for each partition move it to its new position
	for (let i = 0; i<segNumNew; i++) {
		divideMove(partitionsNew[i]+1, partitionsNew[i+1], newPos[i]);
	}
		
}

function sorted() {
	array = getInCurrentHeight();
	sortedArray = JSON.parse(JSON.stringify(array));
	sortedArray.sort();
	if (JSON.stringify(array)==JSON.stringify(sortedArray)){
		return true;
	}
	return false;
}

function sorted(first, second) {
	array = getInCurrentHeight();
	segment = array.slice(first,second);
	sortedArray = JSON.parse(JSON.stringify(segment));
	sortedArray.sort();
	if (JSON.stringify(segment)==JSON.stringify(sortedArray)){
		return true;
	}
	return false;
}

function getPartition(first, second) {
      
   if (sorted(first, second+1)) {
		return;
   }
   
   array = getInCurrentHeight();
   point = aniPartition(array, first, second);

   var innerhtml = document.getElementById("partition").innerHTML;
   boundaries = innerhtml.split(",").map(Number);
   
   indicatePivot(point);
   
	if (point==0) {
	   boundaries.push(0);
	} else if (!(boundaries.includes(point)) && (point>=1)) {
	   boundaries.push(point);
   } else {
	   boundaries.push(point-1);
   }
   
   boundaries = [...new Set(boundaries)];
   boundaries = sort(boundaries,0,(boundaries.length-1));
   document.getElementById("partition").innerHTML = boundaries;

}

function divideMove(start, end, position) {
	for (i=start; i<=end; i++) {
		 var move = anime({
			targets: idNames[i],
			translateX : position,
			duration: 1000, 
			delay: anime.stagger(500),
			easing: 'easeInOutQuad'
		});
   }
}

function aniPartition(A, p, r) { 
    
  var pivot = A[r];
  var i = p - 1;
    
  for (let j = p; j < r; j++) {
    if (A[j] <= pivot) {
      i = i + 1;
	  if (A[i]!=A[j]) {
		swap(A[i], A[j], i, j);
		var temp = A[i];
		A[i] = A[j];
		A[j] = temp;
	  }
    }
  }
  
  if (A[i+1]!=A[r]) {
	swap(A[i+1], A[r], i+1, r);
  }
  var temp = A[i+1];
      A[i+1] = A[r];
      A[r] = temp;
  return i + 1;
}

function swap(value1, value2, index1, index2) { //value 1 will be in index 2 and value 2 will be in index 1 (index 1 is the presently former location of value 1)
	var swap1 = anime({
		targets: idNames[index2],
		height : value1*20,
		duration: 1000, 
		delay: anime.stagger(500),
		innerHTML: value1, //its former location comes with it 
		easing: 'easeInOutQuad',
		background: 'rgb(161, 229, 140)'
	}, 400);
	
	var swap2 = anime({
		targets: idNames[index1],			
		height : value2*20,
		innerHTML: value2,
		duration: 1000,
		delay: anime.stagger(500),
		easing: 'easeInOutQuad',
		background: 'rgb(161, 229, 140)'
	}, 400);
}

function indicatePivot(pivot) {
	var pivot = anime({
			targets: idNames[pivot],
			duration: 1000, 
			delay: anime.stagger(500),
			easing: 'easeInOutQuad',
			background: ' rgb(255,193,204)'
			}, 400);
}

function aniSolve() {
  var array = getInCurrentHeight();
  array = sort(array, 0, array.length-1); 
  height_array(array);
}

function reset() {
	
   var innerhtml = document.getElementById("aux").innerHTML;
   formerArray = innerhtml.split(",").map(Number);
   	
   for (i = 0; i<8; i++) {
	  var square = anime({
      targets: idNames[i],
      height: formerArray[i]*20,
      translateX: 0,
      innerHTML: formerArray[i],
      duration: 1000,
      delay: anime.stagger(1000),
	  background: '#a020f0'
    });
   }
   
   document.getElementById("partition").innerHTML = "-1,7";
   
}

function aniConquer() {
	if (sorted()) {
		for (i = 0; i<8; i++) {
			var square = anime({
			  targets: idNames[i],
			  translateX: 0,
			  duration: 1000
			});
		}
	}
}

function partition(A, p, r) {
  var pivot = A[r];
  var i = p - 1;
  for (let j = p; j < r; j++) {
    if (A[j] <= pivot) {
      i = i + 1;
      var temp = A[i];
      A[i] = A[j];
      A[j] = temp;
    }
  }
  var temp = A[i + 1];
  A[i + 1] = A[r];
  A[r] = temp;
  return i + 1;
}

function sort(A, p, r) {
  if (p < r) {
    let split = partition(A, p, r); 
    sort(A, p, split - 1);
    sort(A, split + 1, r);
  }
  return A;
}

function height_array(array) {  
  
  for (i = 0; i < 8; i++) {
    var height = array[i]*20;
    var square = anime({
      targets: idNames[i],
      height: height,
	  innerHTML: height/20,
      duration: 1000,
      delay:anime.stagger(1000),
	  background: 'rgb(160,32,240)'
    });
  }
}

function color_array() {  
  for (i = 0; i<8; i++) {
	var square = anime({
	  targets: idNames[i],
	  background: 'rgb(160,32,240)'
	});
  }
}

function getValue() {
  var array = {};
  while (array.length != 8) {
    const list = prompt("Please provide a comma-separated list of eight values: ");
    var array = list.split(",").map(Number);
  }
  
  height_array(array);
  document.getElementById("aux").innerHTML = array;
  document.getElementById("partition").innerHTML = "-1,7";

}
   

function getInCurrentHeight(){
  var array = [];

  for (i = 0; i < 8; i++) {
    var name = classNames[i];
    var element = document.getElementById(name);
    var style = window.getComputedStyle(element);
    var height = style.getPropertyValue('height');
    array.push(parseInt(height)/20);
  };
  return array;
}

