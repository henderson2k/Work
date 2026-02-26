# Prompt for credentials
$credential = Get-Credential

# Define the script path
$scriptPath = "ErgotronMassInstaller.ps1"

# Check if the script exists
if (-Not (Test-Path $scriptPath)) {
    Write-Host "The script file '$scriptPath' does not exist." -ForegroundColor Red
    exit
}

# Start the process using the credentials
try {
    Start-Process powershell.exe -ArgumentList "-File `"$scriptPath`"" -Credential $credential -NoNewWindow -ErrorAction Stop
    Write-Host "The script '$scriptPath' has been started successfully." -ForegroundColor Green
} catch {
    Write-Host "Failed to start the script. Error: $_" -ForegroundColor Red
}
