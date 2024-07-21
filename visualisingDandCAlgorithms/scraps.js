/*
This file has some of the discarded code that is not used in the project 
but is provided to show the evolution of the program. 
*/

//This is the old version of divide that calculates the divide distance, instead of using a pre-definined position. 
function aniDivide(level, first, second, i) {
  
   array = getInCurrentHeight();
   
   point = aniPartition(array, first, second);

   var innerhtml = document.getElementById("partition").innerHTML;
   partitions = innerhtml.split(",").map(Number);
   
   indicatePivot(point);
   
   if ((point == 1) && !(partitions.includes(1))) {
	   partitions.push(1);
   } else if (point==0 && !(partitions.includes(1))){
	   partitions.push(1);
		point = 1;
   } else if (!(partitions.includes(point-1)) && (point>=1)) {
		partitions.push(point-1);
    }
   
   partitions = sort(partitions,0,(partitions.length-1));
   document.getElementById("partition").innerHTML = partitions;

   var swaps = parseInt(document.getElementById("swaps").innerHTML);   
      	  
   if (swaps!=0) {
	   if ((second!=7 && point!=first) || level==0) {
		   divideMove(point, second, positions[level][i-1]);
	   }
	   
	   if (first!=0 || level==0) {
		   divideMove(first, point, positions[level][i]);
	   }
   }
   
}

//A function that returns the current x position of each CSS square 
function getCurrentXValue(square) {
  
	var name = classNames[square];
    var style = window.getComputedStyle(document.getElementById(name));
    var xPosition = style.getPropertyValue('background-position-x');
	return parseInt(xPosition);
}