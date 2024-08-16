// PUMA Website needs to be open and logged in before opening devtool window and running this script from DEVTOOLS

// Update the textProfRegs array list below then copy response to PUMAGRAB tab in Spreadsheet



//const textProfRegs = []
//const textProfRegs = []
const textProfRegs = [7841039, 7650067, 7134203, 7511160, 7608027, 7625355, 7634932, 7634932, 7670682, 7608041, 7838257, 7513915, 7831059, 7495562, 7636327, 7756604, 7581868, 7929413, 7025039, 7554508, 7840972, 7717763, 7528356, 7528359, 7834974, 7540688, 7590274, 7494320, 7608082, 7453500, 7670723, 7539435, 7509656, 7586020, 7771277, 7608095, 7756644, 7540705, 7634981, 7460751, 7604495, 7728284, 7554547, 7460766, 7513974, 7554550, 7528411, 7752585, 7715248, 7495653, 7756675, 7560053, 7436588, 7543954, 7525226, 7949912, 7670779, 7883107, 7495097, 7841106, 7734825, 7608153, 7561438, 7717919, 7711580, 7844251, 7912408, 7775701, 7608164, 7485696, 7411448, 7949962, 7561438, 7561457, 7451855, 7949973, 7731095, 7597347, 7648265, 7528496, 7756741, 7545542, 7745745, 7604303, 7586093, 7620827, 7597368, 7878357, 7635089, 7411212, 7460897, 7460898, 7492011, 7809934, 7579959, 7950050, 7844308, 7655617, 7514821, 7648302, 7460924, 7604668, 7451902, 7950064, 7544108, 7601091, 7582471, 7670907, 7516761, 7835091, 7528581, 7840934, 7495801]

