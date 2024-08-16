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


' Clipboard:  Firstname, Lastname, GMC, eMail, MothersMaidenName, Username, Description, Group, Spec
Dim csvString, values, FirstName, LastName, GMC, eMail, MothersMaidenName, Username, Description, Group, Spec

csvString = clipboardData

' Split the CSV string into an array
values = Split(csvString, ",")

' Assign the values from the array to individual variables
FirstName = values(0)
LastName = values(1)
GMC = values(2)
eMail = Values(3)
MothersMaidenName = values(4)
Group = values(5)
UserName = values(6)
Description = values(7)
Spec = values(8)












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
WshShell.SendKeys Username
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
shell.Run "wscript """ & scriptPath & """", 1, True
Else
    WScript.Quit
End If











