setTimeout(function () {
    // Read text from clipboard
    navigator.clipboard.readText()
        .then(text => {
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

            // Function to safely set values in form fields
            function setValue(id, value) {
                const element = document.getElementById(id);
                if (element) {
                    element.value = value;
                } else {
                    console.warn(`Warning: Element with ID '${id}' not found.`);
                }
            }

            // Set PUMA form fields
            setValue('sys_display.incident.caller_id', valuesArray[0]);

            // Use another setTimeout to delay subsequent field population
            setTimeout(() => {
                setValue('incident.u_are_you_available_via_teams', valuesArray[1]);
                setValue('sys_display.incident.cmdb_ci', valuesArray[2]);
                setValue('sys_display.incident.u_device_tag', valuesArray[3]);
                setValue('incident.category', valuesArray[4]);
                setValue('incident.contact_type', valuesArray[5]);
                setValue('sys_display.incident.assignment_group', valuesArray[6]);
                setValue('incident.short_description', valuesArray[7]);
                setValue('incident.description', valuesArray[8]);
                setValue('incident.work_notes', valuesArray[9]);
            }, 5000);
        })
        .catch(error => {
            console.error('Error reading from clipboard:', error);
        });
}, 1);