const fetchDataForTextProfReg = async(textProfReg)=>{
    const bodyContent = `ctl00%24ScriptManager1=ctl00%24ContentPlaceHolder1%24UpdatePanel1%7Cctl00%24ContentPlaceHolder1%24btnSaveRecord&ctl00%24ContentPlaceHolder1%24txtSName=&ctl00%24ContentPlaceHolder1%24txtFName=&ctl00%24ContentPlaceHolder1%24txtLoginName=&ctl00%24ContentPlaceHolder1%24ddlSpecialty=All&ctl00%24ContentPlaceHolder1%24ddlHB=All&ctl00%24ContentPlaceHolder1%24ddlGroupName=All&ctl00%24ContentPlaceHolder1%24txtEmailAddress=&ctl00%24ContentPlaceHolder1%24txtProfReg=${textProfReg}&ctl00%24ContentPlaceHolder1%24rblTrained=0&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUIMzEzNTE0MjAPFgQeCnNvcnRDb2x1bW4FASAeDXNvcnREaXJlY3Rpb24FASAWAmYPZBYCAgMPZBYCAgEPZBYGAgMPPCsADQIADxYCHgtfIURhdGFCb3VuZGdkDBQrAAQFCzA6MCwwOjEsMDoyFCsAAhYQHgRUZXh0BRFTZWFyY2ggZm9yIGEgVXNlch4FVmFsdWUFEVNlYXJjaCBmb3IgYSBVc2VyHgtOYXZpZ2F0ZVVybAUML3NlYXJjaC5hc3B4HgdFbmFibGVkZx4KU2VsZWN0YWJsZWceCERhdGFQYXRoBQwvc2VhcmNoLmFzcHgeCURhdGFCb3VuZGceCFNlbGVjdGVkZ2QUKwACFg4fAwUKQWRkIGEgVXNlch8EBQpBZGQgYSBVc2VyHwUFDS9hZGRVc2VyLmFzcHgfBmcfB2cfCAUNL2FkZHVzZXIuYXNweB8JZ2QUKwACFgwfAwUFQWRtaW4fBAUFQWRtaW4fBmcfB2gfCAUkMDUwZWY4YzQtNzI3Mi00ZWNlLWFlZjAtOTQzMmI1NmIzZTBjHwlnFCsAAgUDMDowFCsAAhYOHwMFD0NoYW5nZSBQYXNzd29yZB8EBQ9DaGFuZ2UgUGFzc3dvcmQfBQUaL0FkbWluL2NoYW5nZVBhc3N3b3JkLmFzcHgfBmcfB2cfCAUaL2FkbWluL2NoYW5nZXBhc3N3b3JkLmFzcHgfCWdkZAIFDxYCHhBTaG93U3RhcnRpbmdOb2RlaGQCEQ9kFgICAQ9kFgJmD2QWCgIVDxAPFgYeDURhdGFUZXh0RmllbGQFCENvbWJpbmVkHg5EYXRhVmFsdWVGaWVsZAUNc3BlY2lhbHR5Q29kZR8CZ2QQFYwBA0FsbBlDMiAtIEFjY2lkZW50ICYgRW1lcmdlbmN5FEExMSAtIEFjdXRlIE1lZGljaW5lG0cyMiAtIEFkb2xlc2NlbnQgUHN5Y2hpYXRyeQxBVyAtIEFsbGVyZ3kuUjcgLSBBbWJ1bGFuY2VtZW4vd29tZW4gLSBBY2NpZGVudCAmIEVtZXJnZW5jeRFDMyAtIEFuYWVzdGhldGljcxtDNTEgLSBBdWRpb2xvZ2ljYWwgTWVkaWNpbmUZUjggLSBBdWRpb2xvZ2ljYWwgc2NpZW5jZRBSODIgLSBBdWRpb21ldHJ5FkoyIC0gQmxvb2QgVHJhbnNmdXNpb24eSDFBIC0gQnJlYXN0IFNjcmVlbmluZyBTZXJ2aWNlFUM0MSAtIENhcmRpYWMgU3VyZ2VyeQ9BMiAtIENhcmRpb2xvZ3kbQzQgLSBDYXJkaW90aG9yYWNpYyBTdXJnZXJ5F0ozIC0gQ2hlbWljYWwgUGF0aG9sb2d5IkcyIC0gQ2hpbGQgJiBBZG9sZXNjZW50IFBzeWNoaWF0cnkWRzIxIC0gQ2hpbGQgUHN5Y2hpYXRyeRdSMSAtIENoaXJvcG9keS9Qb2RpYXRyeRZBMyAtIENsaW5pY2FsIEdlbmV0aWNzHUFWIC0gQ2xpbmljYWwgTmV1cm9waHlzaW9sb2d5FkgyIC0gQ2xpbmljYWwgT25jb2xvZ3kpQTUgLSBDbGluaWNhbCBQaGFybWFjb2xvZ3kgJiBUaGVyYXBldXRpY3MYUjIgLSBDbGluaWNhbCBwc3ljaG9sb2d5F0gxIC0gQ2xpbmljYWwgUmFkaW9sb2d5HEFGQSAtIENvbW11bml0eSBDaGlsZCBIZWFsdGgeRDEgLSBDb21tdW5pdHkgRGVudGFsIFByYWN0aWNlK1Q0MSAtIENvbW11bml0eSBsZWFybmluZyBkaXNhYmlsaXR5IG51cnNpbmcZVDIxIC0gQ29tbXVuaXR5IE1pZHdpZmVyeSlUNSAtIENvbW11bml0eSBudXJzaW5nIChkaXN0cmljdCBudXJzaW5nKSNUMzEgLSBDb21tdW5pdHkgcHN5Y2hpYXRyaWMgbnVyc2luZxpHMUEgLSBDb21tdW5pdHkgUHN5Y2hpYXRyeStGNCAtIENvbW11bml0eSBTZXh1YWwgJiBSZXByb2R1Y3RpdmUgSGVhbHRoJURCIC0gRGVudGFsICYgTWF4aWxsb2ZhY2lhbCBSYWRpb2xvZ3kTUkMgLSBEZW50YWwgSHlnaWVuZRlENyAtIERlbnRhbCBQdWJsaWMgSGVhbHRoHlJEIC0gRGVudGFsIFN1cmdlcnkgQXNzaXN0YW5jZRNSUyAtIERlbnRhbCB0aGVyYXB5EEE3IC0gRGVybWF0b2xvZ3kOQTgyIC0gRGlhYmV0ZXMbUksgLSBEaWFnbm9zdGljIHJhZGlvZ3JhcGh5DlIzIC0gRGlldGV0aWNzGVJHIC0gRGlzcGVuc2luZyBvcHRvbWV0cnkdQzUgLSBFYXIsIE5vc2UgJiBUaHJvYXQgKEVOVCkZUksyIC0gRWxlY3Ryb2NhcmRpb2dyYXBoeRxSSzEgLSBFbGVjdHJvZW5jZXBoYWxvZ3JhcGh5E0E4MSAtIEVuZG9jcmlub2xvZ3kdQTggLSBFbmRvY3Jpbm9sb2d5ICYgRGlhYmV0ZXMdRjFCIC0gRmFtaWx5IFBsYW5uaW5nIFNlcnZpY2UlREQgLSBGaXhlZCAmIFJlbW92YWJsZSBQcm9zdGhvZG9udGljcxhHMyAtIEZvcmVuc2ljIFBzeWNoaWF0cnkVQTkgLSBHYXN0cm9lbnRlcm9sb2d5HEQyIC0gR2VuZXJhbCBEZW50YWwgUHJhY3RpY2UVQTEgLSBHZW5lcmFsIE1lZGljaW5lFFQxIC0gR2VuZXJhbCBudXJzaW5nFUUxIC0gR2VuZXJhbCBQcmFjdGljZShHMSAtIEdlbmVyYWwgUHN5Y2hpYXRyeSAoTWVudGFsIElsbG5lc3MpFEMxIC0gR2VuZXJhbCBTdXJnZXJ5JUMxMSAtIEdlbmVyYWwgU3VyZ2VyeSAoZXhjbCBWYXNjdWxhcikcQUEgLSBHZW5pdG8tVXJpbmFyeSBNZWRpY2luZRdBQiAtIEdlcmlhdHJpYyBNZWRpY2luZRNFMTEgLSBHUCBPYnN0ZXRyaWNzHkUxMiAtIEdQIE90aGVyIHRoYW4gT2JzdGV0cmljcxBGMiAtIEd5bmFlY29sb2d5EEo0IC0gSGFlbWF0b2xvZ3kUVDYgLSBIZWFsdGggdmlzaXRpbmcSUjgxIC0gSGVhcmluZyBhaWRzE0oxIC0gSGlzdG9wYXRob2xvZ3kPQUMgLSBIb21lb3BhdGh5D0o1IC0gSW1tdW5vbG9neRtSNDEgLSBJbmR1c3RyaWFsIHRoZXJhcGlzdHMYQTYgLSBJbmZlY3Rpb3VzIERpc2Vhc2VzHENDIC0gSW50ZW5zaXZlIENhcmUgTWVkaWNpbmUYRzUgLSBMZWFybmluZyBEaXNhYmlsaXR5IFQ0IC0gTGVhcm5pbmcgZGlzYWJpbGl0eSBudXJzaW5nJEo2IC0gTWVkaWNhbCBNaWNyb2Jpb2xvZ3kgJiBWaXJvbG9neRVBRCAtIE1lZGljYWwgT25jb2xvZ3kaQVQgLSBNZWRpY2FsIE9waHRoYWxtb2xvZ3kYUk0gLSBNZWRpY2FsIHBob3RvZ3JhcGh5FFI5IC0gTWVkaWNhbCBwaHlzaWNzGlQzIC0gTWVudGFsIGhlYWx0aCBudXJzaW5nEko2MSAtIE1pY3JvYmlvbG9neQ5UMiAtIE1pZHdpZmVyeQ5BSCAtIE5ldXJvbG9neRFDNiAtIE5ldXJvc3VyZ2VyeRZSSzQgLSBOdWNsZWFyIG1lZGljaW5lFFQ4IC0gTnVyc2VyeSBudXJzaW5nD0YzIC0gT2JzdGV0cmljcx1GMSAtIE9ic3RldHJpY3MgJiBHeW5hZWNvbG9neRtGMzEgLSBPYnN0ZXRyaWNzIEFudGUtTmF0YWwbRjMyIC0gT2JzdGV0cmljcyBQb3N0LU5hdGFsGkFLIC0gT2NjdXBhdGlvbmFsIE1lZGljaW5lGVI0IC0gT2NjdXBhdGlvbmFsIFRoZXJhcHkSQzcgLSBPcGh0aGFsbW9sb2d5DlJIIC0gT3B0b21ldHJ5JEMxMyAtIE9yYWwgYW5kIE1heGlsbG9mYWNpYWwgU3VyZ2VyeRJENCAtIE9yYWwgTWVkaWNpbmUWREEgLSBPcmFsIE1pY3JvYmlvbG9neRNEOSAtIE9yYWwgUGF0aG9sb2d5EUQzIC0gT3JhbCBTdXJnZXJ5EUQ1IC0gT3J0aG9kb250aWNzD1JKIC0gT3J0aG9wdGljcxtBMjEgLSBQYWVkaWF0cmljIENhcmRpb2xvZ3kZRDggLSBQYWVkaWF0cmljIERlbnRpc3RyeRdDQSAtIFBhZWRpYXRyaWMgU3VyZ2VyeRBBRiAtIFBhZWRpYXRyaWNzFUMzMSAtIFBhaW4gTWFuYWdlbWVudBhBTSAtIFBhbGxpYXRpdmUgTWVkaWNpbmUcUlQgLSBQaGFybWFjZXV0aWNhbCBNZWRpY2luZQ1SQSAtIFBoYXJtYWN5HlJFIC0gUGh5c2lvbG9naWNhbCBNZWFzdXJlbWVudA9SQiAtIFBoeXNpb2xvZ3kSUjUgLSBQaHlzaW90aGVyYXB5FEM5IC0gUGxhc3RpYyBTdXJnZXJ5GlJGIC0gUHJvc3RoZXRpY3Mvb3J0aG90aWNzGkc0IC0gUHN5Y2hpYXRyeSBvZiBPbGQgQWdlEkc2IC0gUHN5Y2hvdGhlcmFweRtBTiAtIFB1YmxpYyBIZWFsdGggTWVkaWNpbmUcQVAgLSBSZWhhYmlsaXRhdGlvbiBNZWRpY2luZRNBRyAtIFJlbmFsIE1lZGljaW5lGUFRIC0gUmVzcGlyYXRvcnkgTWVkaWNpbmUaRDYgLSBSZXN0b3JhdGl2ZSBEZW50aXN0cnkRQVIgLSBSaGV1bWF0b2xvZ3kUVDExIC0gU2Nob29sIG51cnNpbmccVDcgLSBTaWNrIGNoaWxkcmVuJ3MgbnVyc2luZxtERSAtIFNwZWNpYWwgQ2FyZSBEZW50aXN0cnkgUjYgLSBTcGVlY2ggYW5kIExhbmd1YWdlIFRoZXJhcHkeQVMgLSBTcG9ydCAmIEV4ZXJjaXNlIE1lZGljaW5lF0RDIC0gU3VyZ2ljYWwgRGVudGlzdHJ5F1IxMSAtIFN1cmdpY2FsIFBvZGlhdHJ5HFJMIC0gVGhlcmFwZXV0aWMgcmFkaW9ncmFwaHkWQzQyIC0gVGhvcmFjaWMgU3VyZ2VyeSNDOCAtIFRyYXVtYSBhbmQgT3J0aG9wYWVkaWMgU3VyZ2VyeRZBNCAtIFRyb3BpY2FsIE1lZGljaW5lEVJLMyAtIFVsdHJhc29uaWNzDVVOSyAtIFVua25vd24MQ0IgLSBVcm9sb2d5FkMxMiAtIFZhc2N1bGFyIFN1cmdlcnkOSjYyIC0gVmlyb2xvZ3kYRjFBIC0gV2VsbCBXb21hbiBTZXJ2aWNlFYwBA0FsbAJDMgNBMTEDRzIyAkFXAlI3AkMzA0M1MQJSOANSODICSjIDSDFBA0M0MQJBMgJDNAJKMwJHMgNHMjECUjECQTMCQVYCSDICQTUCUjICSDEDQUZBAkQxA1Q0MQNUMjECVDUDVDMxA0cxQQJGNAJEQgJSQwJENwJSRAJSUwJBNwNBODICUksCUjMCUkcCQzUDUksyA1JLMQNBODECQTgDRjFCAkREAkczAkE5AkQyAkExAlQxAkUxAkcxAkMxA0MxMQJBQQJBQgNFMTEDRTEyAkYyAko0AlQ2A1I4MQJKMQJBQwJKNQNSNDECQTYCQ0MCRzUCVDQCSjYCQUQCQVQCUk0CUjkCVDMDSjYxAlQyAkFIAkM2A1JLNAJUOAJGMwJGMQNGMzEDRjMyAkFLAlI0AkM3AlJIA0MxMwJENAJEQQJEOQJEMwJENQJSSgNBMjECRDgCQ0ECQUYDQzMxAkFNAlJUAlJBAlJFAlJCAlI1AkM5AlJGAkc0Akc2AkFOAkFQAkFHAkFRAkQ2AkFSA1QxMQJUNwJERQJSNgJBUwJEQwNSMTECUkwDQzQyAkM4AkE0A1JLMwNVTksCQ0IDQzEyA0o2MgNGMUEUKwOMAWdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZGQCGQ8QDxYGHwwFCWJvYXJkTmFtZR8NBQtib2FyZENpcGhlch8CZ2QQFRMDQWxsEEF5cnNoaXJlICYgQXJyYW4HQm9yZGVycxVEdW1mcmllcyBhbmQgR2FsbG93YXkERmlmZQxGb3J0aCBWYWxsZXkOR29sZGVuIEp1YmlsZWUIR3JhbXBpYW4ZR3JlYXRlciBHbGFzZ293IGFuZCBDbHlkZQhIaWdobGFuZAtMYW5hcmtzaGlyZQdMb3RoaWFuHU5IUyBOYXRpb25hbCBTZXJ2aWNlIFNjb3RsYW5kBU5IUzI0Bk9ya25leQhTaGV0bGFuZAdUYXlzaWRlElRoZSBTdGF0ZSBIb3NwaXRhbA1XZXN0ZXJuIElzbGVzFRMDQWxsAUEBQgFZAUYBVgFKAU4BRwFIAUwBUwF4ATIBUgFaAVQBcAFXFCsDE2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dkZAIdDxAPFgYfDAUJZ3JvdXBOYW1lHw0FCWdyb3VwTmFtZR8CZ2QQFQ0DQWxsGWFjY291bnQgcmVnaXN0cmF0aW9uIG9ubHkOYWRtaW5pc3RyYXRvcnMLY29uc3VsdGFudHMNZ2VuZXJhbCB1c2Vycw1tZWRpY2FsIHN0YWZmCG1zX3VzZXJzCW9wZXJhdG9ycwlvcnRob3BvZHMNcmFkaW9ncmFwaGVycwxyYWRpb2xvZ2lzdHMUc3VwZXIgYWRtaW5pc3RyYXRvcnMIdHJhaW5pbmcVDQNBbGwZYWNjb3VudCByZWdpc3RyYXRpb24gb25seQ5hZG1pbmlzdHJhdG9ycwtjb25zdWx0YW50cw1nZW5lcmFsIHVzZXJzDW1lZGljYWwgc3RhZmYIbXNfdXNlcnMJb3BlcmF0b3JzCW9ydGhvcG9kcw1yYWRpb2dyYXBoZXJzDHJhZGlvbG9naXN0cxRzdXBlciBhZG1pbmlzdHJhdG9ycwh0cmFpbmluZxQrAw1nZ2dnZ2dnZ2dnZ2dnZGQCLQ8PFgIfAwUSU2hvd2luZyAxIHJlc3VsdHMuZGQCLw88KwARAwAPFgYfAmceC18hSXRlbUNvdW50AgEeF0ZpcnN0RGlzcGxheWVkUGFnZUluZGV4AgpkARAWABYAFgAMFCsAABYCZg9kFgYCAQ9kFhRmDw8WAh8DBQdhZ25zYTAxZGQCAQ8PFgIfAwUFU2FyYWhkZAICDw8WAh8DBQVBZ25ld2RkAgMPDxYCHwMFGjIyMzUyODNBQHN0dWRlbnQuZ2xhLmFjLnVrZGQCBA8PFgIfAwUHNzg0MTAzOWRkAgUPDxYCHwMFBlYsRyxMLGRkAgYPDxYCHwMFDW1lZGljYWwgc3RhZmZkZAIHDw8WAh8DBQJBMWRkAggPDxYCHwMFAk5vZGQCCQ9kFgJmDw8WAh8FBRplZGl0dXNlci5hc3B4P3VzZXJpZD01NzQ5M2RkAgIPDxYCHgdWaXNpYmxlaGRkAgMPDxYCHxBoZGQYAwUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgIFGGN0bDAwJExvZ2luU3RhdHVzMSRjdGwwMQUYY3RsMDAkTG9naW5TdGF0dXMxJGN0bDAzBSNjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJGd2UmVzdWx0cw88KwAMAQgCAWQFDWN0bDAwJG1udU1haW4PD2QFEVNlYXJjaCBmb3IgYSBVc2VyZC%2FHu%2Bs843HpimnCVCk0Dqrypav%2FBBds6lNWEIpwyr3E&__VIEWSTATEGENERATOR=BBBC20B8&__EVENTVALIDATION=%2FwEdAMIBebO43tT2AVKkn8S70J4IbPwOQfLIi%2B4%2Fm7%2FPBaJem19cW16j8IBp%2FdeQeYq5ZcRh9jPueHp2S9yz6AhZNsMn9jJXx264%2FuocapvWU3%2FL5YarA7MVZGXPz7LYmkbNaevocEZf3RQxvTIEFpeE5MLYSDzPfzfyqJSmrCshTj29CLkFl2udeFQMaCkQtMXVg%2BrIpPGYaTZyJ9lJpP%2BLk6kO2uTowmSvEZvCEPdkxekOmxu3ItF5jLQGUxJB5nPEM0VTCJQiMi%2FZs0jPY8anPz0NC3KAgwNPxhjgnzSprvNO1FXixAvGNmCA0vp%2F1cpB7Ag9Hf0bq0Ha2m0qdcO9Qste%2B584duhZMJjfPy63vcuxP3Hj5LmLfo24brXmw3MxToeeVb6iFxXMQwIPp4dRAsqiZfPj47zz3dtetOWx3UwmS6TRM5f6toxeD4wWq9FmOAEqQLqyr1NouXAQWsWddmQ%2BAB%2F0GT4pJiCNNm3qJ%2ByXzfSWVCpVLZ0BmgIL77RZPeImcpc0%2FyE2%2BVEz6gQp3lZpOWs1h8v0CXPYIEPAS4IYjkKds67N%2FIXJyyFapGzNZz7c2ssrS5UehPoH6LoQLJJxwF8T5UB8IYVOU51SYrvFHMiQ%2BoiP13jq%2Bm1CwQSiOFcFTeqcwyu5jnzJeAAvvyfLLpjVFhmOfBq0C4Bpqae3H3TMO79tJFrg3Y735%2FW1aTdfI59vPZedsRL4UieVxznn%2FYKSGNDufjA3T03D19WuiWAENWIvDQ8JbUdRMP5ynYAMOUKOWd3Leosqcxglv1f67R0zpbTxBwbnk77x7VZU%2BHnmS08%2B524YIcHLN3cZqaXuFAchXAH2rIMZIzn6nIWrpsADWpwGL5LBJ0%2B7KwYmFtQvqWxzTEhtyEw3kj3gOFr1LqOanozB11hNDf4%2FDWa3vpVlKT3TAKVkCiyJjiqDDDi2QtVAqS%2BpuDY6MKVdM%2BgMeYAcNcPsPP4hBKqDw%2BlMAANMsD0Y7zAbKnLmwM7scSUjFUJtZq%2Fz1iK8eEYq4OxtD7238Kry0CpF%2F3BwSBFbIs05xogJSQ2U739LSBkQkjdPPPUTFcwxf3RuZzN4AlNyiSbqgUqk6QewNZKQHw3iw4yfKx%2BKgHLXpVaNr6VBBbdjXgQii1q9fTOXsGtFIEDFY4LDVFFLUe%2BunI1rIyHZL%2Bje8Zc49yHm7Si7wjAa8N92mcRyVtCV473%2Bbh4zrNvdeKxaFz7pzrh6B0CTUrukksmAsIXciKtnERQL07YSZZUEebgOHl%2B54kzvHWaprW%2FWO57MlOyZeBPGqOJrMj92BC6EB5gHienstqforJQGNyse1F0Ik4vV6y0XvA9BaGK8%2FyvzUjOvGnPIYds0Y45W2mn9FgQ5Gpgcb2Rlc7aP8EpzPhfVx6Cr8yJ9aw1oSSVEIOQvmgJYodIELlWtaRYuRfsVXLGt%2BnCIUaC4wnNQyiV94bFiDKvTr6N76L4p3%2FsMekz2eH9Ob8BcDYEsWrjwvdUXVHTTvyHoQVdPT0pIH7Mmb%2BSqtiOX9okIvha%2F2N4a5MWaLSkNf7aCVDB5AfX0hJwyYNOeq1MRcTvz2%2FO5Cu6fwBAobVXJW2rE5ItV09rPWhXPuTJnv6W5E0MWm8ZJd%2FFdomLIqR4jwGYT6AKMMaVKaRaE6ly3j8KSFcpLsAetlUByPPiCdk7Kwx2ilJUJsxc%2BB1%2FiGG9Ap3ZCrh8r1HlM0r8of9QOSPTpl6h704A0fqv8Nhg13jXlsPajZpBY62hQIEGxtq25n1KyClPXoyIDio5n9cyKNWPL1CgtblXT4Spr%2BlLnofnfiIiCMJTiSbNC7UdqYC%2FDbrZTUxxcwrdSxhAmeAGub%2FOhixgpkauWBUYXI3s7FEtGmTv8oByHoCZBwvkbAwkXBjrX5ejV%2FVUJHPUtUfeEE25msbztsHjibFtMiK9VnPDCZ18pOe2w6vt89CgTG9y92JkyoKD7A%2FZ7QyyQYqaJ5iqwJbGcXQ3Ig1BwsdYeo%2BetvrdL92ktCxojbFXzURPKK%2F%2FCaIlv%2FPZSJMGh5EonUylEjRTZ2M8AruFczV1pJvC%2Bu1F9ulQ8DfCotbCZ3VGmqkWnWAbpliAgCDDj5vlVkxV6fXNjzIP1pZSqUF7%2B3wo%2FFsyXQTJ7JUBi%2FOUz9yqbOwpCK4smDh6%2FHRPdNPQgwiHWH0GLNECe3%2F3joQ22QuTG2kWGK%2FkWjMwRpLMENNHfJ%2B3NOIVs1MLZ0Puxwr%2FYLTJ4Li6KUbx81JYXYb3W9oHcaIF%2Bs2fVOA8M4w3%2FC0xBa5eiTdNbyz%2BaGX%2B3qdtZiUASQXzavgjirr%2FB%2B%2FN1yM48SCn%2FZwOZFV%2FGISdKacN%2FkWGa5jp7%2FBh1HNNySCyeTrRFrPM6RqhXklbLfp%2F6VLBg1GByD2MEjNQofUyjPUx%2BMrDIdSwr1r8KQrz5O%2B%2FX7Fe7MUy3jYcHYg9xNxadLHFLPh6YQYSGhsyWcyPEAEiu3UdK%2F5n3Fd1H5xmZwwI5VYfvo3YmBAPnLlUjvGY0%2FANrYjNyGRx5fXqcSlyc8YXRsl8mb4%2BhGpj009ryY8YmRhw63KBs%2FLbnu8ASnpmqHKc2tqT0dNwZjG8t762igMazYRoGPR6Tp7v%2BN8MN1KuWDmoI5MBW5UselSeeJ483qaGRhKQuI8JsIuzIXkAflUjA5c1MP8UwtrgOXQy%2F8QK483raa5YehTF0gojNVidfD05DXCbISsNAZBSt%2BH30Oco5flC%2Bqg7iz0V6CgROj3E%2BM5rmVmlwjJ1KaQyVJbIMHEXlSARzqYu3nsexHLxN3uq7cyEg5QBNeLApfT9QEn7cz0vBPGVZ53tLZ%2BSmTizApOLYtweeQBMxhU6COGsSXR2FODZnsrPtsvkPerRTbzwh9ivZo0cW33%2FEbVuEUOOFLubKkihZsQNns2LBnHlXrdZ9yeHJ8%2FJzvBU5CJOTUm9KdVGfNRsHT5Q%2BS%2FW2WhZ4rpyC8tTrZhtgdGuaR3BKMPH%2B10m5LzZeOtvg1D8wllEZxirO4Go9MQhco9DfyNXXNTOcgD2TbtW0QpDDfTcTyFvem067mihsInnRUP0r664OF1MqFzE6tsjKFU2os9z9NXxeJsgg2uaF2dMFDDyGiDkivTXNmhit%2FxkzLFYTVIuNGNI7HKdvFWYXOtstLY5aBEo5JkTdP8fln%2BGdml3hRUUFXCrV4EXaLwBPGEnHU5faIk%2FAVxMFvwQ9q%2BkO%2BxfFsZcvl3Y2MS4jYDq75MpxzcWNGnrMKtWKaQV2dG%2BEp1D0JvixU3COBIQOahTTqkpiS%2FQqnGK5I%2FuBdj%2FKkojN4neRhH15UNIOw42dC1LwFXlWkeTKxNRwviIiXRi9fKEn4r41hb%2BPgbgI%2Bz%2FITyFdSxCCUj4T2oVdzFvousjQj0nN9Gxlh8NY%2B4MQvOtaxMC%2BcdCWdpe4vyezDRCNNsiVXiJyrsC1ztY8bVNyF3rPpXUpoVfOEP4Wo%2Fgrjtq1hosUbl91awlSL2kQcPVHeUvSbdtTGURg%2Bqbn1qLcO%2FKRvJDx1mI4aYkS8bxdQ8uyNCEQJDFNcBojXUKtuMoj48bcg4EZzOBF1PgnfPcXuKE2zxSFGL44T1A4sjORW%2BUOwKNz0ILT%2B2X3DIpn7s6V3eTCM8hpZYzqR8eHeVKWNPsLEjUA%2FZCZHCXQn34tFGYtQT%2B0QR4%2FsBnjGC6UgfuK8SsENsgg02%2BHWyiWawyK2U2dHs7QGeaFXHVZnhwg5Mj3faIq3HHNM%2FN2%2FqdJn3XqvBDiBJXHC1dxsaybZmnhVv2YvAKqVuUVewiJgVitV2FlfYFWHa%2FdQfnJnAay3pxVsLj2M6nyRDIc3%2BRjeVTCXnegGCvTv%2F0dDiK5mEV3hBiFb%2BuCiNgRpoKhWWulaGDnZ%2FfWJ4FnT2pjRghWc30RmmNKePAOgT6VcwF3Q6bAol9ZIOAalaEgZQCVHKdISD53PkA7FeyMLDHS09iaeIYbncwjXy1U6t9u2C3N8sZwpB9dVFkyY28PdL80dTafDemf7sy%2FYc1bHJJw0cncNP8tZdWHxHsv2UePmYq%2F7jwbHGYyUIzICh0H2JDt6MLjbI%2FQ1cpSALx8iraSLz1MRIu%2F%2FgjVBmJbN85LSJbdypVBcm5PVNqt0KdiO2BiA%2BgrFrd9k0CwKKE9wvLpK%2BGfL9BK5NGbKxFBF5MkkqEUKCIaxeaeOMHS8edal1U4r%2B2JCg%3D%3D&__ASYNCPOST=true&ctl00%24ContentPlaceHolder1%24btnSaveRecord=Search`;

    try {
        const response = await fetch("https://www.puma.scot.nhs.uk/search.aspx", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Microsoft Edge\";v=\"126\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-microsoftajax": "Delta=true",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://www.puma.scot.nhs.uk/search.aspx",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": bodyContent,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });

        const htmlResponse = await response.text();

        // Create a new DOMParser
        const parser = new DOMParser();

        // Parse the HTML string into a DOM Document
        const doc = parser.parseFromString(htmlResponse, 'text/html');

        // Find the table element by its ID
        const table = doc.getElementById('ctl00_ContentPlaceHolder1_gvResults');

        // Check if the table exists
        if (table) {
            // Get all <td> elements within the table
            const cells = table.querySelectorAll('td');

            // Array to hold the HTML content of <td> elements
            const tdHTMLContent = [];

            // Loop through each <td> element and store its innerHTML
            cells.forEach(cell=>{
                tdHTMLContent.push(cell.innerHTML);
            }
            );

            function cleanAndConvertToCSV(arr) {
                return arr.map(item=>{
                    // Remove the specific HTML link text but keep the rest of the HTML
                    const cleanedItem = item.replace('edituser.aspx?userid=', '')//.replace('a href=', '').replace('>,', '###').replace(/</g, '').replace(/>/g, '')
                    .replace('a href=', '').replace("Edit</a>,", '').replace(/</g, '').replace(/>/g, '')// .replace(/"Edit<\/a>,/g, '###');
                    //   .replace('a href=', '').replace('"Edit</a>"', '@@@').replace(/</g, '').replace(/>/g, '')
                    //  .replace(/<\/a>/, '</a>')// Ensure the link ends correctly
                    // .replace(/"/g, '')

                    .replace(/Edit\/a/g, '#####')//  .replace(/#####, /g, 'xxx')
                    .replace(/#####/g, "").replace(/['"]/g, '')
                    // .replace(/^\s*[\r\n]/gm, '');
                    // Remove all quotation marks
                    return cleanedItem;
                }
                ).join(',');
            }

            // Convert to CSV
            const csvData = cleanAndConvertToCSV(tdHTMLContent);
            // Convert to CSV

            console.log(csvData);

            // Log or process tdHTMLContent as needed
            //   console.log(`${textProfReg}:`, tdHTMLContent);
        } else {
            console.log(`Table with ID ctl00_ContentPlaceHolder1_gvResults not found for textProfReg ${textProfReg}.`);
        }
    } catch (error) {
        console.error(`Error fetching data for textProfReg ${textProfReg}:`, error);
    }
}
;

textProfRegs.forEach(textProfReg=>{
    fetchDataForTextProfReg(textProfReg);

}
);
