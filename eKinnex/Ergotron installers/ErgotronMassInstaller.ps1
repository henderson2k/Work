# Read computer names from the text file into an array
$computerNames = Get-Content -Path "$PWD\4install.txt"

$file = "\\hrm-repos-01\CSOData\Andrew\Ergotron\Ergotron_StyleLink_Client_8.0.10_setup.exe"

$keyPath = "HKLM:\SOFTWARE\WOW6432Node\Ergotron\StyleLink"
$valueName = "ApiKey"
$valueData = "8c930380-42ad-4ca8-8c5c-1c7f5770373f"
$valueType = "String"

foreach ($computerName in $computerNames) {
    Write-Host "Processing computer: $computerName"

    # Check if the computer is reachable
    if (Test-Connection -ComputerName $computerName -Count 1 -ErrorAction SilentlyContinue) {
        Write-Host "Computer is reachable, proceeding with actions."
        
        Set-Service -Name "RemoteRegistry" -Computer $computerName -StartupType "Automatic"
        $desiredStatus = "Running"
        $service = Get-Service -ComputerName $computerName -Name 'RemoteRegistry'
        $service.Start()
        $service.WaitForStatus($desiredStatus)

        # Establish a remote PowerShell session
        $session = New-PSSession -ComputerName $computerName

        Copy-Item -Path $file -ToSession $session -Destination 'c:\windows\temp\Ergotron_StyleLink_Client_8.0.10_setup.exe'

        # Use Invoke-Command to execute commands on the remote computer
        Invoke-Command -Session $session -ScriptBlock {
            # Install Ergotron from c:\windows\temp
            Start-Process -FilePath "c:\windows\temp\Ergotron_StyleLink_Client_8.0.10_setup.exe" -ArgumentList '/S /v/qn' -Verb runas -Wait

            # Create a new registry key
            # New-ItemProperty -Path $using:keyPath -Name $using:valueName -Value $using:valueData -PropertyType $using:valueType

            # When the install is done, it should create the Registry key, which we set with the line below
            Set-ItemProperty $using:keyPath -Name $using:valueName -Value $using:valueData
        }

        # Close the remote session
        Remove-PSSession -Session $session

        # Stop and (re)start the service
        $Ergotronrservice = Get-Service -ComputerName $computerName -Name 'Ergotron StyleLink Service'
        $Ergotronrservice.Stop()
        $Ergotronrservice.Start()
    }
    else {
        Write-Host "Computer is not reachable. Skipping."
    }
}
