setTimeout(function() {
    // Read text from clipboard
    navigator.clipboard.readText()
      .then(text => {
       // console.log('Text from clipboard:', text);
  
//                 0          1       2             3          4               5           6             7                   8         9         
// Clipboard:  caller	   teams	configitem	devicetag	category 	contact type	assigngroup	short description	description	work notes


        var valuesArray = text.split(',').map(value => value.trim());
  var DescriptionArray = valuesArray[7].split('_').map(value => value.trim());
  console.log(valuesArray)
  console.log(DescriptionArray)
        // Log the array to the console for verification
     //   console.log('Array of values:', valuesArray);
  
       // Set PUMA form fileds Firstname, Surname, GMC/Registration
  document.getElementById('sys_display.incident.caller_id').value = valuesArray[0];

  setTimeout(() => {
    document.getElementById('incident.u_are_you_available_via_teams').value = valuesArray[1];
    document.getElementById('sys_display.incident.cmdb_ci').value = valuesArray[2];
    document.getElementById('sys_display.incident.u_device_tag').value = valuesArray[3];
    document.getElementById('incident.category').value = valuesArray[4];
    document.getElementById('incident.contact_type').value = valuesArray[5];
    document.getElementById('sys_display.incident.assignment_group').value = valuesArray[6];
    document.getElementById('incident.short_description').value = valuesArray[7];
    document.getElementById('incident.description').value = valuesArray[8];
    document.getElementById('').value = valuesArray[9];



    
    

}, 5000);

  


  

  }
  
  // Example usage:
  // Assuming you have an input element with id "myInput"
  const inputElement = document.getElementById('ctl00_ContentPlaceHolder1_txtSName');
  simulateEnterKeyPress(inputElement);
  
  // Add an event listener to verify the enter key press
  inputElement.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          console.log('Enter key pressed!');
          // Add your logic here that should execute on Enter key press
      }
  });
  
          
          
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }, 1); // Wait 5 seconds before executing the clipboard read and form submission
  
  
  