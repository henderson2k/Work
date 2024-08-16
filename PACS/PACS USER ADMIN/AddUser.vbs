
Set objHTML = CreateObject("htmlfile")
clipboardData = objHTML.parentWindow.clipboardData.getData("Text")

' Clipboard:  Firstname, Lastname, GMC, eMail, MothersMaidenName, Group, Username, Description,  Spec

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

Password = "pacs2024"


Function ClearField()
WshShell.SendKeys "^a"
WScript.Sleep 200
WshShell.SendKeys "{DELETE}"
WScript.Sleep 200
End Function

Function Sleep200()
WScript.Sleep 100
End Function

Function Sleep200TAB()
WScript.Sleep 100
WshShell.SendKeys "{TAB}"
End Function

Function Sleep200TABCLEAR()
WScript.Sleep 100
WshShell.SendKeys "{TAB}"
ClearField()
End Function


Dim WshShell, myVariable
myVariable = "Hello World!"

Set WshShell = WScript.CreateObject("WScript.Shell")

' Sleep for 5 seconds (5000 milliseconds)
WScript.Sleep 5000

ClearField()
WshShell.SendKeys LastName
Sleep200TABCLEAR()
WshShell.SendKeys FirstName
Sleep200TABCLEAR()
WshShell.SendKeys Description
Sleep200TAB()
WshShell.SendKeys "medical staff"
Sleep200TABCLEAR()
WshShell.SendKeys eMail
Sleep200TAB()
Sleep200TABCLEAR()
WshShell.SendKeys GMC
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TABCLEAR()
WshShell.SendKeys UserName
Sleep200TABCLEAR()
WshShell.SendKeys Password
Sleep200TABCLEAR()
WshShell.SendKeys Password
Sleep200TABCLEAR()
'WshShell.SendKeys "Mothers Maiden Name?"
Sleep200TABCLEAR()
WshShell.SendKeys MothersMaidenName
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
Sleep200TAB()
WshShell.SendKeys " "