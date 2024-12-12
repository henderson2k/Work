@echo off
:MENU
rem cls
echo ========================================
echo          Select an option:
echo ========================================
echo 1. Show current directory contents
echo 2. Display system information
echo 3. Run a custom command
echo 4. Ping the contents of the clipboard
echo 5. Exit
echo ========================================
choice /c 12345 /n /m "Choose an option (1-5):"

if errorlevel 5 exit /B
if errorlevel 4 goto PING_CLIPBOARD
if errorlevel 3 goto CUSTOM_CMD
if errorlevel 2 goto SYS_INFO
if errorlevel 1 goto SHOW_DIR

:SHOW_DIR
dir
pause
goto MENU

:SYS_INFO
systeminfo
pause
goto MENU

:CUSTOM_CMD
set /p cmd=Enter your custom command: 
%cmd%
pause
goto MENU

:PING_CLIPBOARD
echo Pinging the contents of the clipboard...
:: Use mshta and JavaScript to get the clipboard content
for /f "usebackq tokens=* delims=" %%i in (`mshta "javascript:Code(close(new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1).Write(clipboardData.getData('Text'))));"`) do set clipboard=%%i
ping %clipboard% -n 1 | find "Reply from"
rem pause
goto MENU
