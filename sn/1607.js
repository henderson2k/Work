setTimeout(function() {
    // Read text from clipboard
    navigator.clipboard.readText()
      .then(text => {
       // console.log('Text from clipboard:', text);
  
//                 0          1       2     3          4               5       6        7           8         
// Clipboard:  Firstname, Lastname,  GMC, eMail, MothersMaidenName, Group, Username, Description,  Spec


        var valuesArray = text.split(',').map(value => value.trim());
  var DescriptionArray = valuesArray[7].split('_').map(value => value.trim());
  console.log(valuesArray)
  console.log(DescriptionArray)
        // Log the array to the console for verification
     //   console.log('Array of values:', valuesArray);
  
       // Set PUMA form fileds Firstname, Surname, GMC/Registration
  document.getElementById('ctl00_ContentPlaceHolder1_txtFName').value = valuesArray[0];
  document.getElementById('ctl00_ContentPlaceHolder1_txtSName').value = valuesArray[1];
  document.getElementById('ctl00_ContentPlaceHolder1_txtProfReg').value = valuesArray[2];
  document.getElementById('ctl00_ContentPlaceHolder1_txtEmailAddress').value = valuesArray[3];

  
  // Set Speciality
  var SpecialityDropdown = document.getElementById("ctl00_ContentPlaceHolder1_ddlSpecialty");
  var SpecialityValue = valuesArray[8];
  
  for (var i = 0; i < SpecialityDropdown.options.length; i++) {
      if (SpecialityDropdown.options[i].value === SpecialityValue) {
          SpecialityDropdown.selectedIndex = i;
          break;
      }
  }
  // Set Group
  var GroupDropdown = document.getElementById("ctl00_ContentPlaceHolder1_ddlGroupName");
  var GroupValue = valuesArray[5];
  
  for (var i = 0; i < GroupDropdown.options.length; i++) {
      if (GroupDropdown.options[i].value === GroupValue) {
          GroupDropdown.selectedIndex = i;
          break;
      }
  }
  
  
  // Set Board radio and fields
  document.querySelector('[tabindex="49"]').checked = true;  // Radio button to Lanarkshire
  document.querySelector('[tabindex="50"]').value = DescriptionArray[1]  // Site
  document.querySelector('[tabindex="51"]').value = DescriptionArray[3]  // Dept.
  document.querySelector('[tabindex="52"]').value = DescriptionArray[2]  // Grade
  
  
  
          
    // Function to simulate Enter key press
  function simulateEnterKeyPress(element) {
      // Create a new "Enter" event
      const event = new KeyboardEvent('keypress', {
          key: 'Enter',
          code: 'Enter',
          which: 13,
          keyCode: 13,
          bubbles: true,
      });
  
      // Dispatch the event on the specified element
      element.dispatchEvent(event);
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
  
  
  