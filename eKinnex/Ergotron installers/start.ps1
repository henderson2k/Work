# Hard-coded username
$username = "nhsl\hendersonand_admin"

# Prompt for password securely
$password = Read-Host -AsSecureString "Enter password"

# Create a PSCredential object with the username and the password
$credential = New-Object System.Management.Automation.PSCredential($username, $password)

# Start the process using the credentials
Start-Process powershell.exe -ArgumentList '-File "ErgotronMassInstaller.ps1"' -Credential $credential -NoNewWindow

