// run this from Devtools after opening devtools from the equitrac site


function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const xsrfTokenValue = getCookieValue('XSRF-TOKEN');
console.log(xsrfTokenValue);

// CSV conversion function
function jsonToCsv(jsonData) {
  const items = jsonData.Items;
  if (!items || !items.length) return '';

  // Extract headers
  const headers = Object.keys(items[0]);
  const csvRows = [];

  // Add headers row
  csvRows.push(headers.join(','));

  // Add data rows
  for (const item of items) {
    const values = headers.map(header => {
      const escaped = ('' + item[header]).replace(/"/g, '""'); // Escape double quotes
      return escaped; // Do not wrap in double quotes
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

// Function to parse CSV and extract IDs and embeddedDeviceIds
function extractIdsAndEmbeddedDeviceIdsFromCsv(csvContent) {
  const lines = csvContent.split('\n'); // Split content into lines
  const ids = [];
  const embeddedDeviceIds = []; // Array to hold embedded device ids

  // Iterate through lines skipping the header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim(); // Trim any extra whitespace
    if (line !== '') {
      const fields = line.split(','); // Split line into fields
      const id = parseInt(fields[0]); // Extract ID from the first field
      const embeddeddeviceId = parseInt(fields[7]); // Extract embeddeddeviceid from the eighth field
      if (!isNaN(id)) { // Check if the ID is a valid number
        ids.push(id); // Add ID to the list
        if (embeddeddeviceId && embeddeddeviceId !== 0) { // Check if embeddeddeviceid is present and not zero
          embeddedDeviceIds.push(embeddeddeviceId); // Add embeddeddeviceid to the list
        }
      }
    }
  }

  return { ids, embeddedDeviceIds };  // Return the list of IDs and embedded device IDs
}

// Fetch data from the provided URL
fetch("https://eqcasv6-new/EQWebClient/SystemManager/API/PhysicalDevices?vm.Sorting.Column=name&vm.Sorting.Ascending=true&vm.Paging.PageSize=500&vm.Paging.Page=0", {
  headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-xsrf-token": xsrfTokenValue
  },
  referrer: "https://eqcasv6-new/EQWebClient/Areas/WebSystemManagerUi/wwwroot/?ver=1132827321",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "include"
})
.then(response => response.text()) // Fetch as text
.then(text => {
  // Remove unwanted characters before parsing
  const cleanedText = text.replace(/^\)\]\}',\n/, '');
  return JSON.parse(cleanedText);
})
.then(data => {
  // Convert JSON data to CSV
  const csvContent = jsonToCsv(data);
  console.log(csvContent); // Output CSV content
  
  // Extract IDs from CSV content
  const { ids, embeddedDeviceIds } = extractIdsAndEmbeddedDeviceIdsFromCsv(csvContent);
  console.log(ids); // Output the list of IDs
  console.log(embeddedDeviceIds); // Output the list of embeddedDeviceIds
  
  // Promise.all to wait for all fetch operations to complete
  return Promise.all(embeddedDeviceIds.map(embeddedDeviceId =>
    fetch(`https://eqcasv6-new/EQWebClient/systemmanager/api/devices/embedded/${embeddedDeviceId}`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-xsrf-token": xsrfTokenValue
      },
      referrer: "https://eqcasv6-new/EQWebClient/Areas/WebSystemManagerUi/wwwroot/?ver=1132827321",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
    .then(response => response.text())
    .then(data => {
      // Remove prefix
      const jsonData = data.substring(data.indexOf("{"));

      // Parse JSON
      const jsonObject = JSON.parse(jsonData);

      // Extract values
      const values = Object.values(jsonObject).map(value => {
        if (typeof value === 'object') {
          return JSON.stringify(value);
        } else {
          return value;
        }
      });

      return values.join(',');
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      return ''; // Return empty string in case of error
    })
  ));
})
.then(results => {
  // Combine all results into a single CSV
  const combinedCsv = results.join('\n');
  console.log(combinedCsv); // Output combined CSV
})
.catch(error => console.error("Error fetching data:", error));
