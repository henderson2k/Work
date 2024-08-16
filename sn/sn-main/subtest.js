url = window.location.href

main()

function main() {

    if (url.indexOf('nav_to.do') > 0) {
  //   var mdl = document.getElementsByClassName('modal-body');
       var ifrm = document.getElementById('gsft_main')
       var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
   } else {
       var doc = document
   }


    


      
    $ = function(id) {return doc.getElementById(id)};
    
    if (url.indexOf('incident.do') > 1) {
        
        x = $('sys_readonly.incident.number');if (x) {casenumber1 = x.value};
        x = $('sys_display.incident.caller_id');if (x) {caller1 = x.value};
        x = $('sys_display.incident.location');if (x) {location1 = x.value};
        x = $('incident.u_contact_number');if (x) {contactnumber1 = x.value};
        x = $('sys_display.incident.u_device_tag');if (x) {asset1 = x.value};
        x = $('incident.description');if (x) {description1 = x.value};
        x = $('document_tags');if (x) {sysid1 = x.getAttribute("data-sys_id")};
        
    } else if (url.indexOf('sc_req_item') > 1) {

        x = $('sys_displayValue');if (x) {casenumber1 = x.value};
        x = $('sc_req_item.request.requested_for_label');if (x) {caller1 = x.value};
        x = $('sys_display.sc_req_item.u_location');if (x) {location1 = x.value};
        x = $('sc_req_item.u_contact_number');if (x) {contactnumber1 = x.value};
        x = $('sys_display.sc_req_item.u_device_tag');if (x) {asset1 = x.value};
        x = $('sc_req_item.description');if (x) {description1 = x.value};
        x = $('document_tags');if (x) {sysid1 = x.getAttribute("data-sys_id")};

    } else {
       console.log("Not an Incident or RITM")
       return;
    }


    console.log(casenumber1)
    
description1 = description1.replace(/[\n]/g, '<br>'); 
description1 = description1.replace(/%/g,"PERCENT");   
description1 = description1.substring(0, 1500);

}