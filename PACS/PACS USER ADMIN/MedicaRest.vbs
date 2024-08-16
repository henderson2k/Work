' Create a FileSystemObject
Set fso = CreateObject("Scripting.FileSystemObject")

' Get the full path of the currently running script
scriptFullPath = WScript.ScriptFullName

' Get the directory of the script
currentDirectory = fso.GetParentFolderName(scriptFullPath)

' Create a WScript.Shell object
Set shell = CreateObject("WScript.Shell")

' Path to the VBScript file you want to run
scriptPath = currentDirectory & "\AddUser.vbs"




Set objHTML = CreateObject("htmlfile")
clipboardData = objHTML.parentWindow.clipboardData.getData("Text")














Function ClearField()
WshShell.SendKeys "^a"
WScript.Sleep 200
WshShell.SendKeys "{DELETE}"
WScript.Sleep 200
End Function

Function Sleep200()
WScript.Sleep 200
End Function

Function Sleep200TAB()
WScript.Sleep 200
WshShell.SendKeys "{TAB}"
End Function

Function Sleep50TAB()
WScript.Sleep 50
WshShell.SendKeys "{TAB}"
End Function

Function Sleep200TABCLEAR()
WScript.Sleep 200
WshShell.SendKeys "{TAB}"
ClearField()
End Function


Dim WshShell, myVariable
myVariable = "Hello World!"

Set WshShell = WScript.CreateObject("WScript.Shell")

' Sleep for 5 seconds (5000 milliseconds)
WScript.Sleep 5000
ClearField()
WshShell.SendKeys clipboardData
WshShell.SendKeys "{ENTER}"

' Define the message and title for the message box
Dim message, title
message = "Do you want to continue the script?"
title = "Continue or Exit"

' Display the message box with Yes and No buttons
Dim result
result = MsgBox(message, vbYesNo + vbQuestion, title)

' Check the result of the message box
If result = vbYes Then
' Run the script

Else
    WScript.Quit
End If

Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep200TABCLEAR()
WshShell.SendKeys "lanmedica2"
Sleep200TABCLEAR()
WshShell.SendKeys "lanmedica2"
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()
Sleep50TAB()



