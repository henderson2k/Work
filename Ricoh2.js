(async () => {
    const s = "https://scottish.sharepoint.com/sites/ASHTestTeam";
   
    // Redirect if not on the target SharePoint site
    if (!window.location.href.startsWith(s)) {
        window.open(s, "_blank");
        return;
    }
//
    // Relative file paths
    const f = "/sites/ASHTestTeam/Shared Documents/Ricoh/test.txt";
    const devFile = "/sites/ASHTestTeam/Shared Documents/Ricoh/Devices.txt";
    const pF = "/sites/ASHTestTeam/Shared Documents/Ricoh/postcodes.txt";
    const iF = "/sites/ASHTestTeam/Shared Documents/Ricoh/infoblox.csv";
    const mF = "/sites/ASHTestTeam/Shared Documents/Ricoh/Mac.txt";

    // Helper function to safely parse CSV columns (handles quotes and internal commas without infinite loops)
    const parseCSVLine = (text) => {
        const p = [[]];
        let q = false;
        let i = 0;
        
        while (i < text.length) {
            const c = text[i];
            const n = text[i + 1];
            
            if (c === '"') {
                if (q && n === '"') {
                    p[p.length - 1].push('"');
                    i += 2;
                } else {
                    q = !q;
                    i++;
                }
            } else if (c === ',' && !q) {
                p.push([]);
                i++;
            } else {
                p[p.length - 1].push(c);
                i++;
            }
        }
        return p.map(arr => arr.join("").trim());
    };

    try {
        console.log("Reading clipboard content...");
        const c = await navigator.clipboard.readText();

        console.log("Fetching Request Digest token...");
        const r = await fetch(`${s}/_api/contextinfo`, {
            method: "POST",
            headers: { Accept: "application/json;odata=verbose" }
        });
        const d = await r.json();
        const g = d.d.GetContextWebInformation.FormDigestValue;

        // API Endpoint Construction
        const u = `${s}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(f)}')/$value`;
        const devUrl = `${s}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(devFile)}')/$value`;
        const pUrl = `${s}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(pF)}')/$value`;
        const iUrl = `${s}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(iF)}')/$value`;
        const mUrl = `${s}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(mF)}')/$value`;

        // 1. Fetch and Parse Postcodes Map
        const pcMap = new Map();
        const pcR = await fetch(pUrl, { method: "GET" });
        if (pcR.ok) {
            const pcText = await pcR.text();
            pcText.split(/\r?\n/).forEach(line => {
                if (!line.trim()) return;
                const cols = parseCSVLine(line);
                if (cols && cols[0] && cols[1]) {
                    pcMap.set(cols[0].toLowerCase().trim(), cols[1].trim());
                }
            });
        }

        // 2. Fetch and Parse Infoblox CSV Map (Regex text scanner ignores line-breaks inside quotes)
        const ibMap = new Map();
        const ibR = await fetch(iUrl, { method: "GET" });
        if (ibR.ok) {
            const ibText = await ibR.text();
            
            // Clean out quote blocks containing hidden newlines so line splits remain aligned
            const normalizedText = ibText.replace(/"([^"]*)"/g, (match, capture) => {
                return '"' + capture.replace(/\r?\n/g, " ") + '"';
            });

            normalizedText.split(/\r?\n/).forEach((line, idx) => {
                if (!line.trim() || idx === 0) return; 
                
                const cols = parseCSVLine(line);
                if (cols && cols.length > 2) {
                    const rawIpKey = cols[0] ? cols[0].trim() : "";
                    const ipMatch = rawIpKey.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/);
                    
                    const typeValue = cols[2] ? cols[2].trim() : "";
                    
                    if (ipMatch && typeValue) {
                        const lookupKey = ipMatch[0].toLowerCase();
                        ibMap.set(lookupKey, typeValue);
                    }
                }
            });
        }

        // 3. Fetch and Parse Mac.txt Map
        const macMap = new Map();
        const macR = await fetch(mUrl, { method: "GET" });
        if (macR.ok) {
            const macText = await macR.text();
            macText.split(/\r?\n/).forEach(line => {
                if (!line.trim()) return;
                const cols = parseCSVLine(line);
                if (cols && cols[0]) {
                    macMap.set(cols[0].toLowerCase().trim(), {
                        col2: cols[1] ? cols[1].trim() : "",
                        col3: cols[2] ? cols[2].trim() : ""
                    });
                }
            });
        }

        // 4. Fetch current Devices.txt (or fallback to test.txt) so existing blank-serial rows preserve column alignment
        let o = "";
        const devR = await fetch(devUrl, { method: "GET" });
        if (devR.ok) {
            o = await devR.text();
        } else {
            const fR = await fetch(u, { method: "GET" });
            if (fR.ok) {
                o = await fR.text();
            } else if (fR.status !== 404) {
                alert(`❌ Failed to read existing file: ${fR.status}`);
                return;
            }
        }

        // Row Parsing and Mapping Processor Function
        const processTextToArray = t => {
            if (!t) return [];
            return t.split(/\r?\n/).map(line => {
                if (!line.trim()) return null;
                let cleanLine = line.replace(/\r$/, "");
                if (cleanLine.endsWith(",")) cleanLine = cleanLine.slice(0, -1);

                let cols = [];
                if (cleanLine.includes(",")) {
                    cols = parseCSVLine(cleanLine);
                } else {
                    // Preserve leading spaces if reading from fixed-width padded file with empty serial
                    const hasEmptyLeadingCol = /^\s{4,}/.test(cleanLine);
                    cols = cleanLine.trim().split(/\s{2,}/).map(v => v.replace(/"/g, "").trim());
                    if (hasEmptyLeadingCol) {
                        cols.unshift("");
                    }
                }

                // Allow rows with empty serial number as long as there is other data on the line
                if (!cols || cols.every(c => !c)) return null;

                const firstColLower = (cols[0] || "").toLowerCase();
                if (firstColLower.startsWith("embeddedserialnumber") || firstColLower === "serial") {
                    return ["Serial", "Name", "Postcode", "NetworkAddress", "MAC", "IPfixed", "ModelName", "DceServerId", "Model"];
                }

                let nameVal = cols[1] || "";
                nameVal = nameVal.replace("Physical Device at ", "").replace(".nhsl.lanarkshire.scot.nhs.uk", "").trim();

                let netAddrRaw = cols[3] || "";
                let netAddrCleaned = netAddrRaw.replace(".nhsl.lanarkshire.scot.nhs.uk", "").trim();
                const netAddrLookupKey = netAddrRaw.toLowerCase().trim();

                let rawPostcode = cols[2] || "";
                if (rawPostcode.includes(",")) {
                    rawPostcode = rawPostcode.replace(/,/g, "").trim();
                }

                const origLoc = rawPostcode.toLowerCase().trim();
                let postcodeVal = rawPostcode;
                if (origLoc && pcMap.has(origLoc)) {
                    postcodeVal = pcMap.get(origLoc);
                }

                let typeVal = "";
                if (netAddrLookupKey && ibMap.has(netAddrLookupKey)) {
                    typeVal = ibMap.get(netAddrLookupKey);
                }

                if (typeVal === "IPv4 Fixed Address") {
                    typeVal = "Fixed";
                }

                let macCol2Val = "";
                let macCol3Val = "";
                if (netAddrLookupKey && macMap.has(netAddrLookupKey)) {
                    const macData = macMap.get(netAddrLookupKey);
                    macCol2Val = macData.col2;
                    macCol3Val = macData.col3;
                }

                return [
                    (cols[0] || "").trim(),
                    nameVal,
                    postcodeVal,
                    netAddrCleaned,
                    macCol2Val,
                    typeVal,
                    cols[4] || "",
                    cols[5] || "",
                    macCol3Val
                ];
            }).filter(row => row !== null);
        };

        // 5. Merge old and new parsed arrays (using fallback key when Serial is missing)
        const oRows = processTextToArray(o);
        const cRows = processTextToArray(c);
        
        const uniqueMap = new Map();
        [...oRows, ...cRows].forEach(row => {
            if (!row) return;
            const serial = row[0] ? row[0].trim() : "";
            // Use Serial as primary key; if empty, use Name + NetworkAddress so blank-serial rows don't overwrite each other
            const uniqueKey = serial !== "" 
                ? serial.toLowerCase() 
                : `NO_SERIAL_${(row[1] || "").toLowerCase()}_${(row[3] || "").toLowerCase()}`;
            
            uniqueMap.set(uniqueKey, row);
        });
        const combinedRows = Array.from(uniqueMap.values());

        // 6. Generate Comma-Separated Values Layout for Devices.txt
        const commaSeparatedContent = combinedRows.map(row => {
            return row.map(cell => (cell.includes(",") ? `"${cell}"` : cell)).join(",");
        }).join("\n");

        // 7. Dynamic Fixed Width Column Formatting Engine for test.txt
        const numCols = combinedRows[0] ? combinedRows[0].length : 0;
        const colWidths = Array(numCols).fill(0);

        combinedRows.forEach(row => {
            row.forEach((cell, idx) => {
                if (cell.length > colWidths[idx]) {
                    colWidths[idx] = cell.length;
                }
            });
        });

        const formattedLines = combinedRows.map(row => {
            return row.map((cell, idx) => {
                if (idx === numCols - 1) return cell;
                return cell.padEnd(colWidths[idx] + 4, " ");
            }).join("");
        });

        const paddedContent = formattedLines.join("\n");

        // 8. Save padded layout text back to test.txt
        console.log("Saving test.txt...");
        const p1 = await fetch(u, {
            method: "POST",
            body: paddedContent,
            headers: {
                "X-RequestDigest": g,
                "X-HTTP-Method": "PUT",
                "IF-MATCH": "*"
            }
        });

        // 9. Save comma-separated text to Devices.txt
        console.log("Saving Devices.txt...");
        const p2 = await fetch(devUrl, {
            method: "POST",
            body: commaSeparatedContent,
            headers: {
                "X-RequestDigest": g,
                "X-HTTP-Method": "PUT",
                "IF-MATCH": "*"
            }
        });

        if (p1.ok && p2.ok) {
            alert("🚀 Both files (test.txt & Devices.txt) updated successfully!");
        } else {
            alert(`⚠️ Update status - test.txt: ${p1.status}, Devices.txt: ${p2.status}`);
        }

    } catch (err) {
        console.error(err);
        alert(`❌ Error processing script: ${err.message}`);
    }
})();