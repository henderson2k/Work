formatSeconds = function (totalmins)  {
    if(Math.sign(totalmins) != -1){
      var mins= totalmins % 60;
      var hours = Math.floor(totalmins / 60);
      var days= Math.floor(hours / 24);
      var hourss = hours % 24;
     // return days+ ' Days '+ hourss + ' Hours '+ mins + ' Minutes ';
        return hours + ' Hours ' + mins + ' Minutes ';
    }
    else{
      var absTotal= Math.abs(totalmins);
      var mins= absTotal % 60;
      var hours = Math.floor(absTotal / 60);
      var days= Math.floor(hours / 24);
      var hourss = hours % 24;
    //  return days+ ' Days '+ hourss + ' Hours '+ mins + ' Minutes ';
          return hours + ' Hours ' + mins + ' Minutes ';
    }
}
// INC State: 1 = New, 2 = In Progress, 3 = On Hold, 4 = Resolved, 5 = Awaiting Info 
// RITM State: -5 = Pending, 1 = Open, 2 = Work In Progress, 3 = Closed Complete, 4 = Closed Incomplete, 5 = On Hold, 6 = ?, 7 = Closed Skipped

function highlightactivecalls(recordnumber, totalMinutes, recordState){
 url = window.location.href

 if (url.indexOf('nav_to.do') > 0) {
        var ifrm = document.getElementById('gsft_main')
        var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
        var element = doc.querySelector('[aria-label="Open record: ' + recordnumber +'"]');
  } else {
    var element = document.querySelector('[aria-label="Open record: ' + recordnumber +'"]');
  }

 
if (recordState <3){ //Not Held Records
let holdtip = formatSeconds(totalMinutes) + ' till breach'
if (totalMinutes < 1) {
 if (element) {element.parentNode.style.backgroundColor = 'gainsboro'; 
 element.parentNode.title = "Breached";}
} else if (totalMinutes < 60) {
 if (element) {element.parentNode.style.backgroundColor = 'red';
 element.parentNode.title = holdtip;}
} else if (totalMinutes < 240) {
 if (element) {element.parentNode.style.backgroundColor = 'tomato';
 element.parentNode.title = holdtip;}
} else if (totalMinutes < 600) {
 if (element) {element.parentNode.style.backgroundColor = 'orange';
 element.parentNode.title = holdtip;}
} else if (totalMinutes < 1200) {
 if (element) {element.parentNode.style.backgroundColor = 'PeachPuff';
 element.parentNode.title = holdtip;}
} else if (totalMinutes > 1200) {
 if (element) {element.parentNode.style.backgroundColor = 'transparent';
 element.parentNode.title = holdtip;}
}
} else if (recordState > 2){ //Held Records
let holdtip = 'Last update ' +  formatSeconds(totalMinutes) + ' ago'

if (totalMinutes < 240) {
 if (element) {element.parentNode.style.backgroundColor = 'transparent'; 
 element.parentNode.title = holdtip;}
} else if (totalMinutes > 240 && totalMinutes < 600) {
  if (element) {element.parentNode.style.backgroundColor = 'LightCyan'; 
 element.parentNode.title = holdtip;}
} else if (totalMinutes > 600) {
  if (element) {element.parentNode.style.backgroundColor = 'PaleTurquoise'; 
 element.parentNode.title = holdtip;}
} else if (totalMinutes > 1200) {
  if (element) {element.parentNode.style.backgroundColor = 'MediumTurquoise'; 
 element.parentNode.title = holdtip;}
}
}
};


function gettimediff(date1, date2, recordnumber, recordState){
const startHour = 8; // 8:00 AM
const endHour = 18; // 6:00 PM
// Calculate the number of milliseconds in a minute
const msInMinute = 60 * 1000;
// Calculate the start and end times in milliseconds
const startTime = new Date(date1).setHours(startHour, 0, 0, 0);
const endTime = new Date(date1).setHours(endHour, 0, 0, 0);
// Calculate the number of milliseconds in the valid time range
const msInRange = (endHour - startHour) * msInMinute;
// Calculate the difference in milliseconds
let diffInMs = 0;
currentDate = new Date(date1);
// console.log(currentDate)
while (currentDate < date2) {
const currentHour = currentDate.getHours();
const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6; // Sunday = 0, Saturday = 6
if (!isWeekend && currentHour >= startHour && currentHour < endHour) {
diffInMs += msInMinute;
}
currentDate.setTime(currentDate.getTime() + msInMinute);
}
// Calculate the difference in minutes
const diffInMinutes = diffInMs / msInMinute;
// Calculate the whole hours and remaining minutes
const days = Math.floor(diffInMinutes / (60 * 10));
const hours = Math.floor(diffInMinutes / 60);
const minutes = diffInMinutes % 60;
//console.log(`Diff: ${date1.toLocaleString()} and ${date2.toLocaleString()} between ${startHour}:00 AM and ${endHour}:00 PM (excluding weekends) is ${hours} hours and ${minutes} minutes.`);

highlightactivecalls(recordnumber, diffInMinutes, recordState)
}


async function fetchData() {
let url = 'https://nhsscotland.service-now.com/task_list.do?JSONv2&sysparm_clear_stack=true&sysparm_nostack=true&sysparm_query=assigned_to%3Db1daee481be7c4908a04c84b1d4bcbaa%5Eactive%3Dtrue%5EnumberNOT%20LIKEREQ%5Estate!%3D6%5EGROUPBYstate&sysparm_first_row=1&sysparm_view=';
const response = await fetch(url);
const data = await response.json();
//console.log(data);
return data
}



async function processRecords() { 
    let retdata = await fetchData()
if (retdata.records.length > 0) {
for (const record of retdata.records) {
  function addHours(date, hours) {
date.setTime(date.getTime() + hours * 60 * 60 * 1000);
return date;
}   
  const recordnumber = record.number;
  const recordState = record.state
  const recordsla_due = addHours(new Date(record.sla_due),1);
  const recordupdated = addHours(new Date(record.sys_updated_on),1)
  const date1 = new Date();

if (recordState < 3){ // Unheld records get differece between Now and SLA
await gettimediff(date1, recordsla_due, recordnumber, recordState)
} else if (recordState > 2){ // Held records, get differnece between Update and Now
await gettimediff(recordupdated, date1, recordnumber, recordState)    
}     
}
} else {
//console.log("No records found");
}
}


processRecords();
