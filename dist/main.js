!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);let o=new Date;o.getMonth(),o.getDate(),o.getFullYear();function r(e){const t=document.getElementById("zip").value,n=document.getElementById("feelings").value;a("http://api.openweathermap.org/data/2.5/weather?zip=",t,"4ddfc73dcbfe30676b5536475ecb5055").then((function(e){console.log(e),c("/add",{temperature:e.main.temp,date:date,userResponse:n}).then(i("/all").then(setTimeout((function(){const e=document.getElementById("span loading");if(e){document.getElementById("loading").removeChild(e)}}),3e3)))})).then((function(e){const t=document.createElement("span");t.innerHTML="loading...",t.id="span loading";document.getElementById("loading").appendChild(t)}))}document.getElementById("generate").addEventListener("click",r);const a=async(e,t,n)=>{const o=await fetch(e+t+"&apikey="+n+"&units=imperial");try{const e=await o.json();return console.log(e),e}catch(e){console.log("error",e)}},c=async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{const e=await n.json();return console.log(e),e}catch(e){console.log("error",e)}},i=async(e="")=>{const t=await fetch(e);try{const e=await t.json();console.log(e),document.getElementById("date").innerHTML=e[0].date,document.getElementById("temp").innerHTML=e[0].temperature,document.getElementById("content").innerHTML=e[0].userResponse}catch(e){console.log("error",e)}};console.log(r),alert("I exist!")}]);