(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{572:function(t,e,r){var content=r(591);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(124).default)("6c6ea87a",content,!0,{sourceMap:!1})},575:function(t,e,r){"use strict";r.d(e,"a",(function(){return m}));r(303);var n=r(60),o=r(56),c=r(57),l=r(307),d=r(158),h=r(237),f=r(112),v=(r(13),r(18),r(116),r(239)),M=r.n(v),j=r(218),w=r(404);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(h.a)(this,r)}}var m=function(t){Object(d.a)(h,t);var e,r=y(h);function h(t,e){var n;return Object(o.a)(this,h),(n=r.call(this,t)).userWords=e,n.locationsForge=M.a.createInstance({name:"locations"}),n}return Object(c.a)(h,[{key:"initialize",value:(e=Object(n.a)(regeneratorRuntime.mark((function t(){var e,r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.a)(Object(f.a)(h.prototype),"initialize",this).call(this);case 2:return e=this.book.key(),t.next=5,this.locationsForge.getItem(e);case 5:if(!(r=t.sent)){t.next=10;break}this.book.locations.load(r),t.next=15;break;case 10:return t.next=12,this.book.locations.generate(10);case 12:return n=t.sent,t.next=15,this.locationsForge.setItem(e,n);case 15:this.on("content",this.registerEventListenersOfHighlights.bind(this)),this.book.spine.hooks.content.register(this.hightlight.bind(this));case 17:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"hightlight",value:function(t){var e=this,body=t.body;this.emit("processing:start"),body.querySelectorAll("vocab").forEach((function(t){var r=t.textContent.toLowerCase();switch(e.userWords[r]){case w.UserWordStatus.KNOWN:case w.UserWordStatus.LEARNING:t.className=e.userWords[r];break;default:t.className=w.UserWordStatus.UNKNOWN}})),this.emit("processing:end")}},{key:"registerEventListenersOfHighlights",value:function(t){var e=this;t.body.querySelectorAll("vocab").forEach((function(element){element.onclick=function(t){e.emit("word-click",element),t.stopPropagation()}}))}},{key:"highlightTextNode",value:function(t){}},{key:"registerThemes",value:function(){this.rendition.themes.register("lamp-reader",{body:{color:"black","font-size":"x-large","padding-top":"0 !important","padding-bottom":"0 !important"},vocab:{cursor:"pointer","border-radius":"5px"},"vocab.KNOWN":{"background-color":"lightgrey"},"vocab.LEARNING":{"background-color":"orange"},"vocab.UNKNOWN":{"background-color":"black",color:"white"},"a:hover":{color:"unset"}}),this.rendition.themes.select("lamp-reader")}}],[{key:"updateWordStatus",value:function(t,e){t.getRootNode().querySelectorAll('vocab[word="'.concat(e.word.word,'"]')).forEach((function(t){return t.className=e.status}))}}]),h}(j.StatefulEpubViewer)},588:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnIHdpZHRoPSIxMDI0cHgiIGhlaWdodD0iMTAyNHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj4KICA8cGF0aCBkPSJNODkyLjEgNzM3LjhsLTExMC4zLTYzLjdhMTUuOSAxNS45IDAgMCAwLTIxLjcgNS45bC0xOS45IDM0LjVjLTQuNCA3LjYtMS44IDE3LjQgNS44IDIxLjhMODU2LjMgODAwYTE1LjkgMTUuOSAwIDAgMCAyMS43LTUuOWwxOS45LTM0LjVjNC40LTcuNiAxLjctMTcuNC01LjgtMjEuOHpNNzYwIDM0NGExNS45IDE1LjkgMCAwIDAgMjEuNyA1LjlMODkyIDI4Ni4yYzcuNi00LjQgMTAuMi0xNC4yIDUuOC0yMS44TDg3OCAyMzBhMTUuOSAxNS45IDAgMCAwLTIxLjctNS45TDc0NiAyODcuOGExNS45OSAxNS45OSAwIDAgMC01LjggMjEuOEw3NjAgMzQ0em0xNzQgMTMySDgwNmMtOC44IDAtMTYgNy4yLTE2IDE2djQwYzAgOC44IDcuMiAxNiAxNiAxNmgxMjhjOC44IDAgMTYtNy4yIDE2LTE2di00MGMwLTguOC03LjItMTYtMTYtMTZ6TTYyNS45IDExNWMtNS45IDAtMTEuOSAxLjYtMTcuNCA1LjNMMjU0IDM1Mkg5MGMtOC44IDAtMTYgNy4yLTE2IDE2djI4OGMwIDguOCA3LjIgMTYgMTYgMTZoMTY0bDM1NC41IDIzMS43YzUuNSAzLjYgMTEuNiA1LjMgMTcuNCA1LjMgMTYuNyAwIDMyLjEtMTMuMyAzMi4xLTMyLjFWMTQ3LjFjMC0xOC44LTE1LjQtMzIuMS0zMi4xLTMyLjF6Ii8+Cjwvc3ZnPgo="},589:function(t,e){t.exports={lookup:async function(t){const e=`https://cdn.jsdelivr.net/gh/openderock/dictionary/${function(t){switch(t.length){case 1:return t;case 2:return`${t[0]}/${t[1]}`;default:return`${t[0]}/${t[1]}/${t[2]}`}}(t)}/${t}.json`;return fetch(e).then((t=>{if(t.ok)return t;throw new Error(t.statusText)})).then((t=>t.json()))}}},590:function(t,e,r){"use strict";r(572)},591:function(t,e,r){var n=r(123)(!1);n.push([t.i,"#word-modal .modal-title{text-transform:capitalize}#word-modal .modal-title small{font-size:50%}#word-modal .phonetic{cursor:pointer}#word-modal .translation{max-height:25vh;overflow-y:auto}#word-modal ul{padding-left:0}#word-modal li>b{text-transform:capitalize}",""]),t.exports=n},604:function(t,e,r){"use strict";r.r(e);r(22),r(20),r(17),r(13),r(23),r(18),r(24);var n=r(60),o=r(3),c=(r(116),r(25)),l=r(181),d=r(144),h=r(65),f=r(157),v=r(589),M=r.n(v),j=r(575);function w(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m=c.default.extend({components:{BModal:d.a,BButton:h.a,BSpinner:f.a},data:function(){return{element:void 0,word:"",translation:void 0}},computed:{phonetic:function(){var t,e,r;return(null===(e=null===(t=this.translation)||void 0===t?void 0:t.phonetics)||void 0===e?void 0:e.length)>0?null===(r=this.translation)||void 0===r?void 0:r.phonetics[0]:void 0}},methods:y(y({},Object(l.b)({review:"user-word/review"})),{},{open:function(element){this.element=element,this.word=element.textContent.toLowerCase(),this.$bvModal.show("word-modal"),this.fetchTranslation()},fetchTranslation:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.translation=void 0,e.next=3,M.a.lookup(t.word);case 3:r=e.sent,n=r.records,t.translation=n[0];case 6:case"end":return e.stop()}}),e)})))()},playAudio:function(){var t;(null===(t=this.phonetic)||void 0===t?void 0:t.audio)&&new Audio(this.phonetic.audio).play()},setWordStatus:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.review({status:t,word:e.word});case 2:n=r.sent,j.a.updateWordStatus(e.element,n),e.$bvModal.hide("word-modal");case 5:case"end":return r.stop()}}),r)})))()}})}),N=(r(590),r(93)),component=Object(N.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-modal",{attrs:{id:"word-modal","hide-backdrop":"","hide-footer":"","hide-header":""}},[n("h2",{staticClass:"modal-title"},[t._v("\n    "+t._s(t.word)+"\n    "),t.phonetic?n("small",{staticClass:"phonetic",on:{click:t.playAudio}},[t._v("\n      "+t._s(t.phonetic.text)+"\n      "),t.phonetic.audio?n("img",{staticClass:"icon faded",attrs:{src:r(588),alt:""}}):t._e()]):t._e()]),t._v(" "),n("hr"),t._v(" "),t.translation?n("p",{staticClass:"my-4 translation"},[n("ul",t._l(t.translation.meanings,(function(e,r){return n("li",{key:r},[n("b",[t._v(t._s(e.partOfSpeech))]),t._v(" "),n("ol",t._l(e.definitions,(function(e,r){return n("li",{key:r},[t._v("\n            "+t._s(e.definition)+"\n          ")])})),0),t._v(" "),n("br")])})),0)]):n("center",[n("br"),t._v(" "),n("br"),t._v(" "),n("b-spinner",{attrs:{small:""}}),t._v(" "),n("br"),t._v(" "),n("br"),t._v(" "),n("br")],1),t._v(" "),n("hr"),t._v(" "),n("b-button",{attrs:{block:"",variant:"success"},on:{click:function(e){return t.setWordStatus("LEARNING")}}},[t._v("Needs more review")]),t._v(" "),n("b-button",{attrs:{block:"",variant:"dark"},on:{click:function(e){return t.setWordStatus("KNOWN")}}},[t._v("Move to the known ones")])],1)}),[],!1,null,null,null);e.default=component.exports}}]);