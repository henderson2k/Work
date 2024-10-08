setTimeout(function() {
    // Read text from clipboard
  setTimeout(function() {
  var clearform = document.getElementById('ctl00_ContentPlaceHolder1_btnClear');
  
  if (clearform) {
    // Trigger a click event on the button
    clearform.click();
  } else {
   console.error('clear button not found.');
  }
  }, 1000); 
  
  navigator.clipboard.readText()
  .then(text => {
    var usernameInput = document.getElementById('ctl00_ContentPlaceHolder1_txtProfReg');
  
    console.log (text)
    if (text.includes(",")) {
  console.log ("has commas")
      var valuesArray = text.split(',').map(value => value.trim());
  
      usernameInput.value = valuesArray[2];
    } else {
      console.log("does not have comma")
      usernameInput.value = text
      
    }
    //                 0        1       2     3          4               5       6        7           8         
  // Clipboard:  Firstname, Lastname,  GMC, eMail, MothersMaidenName, Group, Username, Description,  Spec
  
  
  
  
   // console.log('Text from clipboard:', text);
  
    // Split the clipboard text by commas into an array  (Firstname, Lastname, Speciality/Department, Group, eMail, GMC/Registration, Description, UserName)
  
  
  
  
        
            // After setting the value, wait a bit before submitting the form
            setTimeout(function() {
                var submitButton = document.getElementById('ctl00_ContentPlaceHolder1_btnSaveRecord');
  
                // Check if the submit button exists
                if (submitButton) {
                    // Trigger a click event on the submit button
                    submitButton.click();
                } else {
                    console.error('Submit button not found.');
                }
            }, 1000); // Adjust this timeout as necessary to ensure the field value is set before submission
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
  
  }, 100); // Wait 5 seconds before executing the clipboard read and form submission
  