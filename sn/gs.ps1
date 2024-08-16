param ($clipb)
  


function validate ($v) {
if (($v.substring(0, 2) -match 'd[0-9]') -or ($v.substring(0, 2) -match 'm[0-9]')  -or ($v.substring(0, 2) -match 'gp') -or ($v.substring(0, 5) -match 'nhsl[0-9]') -or ($v.substring(0, 3) -match '10.')) {

 $result = Test-Connection -BufferSize 32 -Count 1 -ComputerName $v -Quiet
 
  if ($result){
     

ping $v -n 1
# start-process powershell -WindowStyle hidden -argument "./gsb.ps1 $clipb"

# write-host "pinged" #
  } 
  else 
  
  {"<b style='color:red;'>Unable to connect to: </b>" +  $v
}


}

else {$v + " is not a recognised asset/ip"}
}

# $cb = Get-Clipboard 
# $cb = $cb.trim()

validate $clipb


#Start-Process ./test.ps1 $clipb # short for: Start-Process -FilePath ng -ArgumentList server
#start-process powershell -argument "./rwrm.ps1 $clipb"
#Add-Type -AssemblyName PresentationCore,PresentationFramework
#[System.Windows.MessageBox]::Show($clipb)

# Start-Sleep 2 #
# "hi" #
# & .\progress.ps1 #
