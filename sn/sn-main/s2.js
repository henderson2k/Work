url = window.location.href 
var newArray  =""
main()//call main function
//$ = ''
async function main() {
   
if (url.indexOf('nav_to.do') > 0) { //Inbeded (full) ServiceNow interface   
   //var mdl = document.getElementsByClassName('modal-body');
   var ifrm = document.getElementById('gsft_main')
   var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document; 
  
 $ = function(id) {
  return doc.getElementById(id);
 };

} else {  // Pop-out

}
      


 if (url.indexOf('incident.do') > 1) {

        x = $('sys_readonly.incident.number');if (x) {casenumber1 = x.value};
        x = $('sys_display.incident.caller_id');if (x) {caller1 = x.value};
        x = $('sys_display.incident.location');if (x) {location1 = x.value};
        x = $('incident.u_contact_number');if (x) {contactnumber1 = x.value};
        x = $('sys_display.incident.u_device_tag');if (x) {asset1 = x.value};
        x = $('incident.description');if (x) {description1 = x.value};
        x = $('document_tags');if (x) {sysid1 = x.getAttribute("data-sys_id")};
     x = $('sn_form_inline_stream_container');if (x) {notez = x.innerHTML};
//   x = $('h-card-wrapper ng-scope activities-form');if (x) {notez = x.innerHTML};


//const string = 'startabcendstartxyzendstart123end';
// const pattern = /initials.*?pan>/g;
// const replacement = '~~~NEW~~~\r\n';

// notez2 = notez.replaceAll(pattern, replacement);
//console.log(result);
 
//var notez2 = notez.replaceAll('<span class="sn-avatar-initials" aria-hidden="true">',"~~~AVATAR~~~")

var notez2 = notez.replaceAll('<span class="sn-card-component-createdby">', "~~~CREATEDBY~~~")
//  var notez3 =  notez2.replaceAll(/<\/?[^>]+(>|$)/g, '');

 //   console.log(notez)

  var notez2 = notez2.replaceAll('<span class="sn-card-component-time">', "~~~NOTETYPE~~~")
var notez2 = notez2.replaceAll('<div class="date-calendar">', "~~~DATETIME~~~")
var notez2 = notez2.replaceAll(`<span class="sn-widget-textblock-body sn-widget-textblock-body_formatted">`,"~~~NOTEZ~~~")
var notez2 = notez2.replaceAll('<li class="h-card h-card_md h-card_comments">',"~~~ENTER~~~")
 var notez2 = notez2.replaceAll(`<span class="sn-avatar-initials" aria-hidden="true">`, "~~~AVATAR~~~")
notez2 = notez2.replaceAll(`<div class="sn-card-component_accent-bar sn-card-component_accent-bar_dark" style="background-color: gold">`, "~~~GOLD~~~")

 //<div class="sn-card-component_accent-bar sn-card-component_accent-bar_dark" style="background-color: gold"> 
  notez2 = notez2.replaceAll(`<div class="sn-card-component_accent-bar sn-card-component_accent-bar_dark" style="">`,"~~~DARK~~~")  

  notez2 = notez2.replaceAll('<br>', '~~~BR~~~')
  //sn-card-component-avatar sn-avatar_xs sn-avatar_v2
  var notez3 =  notez2.replaceAll(/<\/?[^>]+(>|$)/g, '');
var notez3 = notez3.replaceAll('~~~BR~~~','<br>')
  //var notez3 = notez3.replaceAll('~~~AVATAR~~~', "~~~AVATAR~~~ >")
  var notez3 = notez3.replaceAll('~~~AVATAR~~~',"")
  var notez3 = notez3.replaceAll('~~~CREATEDBY~~~', "  ")
  var notez3 = notez3.replaceAll('~~~NOTETYPE~~~', "~~~")
  var notez3 = notez3.replaceAll('~~~DATETIME~~~', "~~~")
  var notez3 = notez3.replaceAll('~~~NOTEZ~~~', "~~~BETWEEN~~~")
  var notez3 = notez3.replaceAll('~~~ENTER~~~', "")
  var notez3 = notez3.replaceAll('System','')
  var notez3 = notez3.replaceAll('Email sent','')
  var notez3 = notez3.replaceAll('Field changes','')
  var notez3 = notez3.replaceAll('•','')
  var notez3 = notez3.replaceAll('~~~BETWEEN~~~','~~~')
  var notez3 = notez3.replaceAll('~~~DARK~~~','~~~[DARK]~~~')
  var notez3 = notez3.replaceAll('~~~GOLD~~~','~~~[GOLD]~~~')
 // console.log(notez3)
  var array20 = notez3.split("~~~"); // Splits by ~~~
//console.log(array20)

function splitArrayIntoParts(array, chunkSize) {
  var result = [];
  for (var i = 0; i < array.length; i += chunkSize) {
    var chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}
  var splitArray = splitArrayIntoParts(array20, 5);  // Split the Array into chunks of 5 elements

//console.log(splitArray);


  const partToAdd = splitArray.map((array) => {
  const lastElement = array[array.length - 1];
  return `Part-${lastElement}`;
});




// Add the part to the beginning of each array
splitArray.forEach((array, index) => {
  array.unshift(partToAdd[index]);
});
 // console.log(splitArray)

const newArray = splitArray.map(array => [...array.slice(0, 4), "~~~note~~~", ...array.slice(4)]);
//console.log(newArray)
 
  const modifiedArrays = newArray.map(array => {
  const slicedElement = array[3].slice(0, 19);
  array[3] = slicedElement;
  return array;
});

 const modifiedArrays2 = newArray.map(array => {
  const lenofelement = array[1].length;
  array[1] = array[1].slice(4, lenofelement);
  return array;
});

  let updatedArrays = newArray.map(array => {
  return array.slice(0, 2).concat(array.slice(3));
});
//console.log(updatedArrays)
//let arraystring = updatedArrays.toString();
  
// console.log(arraystring)

var a2s = updatedArrays.toString().replace(/,/g, '');

a2s = a2s.replaceAll(`Part-[DARK]`,`<br><div style="background-color:WhiteSmoke; padding:10px; border-width: 13px 8px; border-radius: 15px">`)
a2s = a2s.replaceAll('[DARK]','</b></div>')
a2s = a2s.replaceAll('~~~note~~~','<BR></BR><b>')
a2s = a2s.replaceAll(`Part-[GOLD]`,`<br><div style="background-color:LightGoldenrodYellow; padding:10px; border-width: 13px 8px; border-radius: 15px">`)
a2s = a2s.replaceAll('[GOLD]','</b></div>')





  
  console.log(updatedArrays)

  
  
  
  
  
  
  // const newArray2 = newArray.map(array => {
//   const firstElement = array[3];
//   const trimmedFirstElement = firstElement.split(/\d{2}:\d{2}:\d{2}/)[0];
//   return [trimmedFirstElement.trim(), ...array.slice(1)];
// });

// console.log(newArray2)
  




  
  
//console.log(newArray);



// const  = newArray.map((array) => {
//   const lastElement = array[array.length - 1];
//   return `Part-${lastElement}`;
// });

// // Add the part to the beginning of each array
// newArray.forEach((array, index) => {
//   array.unshift(partToAdd[index]);
// });






  
// notez2 =notez.replace(/[\n\r]/g, '-CR-') 
  //  notez2 =notez.replace(/[\t]/g, '****CR****')
//const element = document.getElementById("form_stream");
//element.remove()

//var lesstags = notez.replace(/(<\/?(?:span)[^>]*>)|<[^>]+>/ig, '$1');

 // var lesstags2 = notez.replaceAll(/<(\/)?span([^>]*)>/g, '\n');
 //  cleanText = lesstags2.replace(/<\/?[^>]+(>|$)/g, "");

//     ''''''''''''
//     removeElementsByClass('sn-card-component-createdby')
// function removeElementsByClass(className){
//     const elements = document.getElementsByClassName(className);
   
//    for (var i = 0; i < elements.length; i++) {
//   var classnameinners = elements[i].innerText;

//       console.log(classnameinners)
//       elements[0].parentNode.parentNode.parentNode.removeChild(elements[0].parentNode.parentNode);
//  // elements[0].parentNode.removeChild(elements[0])
//    }
// //  while(elements.length > 0){
//      //   elements[0].parentNode.parentNode.parentNode.removeChild(elements[0].parentNode.parentNode);
//   //  }
// }
// ''''''''''''''''''''''''''    
   // doc.querySelectorAll('date-calendar').forEach(e => e.remove());

    
  //  const slides = document.getElementsByClassName("sn-card-component_accent-bar ");
//for (var i = 0; i < slides.length; i++) {
//slides.remove();
   // const parent = slides.parentNode; // no parenthesis ()
  // Distribute(slides.item(i));
//slides.parentElement.remove();
//}



    
 } else if (url.indexOf('sc_req_item') > 1) {

        x = $('sys_displayValue');if (x) {casenumber1 = x.value};
        x = $('sc_req_item.request.requested_for_label');if (x) {caller1 = x.value};
        x = $('sys_display.sc_req_item.u_location');if (x) {location1 = x.value};
        x = $('sc_req_item.u_contact_number');if (x) {contactnumber1 = x.value};
        x = $('sys_display.sc_req_item.u_device_tag');if (x) {asset1 = x.value};
        x = $('sc_req_item.description');if (x) {description1 = x.value};
        x = $('document_tags');if (x) {sysid1 = x.getAttribute("data-sys_id")};

    } else {
       console.log("Not an Incident or RITM")
       return;
    }






   

  
// var atext = "Hi "
//   var btext = '<a href="mailto:nhsscotland@service-now.com?subject=Re: caseno&body=Kit collected from IT Store">Kit Collected</a>'
var atext = caller1
   var btext = a2s
   var ctext = `<p style="font-family:"Courier New">` + btext + `</p>`


// //activity_field_filter_listbox
// const parent = doc.getElementById("activity_field_filter_listbox");

//  // Step 1: Get reference to the parent node
// //const parent = document.querySelector('#parentElement');

// // Step 2: Select all <span> elements within the parent node
// const spanElements = parent.querySelectorAll('span');

// // Create an empty array to hold the child element IDs
// const childElementIds = [];

// // Step 3: Iterate over each <span> element
// spanElements.forEach(span => {
//  const ariaChecked = span.getAttribute('aria-checked');
//   // Step 4: Select all child elements within the current <span> element
//   const childElements = span.querySelectorAll('input');

//   // Step 5: Iterate over each child element
//   childElements.forEach(child => {
//     // Step 6: Access the id attribute value
//     const childId = child.id;
    
//     // Add the child element ID to the array
//     childElementIds.push(childId + ', ' + ariaChecked);
//   });

// });
// //const array1 = childElementIds.split(",");
// //  console.log(array1[0]);
// //console.log(childElementIds)

// const extractedValues0 = childElementIds.map((element) => {
//   const parts = element.split(",");
//   return parts[0].trim();
// });

//  const extractedValues1 = childElementIds.map((element) => {
//   const parts = element.split(",");
//   return parts[1].trim();
// });

// // cost comb =  
// ////////////////////console.log(childElementIds);
 
// spanElements.forEach(function(ev) {
//   var childElement = document.getElementById(extractedValues0);

//   // Check if the child element exists
//   if (childElement) {
//     var parentElement = childElement.parentNode;

//     // Set the aria-checked property of the parent element
//     parentElement.setAttribute("aria-checked", childElement.checked = "true");
//   }
// });


 
// // Log the child element IDs in the console










 
await createtempdiv(ctext)   
await copyDivToClipboard()



      function createtempdiv(x){  
// create temp div for copy to clipboard content
const targetElement = $('page_timing_div');
const newElement = document.createElement('div');
  //newElement.textContent = atext + btext;
   newElement.innerHTML = x
newElement.setAttribute("id", "enddiv");
//newElement.style.visible = 'hidden';
targetElement.appendChild(newElement);
}

      function copyDivToClipboard() {
         var range = document.createRange();
         range.selectNode(document.getElementById("enddiv"));
         document.getSelection().removeAllRanges(); // clear current selection
         document.getSelection().addRange(range); // to select text
         document.execCommand("copy");
         //window.getSelection().removeAllRanges();// to deselect
         document.getElementById("enddiv").style.backgroundColor="red";
         //doc.getElementById("enddiv").style.display = "none";
        document.getElementById("enddiv").remove();
      }

}