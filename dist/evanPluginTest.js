(()=>{var t={3099:t=>{t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},6077:(t,r,e)=>{var n=e(111);t.exports=function(t){if(!n(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},1223:(t,r,e)=>{var n=e(5112),o=e(30),i=e(3070),u=n("unscopables"),c=Array.prototype;null==c[u]&&i.f(c,u,{configurable:!0,value:o(null)}),t.exports=function(t){c[u][t]=!0}},9670:(t,r,e)=>{var n=e(111);t.exports=function(t){if(!n(t))throw TypeError(String(t)+" is not an object");return t}},1318:(t,r,e)=>{var n=e(5656),o=e(7466),i=e(1400),u=function(t){return function(r,e,u){var c,a=n(r),s=o(a.length),f=i(u,s);if(t&&e!=e){for(;s>f;)if((c=a[f++])!=c)return!0}else for(;s>f;f++)if((t||f in a)&&a[f]===e)return t||f||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},2092:(t,r,e)=>{var n=e(9974),o=e(8361),i=e(7908),u=e(7466),c=e(5417),a=[].push,s=function(t){var r=1==t,e=2==t,s=3==t,f=4==t,l=6==t,p=7==t,y=5==t||l;return function(v,g,h,d){for(var b,m,M=i(v),I=o(M),w=n(g,h,3),S=u(I.length),O=0,x=d||c,A=r?x(v,S):e||p?x(v,0):void 0;S>O;O++)if((y||O in I)&&(m=w(b=I[O],O,M),t))if(r)A[O]=m;else if(m)switch(t){case 3:return!0;case 5:return b;case 6:return O;case 2:a.call(A,b)}else switch(t){case 4:return!1;case 7:a.call(A,b)}return l?-1:s||f?f:A}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6),filterOut:s(7)}},5417:(t,r,e)=>{var n=e(111),o=e(3157),i=e(5112)("species");t.exports=function(t,r){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)?n(e)&&null===(e=e[i])&&(e=void 0):e=void 0),new(void 0===e?Array:e)(0===r?0:r)}},4326:t=>{var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},648:(t,r,e)=>{var n=e(1694),o=e(4326),i=e(5112)("toStringTag"),u="Arguments"==o(function(){return arguments}());t.exports=n?o:function(t){var r,e,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,r){try{return t[r]}catch(t){}}(r=Object(t),i))?e:u?o(r):"Object"==(n=o(r))&&"function"==typeof r.callee?"Arguments":n}},9920:(t,r,e)=>{var n=e(6656),o=e(3887),i=e(1236),u=e(3070);t.exports=function(t,r){for(var e=o(r),c=u.f,a=i.f,s=0;s<e.length;s++){var f=e[s];n(t,f)||c(t,f,a(r,f))}}},8544:(t,r,e)=>{var n=e(7293);t.exports=!n((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},4994:(t,r,e)=>{"use strict";var n=e(3383).IteratorPrototype,o=e(30),i=e(9114),u=e(8003),c=e(7497),a=function(){return this};t.exports=function(t,r,e){var s=r+" Iterator";return t.prototype=o(n,{next:i(1,e)}),u(t,s,!1,!0),c[s]=a,t}},8880:(t,r,e)=>{var n=e(9781),o=e(3070),i=e(9114);t.exports=n?function(t,r,e){return o.f(t,r,i(1,e))}:function(t,r,e){return t[r]=e,t}},9114:t=>{t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},654:(t,r,e)=>{"use strict";var n=e(2109),o=e(4994),i=e(9518),u=e(7674),c=e(8003),a=e(8880),s=e(1320),f=e(5112),l=e(1913),p=e(7497),y=e(3383),v=y.IteratorPrototype,g=y.BUGGY_SAFARI_ITERATORS,h=f("iterator"),d="keys",b="values",m="entries",M=function(){return this};t.exports=function(t,r,e,f,y,I,w){o(e,r,f);var S,O,x,A=function(t){if(t===y&&L)return L;if(!g&&t in D)return D[t];switch(t){case d:case b:case m:return function(){return new e(this,t)}}return function(){return new e(this)}},j=r+" Iterator",T=!1,D=t.prototype,P=D[h]||D["@@iterator"]||y&&D[y],L=!g&&P||A(y),C="Array"==r&&D.entries||P;if(C&&(S=i(C.call(new t)),v!==Object.prototype&&S.next&&(l||i(S)===v||(u?u(S,v):"function"!=typeof S[h]&&a(S,h,M)),c(S,j,!0,!0),l&&(p[j]=M))),y==b&&P&&P.name!==b&&(T=!0,L=function(){return P.call(this)}),l&&!w||D[h]===L||a(D,h,L),p[r]=L,y)if(O={values:A(b),keys:I?L:A(d),entries:A(m)},w)for(x in O)(g||T||!(x in D))&&s(D,x,O[x]);else n({target:r,proto:!0,forced:g||T},O);return O}},7235:(t,r,e)=>{var n=e(857),o=e(6656),i=e(6061),u=e(3070).f;t.exports=function(t){var r=n.Symbol||(n.Symbol={});o(r,t)||u(r,t,{value:i.f(t)})}},9781:(t,r,e)=>{var n=e(7293);t.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:(t,r,e)=>{var n=e(7854),o=e(111),i=n.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},8324:t=>{t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},8113:(t,r,e)=>{var n=e(5005);t.exports=n("navigator","userAgent")||""},7392:(t,r,e)=>{var n,o,i=e(7854),u=e(8113),c=i.process,a=c&&c.versions,s=a&&a.v8;s?o=(n=s.split("."))[0]<4?1:n[0]+n[1]:u&&(!(n=u.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=u.match(/Chrome\/(\d+)/))&&(o=n[1]),t.exports=o&&+o},748:t=>{t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:(t,r,e)=>{var n=e(7854),o=e(1236).f,i=e(8880),u=e(1320),c=e(3505),a=e(9920),s=e(4705);t.exports=function(t,r){var e,f,l,p,y,v=t.target,g=t.global,h=t.stat;if(e=g?n:h?n[v]||c(v,{}):(n[v]||{}).prototype)for(f in r){if(p=r[f],l=t.noTargetGet?(y=o(e,f))&&y.value:e[f],!s(g?f:v+(h?".":"#")+f,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;a(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),u(e,f,p,t)}}},7293:t=>{t.exports=function(t){try{return!!t()}catch(t){return!0}}},9974:(t,r,e)=>{var n=e(3099);t.exports=function(t,r,e){if(n(t),void 0===r)return t;switch(e){case 0:return function(){return t.call(r)};case 1:return function(e){return t.call(r,e)};case 2:return function(e,n){return t.call(r,e,n)};case 3:return function(e,n,o){return t.call(r,e,n,o)}}return function(){return t.apply(r,arguments)}}},7065:(t,r,e)=>{"use strict";var n=e(3099),o=e(111),i=[].slice,u={},c=function(t,r,e){if(!(r in u)){for(var n=[],o=0;o<r;o++)n[o]="a["+o+"]";u[r]=Function("C,a","return new C("+n.join(",")+")")}return u[r](t,e)};t.exports=Function.bind||function(t){var r=n(this),e=i.call(arguments,1),u=function(){var n=e.concat(i.call(arguments));return this instanceof u?c(r,n.length,n):r.apply(t,n)};return o(r.prototype)&&(u.prototype=r.prototype),u}},5005:(t,r,e)=>{var n=e(857),o=e(7854),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,r){return arguments.length<2?i(n[t])||i(o[t]):n[t]&&n[t][r]||o[t]&&o[t][r]}},7854:(t,r,e)=>{var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e.g&&e.g)||function(){return this}()||Function("return this")()},6656:(t,r,e)=>{var n=e(7908),o={}.hasOwnProperty;t.exports=Object.hasOwn||function(t,r){return o.call(n(t),r)}},3501:t=>{t.exports={}},490:(t,r,e)=>{var n=e(5005);t.exports=n("document","documentElement")},4664:(t,r,e)=>{var n=e(9781),o=e(7293),i=e(317);t.exports=!n&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:(t,r,e)=>{var n=e(7293),o=e(4326),i="".split;t.exports=n((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},2788:(t,r,e)=>{var n=e(5465),o=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(t){return o.call(t)}),t.exports=n.inspectSource},9909:(t,r,e)=>{var n,o,i,u=e(8536),c=e(7854),a=e(111),s=e(8880),f=e(6656),l=e(5465),p=e(6200),y=e(3501),v="Object already initialized",g=c.WeakMap;if(u||l.state){var h=l.state||(l.state=new g),d=h.get,b=h.has,m=h.set;n=function(t,r){if(b.call(h,t))throw new TypeError(v);return r.facade=t,m.call(h,t,r),r},o=function(t){return d.call(h,t)||{}},i=function(t){return b.call(h,t)}}else{var M=p("state");y[M]=!0,n=function(t,r){if(f(t,M))throw new TypeError(v);return r.facade=t,s(t,M,r),r},o=function(t){return f(t,M)?t[M]:{}},i=function(t){return f(t,M)}}t.exports={set:n,get:o,has:i,enforce:function(t){return i(t)?o(t):n(t,{})},getterFor:function(t){return function(r){var e;if(!a(r)||(e=o(r)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return e}}}},3157:(t,r,e)=>{var n=e(4326);t.exports=Array.isArray||function(t){return"Array"==n(t)}},4705:(t,r,e)=>{var n=e(7293),o=/#|\.prototype\./,i=function(t,r){var e=c[u(t)];return e==s||e!=a&&("function"==typeof r?n(r):!!r)},u=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=i.data={},a=i.NATIVE="N",s=i.POLYFILL="P";t.exports=i},111:t=>{t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},1913:t=>{t.exports=!1},3383:(t,r,e)=>{"use strict";var n,o,i,u=e(7293),c=e(9518),a=e(8880),s=e(6656),f=e(5112),l=e(1913),p=f("iterator"),y=!1;[].keys&&("next"in(i=[].keys())?(o=c(c(i)))!==Object.prototype&&(n=o):y=!0);var v=null==n||u((function(){var t={};return n[p].call(t)!==t}));v&&(n={}),l&&!v||s(n,p)||a(n,p,(function(){return this})),t.exports={IteratorPrototype:n,BUGGY_SAFARI_ITERATORS:y}},7497:t=>{t.exports={}},133:(t,r,e)=>{var n=e(7392),o=e(7293);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&n&&n<41}))},8536:(t,r,e)=>{var n=e(7854),o=e(2788),i=n.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},30:(t,r,e)=>{var n,o=e(9670),i=e(6048),u=e(748),c=e(3501),a=e(490),s=e(317),f=e(6200)("IE_PROTO"),l=function(){},p=function(t){return"<script>"+t+"<\/script>"},y=function(){try{n=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,r;y=n?function(t){t.write(p("")),t.close();var r=t.parentWindow.Object;return t=null,r}(n):((r=s("iframe")).style.display="none",a.appendChild(r),r.src=String("javascript:"),(t=r.contentWindow.document).open(),t.write(p("document.F=Object")),t.close(),t.F);for(var e=u.length;e--;)delete y.prototype[u[e]];return y()};c[f]=!0,t.exports=Object.create||function(t,r){var e;return null!==t?(l.prototype=o(t),e=new l,l.prototype=null,e[f]=t):e=y(),void 0===r?e:i(e,r)}},6048:(t,r,e)=>{var n=e(9781),o=e(3070),i=e(9670),u=e(1956);t.exports=n?Object.defineProperties:function(t,r){i(t);for(var e,n=u(r),c=n.length,a=0;c>a;)o.f(t,e=n[a++],r[e]);return t}},3070:(t,r,e)=>{var n=e(9781),o=e(4664),i=e(9670),u=e(7593),c=Object.defineProperty;r.f=n?c:function(t,r,e){if(i(t),r=u(r,!0),i(e),o)try{return c(t,r,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported");return"value"in e&&(t[r]=e.value),t}},1236:(t,r,e)=>{var n=e(9781),o=e(5296),i=e(9114),u=e(5656),c=e(7593),a=e(6656),s=e(4664),f=Object.getOwnPropertyDescriptor;r.f=n?f:function(t,r){if(t=u(t),r=c(r,!0),s)try{return f(t,r)}catch(t){}if(a(t,r))return i(!o.f.call(t,r),t[r])}},1156:(t,r,e)=>{var n=e(5656),o=e(8006).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(n(t))}},8006:(t,r,e)=>{var n=e(6324),o=e(748).concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return n(t,o)}},5181:(t,r)=>{r.f=Object.getOwnPropertySymbols},9518:(t,r,e)=>{var n=e(6656),o=e(7908),i=e(6200),u=e(8544),c=i("IE_PROTO"),a=Object.prototype;t.exports=u?Object.getPrototypeOf:function(t){return t=o(t),n(t,c)?t[c]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},6324:(t,r,e)=>{var n=e(6656),o=e(5656),i=e(1318).indexOf,u=e(3501);t.exports=function(t,r){var e,c=o(t),a=0,s=[];for(e in c)!n(u,e)&&n(c,e)&&s.push(e);for(;r.length>a;)n(c,e=r[a++])&&(~i(s,e)||s.push(e));return s}},1956:(t,r,e)=>{var n=e(6324),o=e(748);t.exports=Object.keys||function(t){return n(t,o)}},5296:(t,r)=>{"use strict";var e={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!e.call({1:2},1);r.f=o?function(t){var r=n(this,t);return!!r&&r.enumerable}:e},7674:(t,r,e)=>{var n=e(9670),o=e(6077);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,e={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(e,[]),r=e instanceof Array}catch(t){}return function(e,i){return n(e),o(i),r?t.call(e,i):e.__proto__=i,e}}():void 0)},288:(t,r,e)=>{"use strict";var n=e(1694),o=e(648);t.exports=n?{}.toString:function(){return"[object "+o(this)+"]"}},3887:(t,r,e)=>{var n=e(5005),o=e(8006),i=e(5181),u=e(9670);t.exports=n("Reflect","ownKeys")||function(t){var r=o.f(u(t)),e=i.f;return e?r.concat(e(t)):r}},857:(t,r,e)=>{var n=e(7854);t.exports=n},1320:(t,r,e)=>{var n=e(7854),o=e(8880),i=e(6656),u=e(3505),c=e(2788),a=e(9909),s=a.get,f=a.enforce,l=String(String).split("String");(t.exports=function(t,r,e,c){var a,s=!!c&&!!c.unsafe,p=!!c&&!!c.enumerable,y=!!c&&!!c.noTargetGet;"function"==typeof e&&("string"!=typeof r||i(e,"name")||o(e,"name",r),(a=f(e)).source||(a.source=l.join("string"==typeof r?r:""))),t!==n?(s?!y&&t[r]&&(p=!0):delete t[r],p?t[r]=e:o(t,r,e)):p?t[r]=e:u(r,e)})(Function.prototype,"toString",(function(){return"function"==typeof this&&s(this).source||c(this)}))},4488:t=>{t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},3505:(t,r,e)=>{var n=e(7854),o=e(8880);t.exports=function(t,r){try{o(n,t,r)}catch(e){n[t]=r}return r}},8003:(t,r,e)=>{var n=e(3070).f,o=e(6656),i=e(5112)("toStringTag");t.exports=function(t,r,e){t&&!o(t=e?t:t.prototype,i)&&n(t,i,{configurable:!0,value:r})}},6200:(t,r,e)=>{var n=e(2309),o=e(9711),i=n("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:(t,r,e)=>{var n=e(7854),o=e(3505),i="__core-js_shared__",u=n[i]||o(i,{});t.exports=u},2309:(t,r,e)=>{var n=e(1913),o=e(5465);(t.exports=function(t,r){return o[t]||(o[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.15.2",mode:n?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},8710:(t,r,e)=>{var n=e(9958),o=e(4488),i=function(t){return function(r,e){var i,u,c=String(o(r)),a=n(e),s=c.length;return a<0||a>=s?t?"":void 0:(i=c.charCodeAt(a))<55296||i>56319||a+1===s||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536}};t.exports={codeAt:i(!1),charAt:i(!0)}},1400:(t,r,e)=>{var n=e(9958),o=Math.max,i=Math.min;t.exports=function(t,r){var e=n(t);return e<0?o(e+r,0):i(e,r)}},5656:(t,r,e)=>{var n=e(8361),o=e(4488);t.exports=function(t){return n(o(t))}},9958:t=>{var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},7466:(t,r,e)=>{var n=e(9958),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},7908:(t,r,e)=>{var n=e(4488);t.exports=function(t){return Object(n(t))}},7593:(t,r,e)=>{var n=e(111);t.exports=function(t,r){if(!n(t))return t;var e,o;if(r&&"function"==typeof(e=t.toString)&&!n(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!n(o=e.call(t)))return o;if(!r&&"function"==typeof(e=t.toString)&&!n(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},1694:(t,r,e)=>{var n={};n[e(5112)("toStringTag")]="z",t.exports="[object z]"===String(n)},9711:t=>{var r=0,e=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++r+e).toString(36)}},3307:(t,r,e)=>{var n=e(133);t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},6061:(t,r,e)=>{var n=e(5112);r.f=n},5112:(t,r,e)=>{var n=e(7854),o=e(2309),i=e(6656),u=e(9711),c=e(133),a=e(3307),s=o("wks"),f=n.Symbol,l=a?f:f&&f.withoutSetter||u;t.exports=function(t){return i(s,t)&&(c||"string"==typeof s[t])||(c&&i(f,t)?s[t]=f[t]:s[t]=l("Symbol."+t)),s[t]}},6992:(t,r,e)=>{"use strict";var n=e(5656),o=e(1223),i=e(7497),u=e(9909),c=e(654),a="Array Iterator",s=u.set,f=u.getterFor(a);t.exports=c(Array,"Array",(function(t,r){s(this,{type:a,target:n(t),index:0,kind:r})}),(function(){var t=f(this),r=t.target,e=t.kind,n=t.index++;return!r||n>=r.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==e?{value:n,done:!1}:"values"==e?{value:r[n],done:!1}:{value:[n,r[n]],done:!1}}),"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},4812:(t,r,e)=>{e(2109)({target:"Function",proto:!0},{bind:e(7065)})},8011:(t,r,e)=>{e(2109)({target:"Object",stat:!0,sham:!e(9781)},{create:e(30)})},9070:(t,r,e)=>{var n=e(2109),o=e(9781);n({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperty:e(3070).f})},489:(t,r,e)=>{var n=e(2109),o=e(7293),i=e(7908),u=e(9518),c=e(8544);n({target:"Object",stat:!0,forced:o((function(){u(1)})),sham:!c},{getPrototypeOf:function(t){return u(i(t))}})},8304:(t,r,e)=>{e(2109)({target:"Object",stat:!0},{setPrototypeOf:e(7674)})},1539:(t,r,e)=>{var n=e(1694),o=e(1320),i=e(288);n||o(Object.prototype,"toString",i,{unsafe:!0})},2419:(t,r,e)=>{var n=e(2109),o=e(5005),i=e(3099),u=e(9670),c=e(111),a=e(30),s=e(7065),f=e(7293),l=o("Reflect","construct"),p=f((function(){function t(){}return!(l((function(){}),[],t)instanceof t)})),y=!f((function(){l((function(){}))})),v=p||y;n({target:"Reflect",stat:!0,forced:v,sham:v},{construct:function(t,r){i(t),u(r);var e=arguments.length<3?t:i(arguments[2]);if(y&&!p)return l(t,r,e);if(t==e){switch(r.length){case 0:return new t;case 1:return new t(r[0]);case 2:return new t(r[0],r[1]);case 3:return new t(r[0],r[1],r[2]);case 4:return new t(r[0],r[1],r[2],r[3])}var n=[null];return n.push.apply(n,r),new(s.apply(t,n))}var o=e.prototype,f=a(c(o)?o:Object.prototype),v=Function.apply.call(t,f,r);return c(v)?v:f}})},8783:(t,r,e)=>{"use strict";var n=e(8710).charAt,o=e(9909),i=e(654),u="String Iterator",c=o.set,a=o.getterFor(u);i(String,"String",(function(t){c(this,{type:u,string:String(t),index:0})}),(function(){var t,r=a(this),e=r.string,o=r.index;return o>=e.length?{value:void 0,done:!0}:(t=n(e,o),r.index+=t.length,{value:t,done:!1})}))},1817:(t,r,e)=>{"use strict";var n=e(2109),o=e(9781),i=e(7854),u=e(6656),c=e(111),a=e(3070).f,s=e(9920),f=i.Symbol;if(o&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var l={},p=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),r=this instanceof p?new f(t):void 0===t?f():f(t);return""===t&&(l[r]=!0),r};s(p,f);var y=p.prototype=f.prototype;y.constructor=p;var v=y.toString,g="Symbol(test)"==String(f("test")),h=/^Symbol\((.*)\)[^)]+$/;a(y,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,r=v.call(t);if(u(l,t))return"";var e=g?r.slice(7,-1):r.replace(h,"$1");return""===e?void 0:e}}),n({global:!0,forced:!0},{Symbol:p})}},2165:(t,r,e)=>{e(7235)("iterator")},2526:(t,r,e)=>{"use strict";var n=e(2109),o=e(7854),i=e(5005),u=e(1913),c=e(9781),a=e(133),s=e(3307),f=e(7293),l=e(6656),p=e(3157),y=e(111),v=e(9670),g=e(7908),h=e(5656),d=e(7593),b=e(9114),m=e(30),M=e(1956),I=e(8006),w=e(1156),S=e(5181),O=e(1236),x=e(3070),A=e(5296),j=e(8880),T=e(1320),D=e(2309),P=e(6200),L=e(3501),C=e(9711),k=e(5112),E=e(6061),N=e(7235),z=e(8003),G=e(9909),_=e(2092).forEach,R=P("hidden"),F="Symbol",W=k("toPrimitive"),B=G.set,Y=G.getterFor(F),Z=Object.prototype,H=o.Symbol,V=i("JSON","stringify"),J=O.f,U=x.f,X=w.f,q=A.f,K=D("symbols"),$=D("op-symbols"),Q=D("string-to-symbol-registry"),tt=D("symbol-to-string-registry"),rt=D("wks"),et=o.QObject,nt=!et||!et.prototype||!et.prototype.findChild,ot=c&&f((function(){return 7!=m(U({},"a",{get:function(){return U(this,"a",{value:7}).a}})).a}))?function(t,r,e){var n=J(Z,r);n&&delete Z[r],U(t,r,e),n&&t!==Z&&U(Z,r,n)}:U,it=function(t,r){var e=K[t]=m(H.prototype);return B(e,{type:F,tag:t,description:r}),c||(e.description=r),e},ut=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof H},ct=function(t,r,e){t===Z&&ct($,r,e),v(t);var n=d(r,!0);return v(e),l(K,n)?(e.enumerable?(l(t,R)&&t[R][n]&&(t[R][n]=!1),e=m(e,{enumerable:b(0,!1)})):(l(t,R)||U(t,R,b(1,{})),t[R][n]=!0),ot(t,n,e)):U(t,n,e)},at=function(t,r){v(t);var e=h(r),n=M(e).concat(pt(e));return _(n,(function(r){c&&!st.call(e,r)||ct(t,r,e[r])})),t},st=function(t){var r=d(t,!0),e=q.call(this,r);return!(this===Z&&l(K,r)&&!l($,r))&&(!(e||!l(this,r)||!l(K,r)||l(this,R)&&this[R][r])||e)},ft=function(t,r){var e=h(t),n=d(r,!0);if(e!==Z||!l(K,n)||l($,n)){var o=J(e,n);return!o||!l(K,n)||l(e,R)&&e[R][n]||(o.enumerable=!0),o}},lt=function(t){var r=X(h(t)),e=[];return _(r,(function(t){l(K,t)||l(L,t)||e.push(t)})),e},pt=function(t){var r=t===Z,e=X(r?$:h(t)),n=[];return _(e,(function(t){!l(K,t)||r&&!l(Z,t)||n.push(K[t])})),n};a||(T((H=function(){if(this instanceof H)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,r=C(t),e=function(t){this===Z&&e.call($,t),l(this,R)&&l(this[R],r)&&(this[R][r]=!1),ot(this,r,b(1,t))};return c&&nt&&ot(Z,r,{configurable:!0,set:e}),it(r,t)}).prototype,"toString",(function(){return Y(this).tag})),T(H,"withoutSetter",(function(t){return it(C(t),t)})),A.f=st,x.f=ct,O.f=ft,I.f=w.f=lt,S.f=pt,E.f=function(t){return it(k(t),t)},c&&(U(H.prototype,"description",{configurable:!0,get:function(){return Y(this).description}}),u||T(Z,"propertyIsEnumerable",st,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!a,sham:!a},{Symbol:H}),_(M(rt),(function(t){N(t)})),n({target:F,stat:!0,forced:!a},{for:function(t){var r=String(t);if(l(Q,r))return Q[r];var e=H(r);return Q[r]=e,tt[e]=r,e},keyFor:function(t){if(!ut(t))throw TypeError(t+" is not a symbol");if(l(tt,t))return tt[t]},useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),n({target:"Object",stat:!0,forced:!a,sham:!c},{create:function(t,r){return void 0===r?m(t):at(m(t),r)},defineProperty:ct,defineProperties:at,getOwnPropertyDescriptor:ft}),n({target:"Object",stat:!0,forced:!a},{getOwnPropertyNames:lt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:f((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(g(t))}}),V&&n({target:"JSON",stat:!0,forced:!a||f((function(){var t=H();return"[null]"!=V([t])||"{}"!=V({a:t})||"{}"!=V(Object(t))}))},{stringify:function(t,r,e){for(var n,o=[t],i=1;arguments.length>i;)o.push(arguments[i++]);if(n=r,(y(r)||void 0!==t)&&!ut(t))return p(r)||(r=function(t,r){if("function"==typeof n&&(r=n.call(this,t,r)),!ut(r))return r}),o[1]=r,V.apply(null,o)}}),H.prototype[W]||j(H.prototype,W,H.prototype.valueOf),z(H,F),L[R]=!0},3948:(t,r,e)=>{var n=e(7854),o=e(8324),i=e(6992),u=e(8880),c=e(5112),a=c("iterator"),s=c("toStringTag"),f=i.values;for(var l in o){var p=n[l],y=p&&p.prototype;if(y){if(y[a]!==f)try{u(y,a,f)}catch(t){y[a]=f}if(y[s]||u(y,s,l),o[l])for(var v in i)if(y[v]!==i[v])try{u(y,v,i[v])}catch(t){y[v]=i[v]}}}},2564:(t,r,e)=>{var n=e(2109),o=e(7854),i=e(8113),u=[].slice,c=function(t){return function(r,e){var n=arguments.length>2,o=n?u.call(arguments,2):void 0;return t(n?function(){("function"==typeof r?r:Function(r)).apply(this,o)}:r,e)}};n({global:!0,bind:!0,forced:/MSIE .\./.test(i)},{setTimeout:c(o.setTimeout),setInterval:c(o.setInterval)})}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={exports:{}};return t[n](i,i.exports,e),i.exports}e.n=t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},e.d=(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r);var n={};(()=>{"use strict";function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(r)}function r(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function o(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,r,e){return r&&o(t.prototype,r),e&&o(t,e),t}function u(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&c(t,r)}function c(t,r){return(c=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}function a(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,n=f(t);if(r){var o=f(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return s(this,e)}}function s(r,e){if(e&&("object"===t(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(r)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}e.d(n,{default:()=>p}),e(2564),e(4812),e(9070),e(8304),e(489),e(2419),e(8011),e(2526),e(1817),e(1539),e(2165),e(6992),e(8783),e(3948);var p=function(t){u(n,BasePlugin);var e=a(n);function n(){return r(this,n),e.apply(this,arguments)}return i(n,[{key:"onLoad",value:function(){this.objects.registerComponent(y,{id:"evan-plugin",name:"Evan Plugin Testing",description:"Testing plugin capabilities",settings:[{type:"label",value:"This component reads the 'Collide' field to tell if it's a correct pathway tile, and highlights the floor when a user walks on it."}]}),console.log("Evan Plugin v0.1"),this.menus.register({id:"evanPlugin",icon:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNCAyM2g4YTEgMSAwIDAgMCAwLTJoLThhMS4wMDEzIDEuMDAxMyAwIDAgMSAtMS0xdi0xMi4yNTlsOS40ODgzIDUuNTM0OWEzLjEyMzUgMy4xMjM1IDAgMCAwIDMuMDIzNCAwbDkuNDg4My01LjUzNDl2Mi4yNTlhMSAxIDAgMCAwIDIgMHYtNGEzLjA1IDMuMDUgMCAwIDAgLTIuMzk3LTIuOTM4OCAyLjk5MzEgMi45OTMxIDAgMCAwIC0uNjAzLS4wNjEyaC0yMGEzLjA2MjIgMy4wNjIyIDAgMCAwIC0zIDN2MTRhMy4wMDMzIDMuMDAzMyAwIDAgMCAzIDN6bTAtMThoMjBhLjk4NzkuOTg3OSAwIDAgMSAuODUzNi41MTFsLTEwLjM1IDYuMDM3M2ExIDEgMCAwIDEgLTEuMDA3OCAwbC0xMC4zNDk0LTYuMDM3M2EuOTg3OS45ODc5IDAgMCAxIC44NTM2LS41MTF6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTNhOCA4IDAgMSAwIDggOCA4LjAwOTIgOC4wMDkyIDAgMCAwIC04LTh6bTAgMTRhNiA2IDAgMSAxIDYtNiA2LjAwNjYgNi4wMDY2IDAgMCAxIC02IDZ6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PGNpcmNsZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGN4PSIyMyIgY3k9IjI1IiByPSIxIiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTZhMSAxIDAgMCAwIC0xIDF2NWExIDEgMCAwIDAgMiAwdi01YTEgMSAwIDAgMCAtMS0xeiIgZmlsbD0iI2NlY2VjZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiIvPjwvZz48L3N2Zz4K",text:"evanPlugin",section:"controls",order:-60,panel:{iframe:absolutePath("infopanel.html")}}),this.renderTimer=setInterval(this.onRender.bind(this),1e3)}},{key:"onUnload",value:function(){clearInterval(this.renderTimer)}},{key:"onRender",value:function(){}}]),n}();l(p,"id","id0evanPlugin"),l(p,"name","Evan Plugin"),l(p,"description","testting plugin"),l(p,"components",[]);var y=function(t){u(n,BaseComponent);var e=a(n);function n(){return r(this,n),e.apply(this,arguments)}return i(n,[{key:"onLoad",value:function(){console.log("evan basecomponent - hooks v5 loaded"),this.hookCallback=function(){return console.log("Anonymous function with hook triggered"),!0},this.plugin.hooks.addHandler("map.gestures.ontap",this.hookCallback)}},{key:"onClick",value:function(){}},{key:"onUnload",value:function(){}},{key:"onRender",value:function(t){}},{key:"onMessage",value:function(t){}}]),n}()})(),module.exports=n.default})();