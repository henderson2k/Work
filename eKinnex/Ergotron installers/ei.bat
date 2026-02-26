@echo off
setlocal

REM Define variables
set "computerName=M17794"
set "file=\\hrm-repos-01\CSOData\Andrew\Ergotron\Ergotron_StyleLink_Client_8.0.10_setup.exe"
set "remoteFile=C$\Windows\Temp\Ergotron_StyleLink_Client_8.0.10_setup.exe"
set "keyPath=HKLM\SOFTWARE\WOW6432Node\Ergotron\StyleLink"
set "valueName=ApiKey"
set "valueData=8c930380-42ad-4ca8-8c5c-1c7f5770373f"
set "valueType=REG_SZ"

REM Start RemoteRegistry service
echo Starting RemoteRegistry service on %computerName%...
wmic /node:%computerName% service where "name='RemoteRegistry'" call startservice
wmic /node:%computerName% service where "name='RemoteRegistry'" call change startmode='Auto'

REM Wait a bit for the service to start
timeout /t 10 /nobreak >nul

REM Copy the file to the remote computer
echo Copying file to %computerName%...
wmic /node:%computerName% process call create "cmd.exe /c copy \"%file%\" \"%remoteFile%\""

REM Install the software remotely
echo Installing software on %computerName%...
wmic /node:%computerName% process call create "cmd.exe /c start /wait \"%remoteFile%\" /S /v/qn"

REM Set registry key remotely
echo Setting registry key on %computerName%...
echo REG ADD "\\%computerName%\%keyPath%" /v "%valueName%" /t %valueType% /d "%valueData%" /f | wmic /node:%computerName% process call create "cmd.exe /c %"

REM Stop and start the Ergotron StyleLink Service remotely
echo Restarting Ergotron StyleLink Service on %computerName%...
wmic /node:%computerName% service where "name='Ergotron StyleLink Service'" call stopservice
wmic /node:%computerName% service where "name='Ergotron StyleLink Service'" call startservice

echo Done.
endlocal
