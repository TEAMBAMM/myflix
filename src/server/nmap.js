const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default
let quickscan = new nmap.QuickScan('192.168.1.1-100');

quickscan.on('complete', function(data){
  console.log(data);
});

quickscan.on('error', function(error){
  console.log(error);
});