(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[788],{6186:function(e,t,o){Promise.resolve().then(o.bind(o,6713))},6713:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return d}});var s=o(7437),r=o(29),n=o.n(r),a=o(2265),c=o(4295),i=o(9089);let f=(0,o(8680).io)();function d(e){let{sendDataToParent:t}=e,[o,r]=(0,a.useState)(""),[d,m]=(0,a.useState)([]),[g,l]=(0,a.useState)(!1),[u,b]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=sessionStorage.getItem("messages");e&&m(JSON.parse(e))},[]),(0,a.useEffect)(()=>{function e(){l(!0)}function o(){l(!1)}return f.connected&&e(),f.on("connect",e),f.on("disconnect",o),f.on("response",e=>{b(!1),console.log("Received response:",e);let o={sender:"bot",text:e};m(e=>{let s=[...e,o];return sessionStorage.setItem("messages",JSON.stringify(s)),t(s),s})}),()=>{f.off("connect",e),f.off("disconnect",o),f.off("response")}},[t]);let p=()=>{if(!o)return;let e={sender:"user",text:o};m(o=>{b(!0);let s=[...o,e];return sessionStorage.setItem("messages",JSON.stringify(s)),t(s),s}),console.log("messages=",d),f&&g?(console.log("Socket is connected, sending message..."),f.emit("message",o)):console.error("Socket is not initialized or not connected"),r("")};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"jsx-44c6c384c94b6b72 w-auto flex justify-stretch items-center p-2 bg-slate-200 m-2 rounded",children:[(0,s.jsx)("input",{type:"text",placeholder:"Ask the chatBot here..",value:o,onChange:e=>r(e.target.value),className:"jsx-44c6c384c94b6b72 flex-grow p-2 border border-transparent rounded focus:outline-none focus:ring-0 focus:border-gray-500"}),o&&g&&(0,s.jsx)(c.ghy,{className:"text-gray-600 size-8 mx-2 cursor-pointer",onClick:()=>p()}),u&&(0,s.jsx)(i.fCD,{className:"text-gray-600 size-8 mx-2",style:{animation:"spin 1s linear infinite"}})]}),(0,s.jsx)(n(),{id:"44c6c384c94b6b72",children:"@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}"}),(0,s.jsx)("div",{className:"jsx-44c6c384c94b6b72"})]})}f.on("connect",()=>{console.log("Socket connected:",f.id)}),f.on("disconnect",()=>{console.log("Socket disconnected:",f.id)}),f.on("response",e=>{console.log("Received response:",e)})}},function(e){e.O(0,[699,452,96,971,117,744],function(){return e(e.s=6186)}),_N_E=e.O()}]);