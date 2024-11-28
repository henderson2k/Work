setTimeout(function () {
    // Read text from clipboard
    navigator.clipboard.readText()
        .then(text => {
            // Log the clipboard text for debugging
            console.log('Text from clipboard:', text);

            // Parse clipboard content into an array
            var valuesArray = text.split(',').map(value => value.trim());

            // Ensure the array contains enough elements
            if (valuesArray.length < 10) {
                console.error('Error: Clipboard text does not contain enough fields.');
                return;
            }

            // Further split the 8th value for additional details if needed
            var DescriptionArray = valuesArray[7].split('_').map(value => value.trim());
            console.log('Parsed values:', valuesArray);
            console.log('Description breakdown:', DescriptionArray);

            // Set PUMA form fields
            document.getElementById('sys_display.incident.caller_id').value = valuesArray[0];

            // Use another setTimeout to delay subsequent field population
            setTimeout(() => {
                try {
                    document.getElementById('incident.u_are_you_available_via_teams').value = valuesArray[1];
                    document.getElementById('sys_display.incident.cmdb_ci').value = valuesArray[2];
                    document.getElementById('sys_display.incident.u_device_tag').value = valuesArray[3];
                    document.getElementById('incident.category').value = valuesArray[4];
                    document.getElementById('incident.contact_type').value = valuesArray[5];
                    document.getElementById('sys_display.incident.assignment_group').value = valuesArray[6];
                    document.getElementById('incident.short_description').value = valuesArray[7];
                    document.getElementById('incident.description').value = valuesArray[8];
                    document.getElementById('incident.work_notes').value = valuesArray[9];
                } catch (error) {
                    console.error('Error setting form fields:', error);
                }
            }, 5000); // 5-second delay for subsequent operations
        })
        .catch(error => {
            console.error('Error reading from clipboard:', error);
        });
}, 1); // Minimal delay before initiating clipboard read
