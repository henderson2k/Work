$htmlContent = @"
<!DOCTYPE html>
<html>
<body>
<div id="result"></div>
<script>
var source = new EventSource("http://localhost:8080/sse");
source.onmessage = function(event) {
    document.getElementById("result").innerHTML += event.data + "<br>";
    if (event.data === "DONE") {
        source.close();
    }
};
</script>
</body>
</html>
"@

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    if ($request.Url.LocalPath -eq "/") {
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($htmlContent)
        $response.ContentType = "text/html"
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }
    elseif ($request.Url.LocalPath -eq "/sse") {
        $response.Headers.Add("Content-Type","text/event-stream")
        $response.Headers.Add("Cache-Control","no-cache")
        $response.Headers.Add("Connection","keep-alive")
        $response.SendChunked = $true
        $writer = New-Object System.IO.StreamWriter($response.OutputStream)
        $writer.WriteLine("data: Starting jobs...")
        $writer.WriteLine()
        $writer.Flush()


                    $clipboard = Get-Clipboard
                    $cn = $clipboard.replace(" ","")

                    if ([string]::IsNullOrWhiteSpace($cn)) {
    $cn = "localhost"
    
    Write-Host "Clipboard was empty. Using default: $cn"
}


        $jobs = @(
            Start-Job -ScriptBlock {

param($cn1)

                while ($true) {
whi
                $pingResult = ping $cn1 -n 1
                $filteredLines = $pingResult | Select-String -Pattern "Reply from"
                $filteredLines | ForEach-Object {
    # Extract the relevant parts of the line
     
    $line = $_.Line
    if ($line -match "Reply from (\d+\.\d+\.\d+\.\d+): bytes=(\d+) time=(\d+)ms TTL=(\d+)") {
        $ipAddress = $matches[1]
        $bytes = $matches[2]
        $time = $matches[3]
        $ttl = $matches[4]
        $currentDateTime = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

        # Format the output with date and time
        "{0,-15} bytes={1,-4} time={2,-4}ms TTL={3} DateTime={4}" -f $ipAddress, $bytes, $time, $ttl, $currentDateTime
    }
}

                    if ($pingResult) {
                        [PSCustomObject]@{
                            Type = "Progress"
                            Message = $filteredLines
                                                                 #| 
                                #     ConvertTo-Json -Compress
                        }
                    } else {
                        [PSCustomObject]@{
                            Type = "Progress"
                            Message = "Ping failed: $(Get-Date -Format 'MM/dd/yyyy HH:mm:ss')"
                        }
                    }
                    Start-Sleep -Seconds 1
                }
            }  -ArgumentList $cn


            Start-Job -ScriptBlock {
                Start-Sleep -Seconds 2
                [PSCustomObject]@{
                    Type = "Complete"
                    Message = "Dude"
                }
            }
            Start-Job -ScriptBlock {
                Start-Sleep -Seconds 15
                [PSCustomObject]@{
                    Type = "Complete"
                    Message = "THERE"
                }
            }
        )

        while ($jobs[1..($jobs.Count-1)].State -contains "Running") {
            foreach ($job in $jobs) {
                $results = Receive-Job -Job $job
                foreach ($result in $results) {
                    $writer.WriteLine("data: $($result.Message)")
                    $writer.WriteLine()
                    $writer.Flush()
                }
            }
            Start-Sleep -Milliseconds 100
        }

        # Stop and remove the ping job after other jobs complete
        Stop-Job -Job $jobs[0]
        $jobs | Remove-Job

        $writer.WriteLine("data: DONE")
        $writer.WriteLine()
        $writer.Flush()
        $writer.Close()
    }
    else {
        $response.StatusCode = 404
        $content = "404 - Not Found"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }
    $response.Close()
}

$listener.Stop()