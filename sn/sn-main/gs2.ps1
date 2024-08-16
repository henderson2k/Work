param ($clipb)
  
function getdetail($vav) {
 # Boot time
   $BT = Get-Date -Format "yyyyMMddHHmmss"    
   $BT = [datetime]::parseexact($BT, 'yyyyMMddHHmmss', $null)        
   $lbt = wmic /node:$vav /OUTPUT:STDOUT os get LastBootUpTime | out-string 
   $lbt = $lbt -replace '\s' 
   $lbt = $lbt.substring(14,14)
   $lbt = [datetime]::parseexact($lbt, 'yyyyMMddHHmmss', $null)
   $lbt1 = $lbt.tostring("dddd dd MMMM yy @ hh:mm:ss")
   "Booted: <b>" + $lbt1 + " ({0:dd} days {0:hh\:mm\:ss}" -f (new-timespan $lbt $bt) + " ago)</b>"

 # Users
 "<small>"
 $qu = query user /server:$vav 
 $qu
"</small>"
 # OU
   $ou = [adsisearcher]"(&(objectCategory=Computer)(name=$vav))"
   $dn = $ou.FindAll().properties."distinguishedname"
   "OU: " + "<b>" + $dn.split(",")[1].replace("OU=","") + "</b><small>  (" + $dn.replace(",DC=nhsl,DC=lanarkshire,DC=scot,DC=nhs,DC=uk","") + ")</small>" 

 
# Serial No
  $sn = wmic /node:$vav BIOS GET SERIALNUMBER | findstr /v SerialNumber
  $sn = $sn.trim()
 "Serial:" + "<b>" + $sn + "</b>"

 $fds = wmic /Node:$vav LogicalDisk Where DriveType="3" Get DeviceID,FileSystem,FreeSpace,Size
"<br>"
#"<a style='font-weight:normal'>$fds</a>"
$fds
# msg console /server:localhost $vav + "  booted:  " + $lbt1 + "  (UP time: " + "{0:dd} days {0:hh\:mm\:ss}" -f (new-timespan $lbt $bt) + ")"








   



 <#
#--- Last boot time (req WinRM)
$lbt = Get-CimInstance -ClassName win32_operatingsystem -computername $vav | select-object csname, lastbootuptime
$lbt = $lbt."lastbootuptime"
$lbt1 = $lbt.tostring("dddd dd MMMM yyyy  hh:mm:ss")
$nowtime = Get-Date -Format "yyyyMMddHHmmss"  
$nowtime = [datetime]::parseexact($nowtime, 'yyyyMMddHHmmss', $null)  
$up = new-timespan $lbt $nowtime
"Last boot:  " + $lbt1 + " (" + $up.ToString("dd\ hh\:mm\:ss") + ")"


msg console /server:localhost "Last boot:  " + $lbt1 + " (" + $up.ToString("dd\ hh\:mm\:ss") + ")"


# ---- OU
$ou = [adsisearcher]"(&(objectCategory=Computer)(name=$vav))"
$dn = $ou.FindAll().properties."distinguishedname"
$dn.split(",")[1] + "</b><small>  (" + $dn + ")</small>" 


msg console /server:localhost $dn.split(",")[1] + "</b><small>  (" + $dn + ")</small>" 

 #----- get serial (req WinRTM)
 $cimSN = get-ciminstance -classname win32_bios -computername $vav | format-list serialnumber
 $cimSN = $cimSN.trim()
 #$cimSN
 #$cimSN2 = (Get-Content $cimSN -Raw).Replace("`r`n","`n") | Set-Content $cimSN -Force
# $cimSN2
 $serialn = Out-String -InputObject $cimSN -Width 100
 #$lensn =  $serialn.length
 $tsn = $serialn.substring(18,19)
 "Serial Number: " + $tsn.trim()

 msg console /server:localhost  "Serial Number: " + $tsn.trim()
 # below doesn't require WinRM

#$sessionoption = new-cimsessionoption -protocol dcom
#$cimsession = new-cimsession -sessionoption $sessionoption -computername $vav
#get-ciminstance win32_bios -cimsession $cimsession | format-list serialnumber
#-----

 # $un = gwmi win32_computersystem -comp D07902 | select Username
# $un."Username"

 #$uname = wmic /node:$vav COMPUTERSYSTEM GET USERNAME | findstr /v UserName
# $uname = $uname.trim()
 #$uname
 
 query user /server:$vav
 
 #$vool + " hiya"
 #$sn
 #ping $vav -n 1
 #enablePSRemoting($vav)

#>
 } 


 
 Function enablePSRemoting($vool) { # test on  remote windows 7 didn't work, tests on win 10 do ?!? 
     $SessionArgs = @{
         ComputerName  = $vool
         SessionOption = New-CimSessionOption -Protocol Dcom
     }
     $MethodArgs = @{
         ClassName     = 'Win32_Process'
         MethodName    = 'Create'
         CimSession    = New-CimSession @SessionArgs
         Arguments     = @{
             CommandLine = "powershell Start-Process powershell -ArgumentList 'Enable-PSRemoting -Force'"
         }
     }
     Invoke-CimMethod @MethodArgs
    $vool
     Get-CimInstance -ClassName win32_operatingsystem -ComputerName $$vool | Select-Object -Property csname, lastbootuptime
 
 #getdetail($vool)
 }
 
 
   
 
 
 function validate ($vv) {
    if (($vv.substring(0, 2) -match 'd[0-9]') -or ($vv.substring(0, 2) -match 'm[0-9]')  -or ($vv.substring(0, 2) -match 'gp') -or ($vv.substring(0, 5) -match 'nhsl[0-9]') -or ($vv.substring(0, 3) -match '10.')) {

        $result = Test-Connection -BufferSize 32 -Count 1 -ComputerName $vv -Quiet
        
         if ($result){
            
       getdetail($vv)
       
         } 
         else 
         
         {"<b style='color:red;'>Unable to connect to: </b>" +  $vv
       }

       }
       else {$vv + " is not a recognised asset/ip"}
       }
 
 $cb = Get-Clipboard 
 $cb = $cb.trim()
 # validate $cb
 validate $clipb
# C:\winupdatesview-x64\WinUpdatesView.exe /ComputerName $cb /Sort 'Install Date'
 
 