(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{205:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var n=a(33),r=a.n(n),l=a(0),c=a.n(l),u=a(624),o=a.n(u),i=a(21);function s(){var e=Object(l.useState)("ts, as"),t=r()(e,2),a=t[0],n=t[1],u=Object(l.useMemo)((function(){return o.a.chain(a).split(",").map(o.a.trim).compact().value()}),[a]);return c.a.createElement("div",null,c.a.createElement(i.b.Group,{name:"group",value:u,onChange:function(e,t){return n(t.join(", "))}},c.a.createElement(i.b,{value:"js",label:"JavaScript(js)"}),c.a.createElement(i.b,{value:"ts",label:"TypeScript(ts)"}),c.a.createElement(i.b,{value:"cs",label:"CoffeeScript(cs)"}),c.a.createElement(i.b,{value:"as",label:"ActionScript(as)"})),c.a.createElement("br",null),c.a.createElement(i.o,{type:"text",value:a,onChange:function(e,t){return n(t)}}))}function p(){return c.a.createElement(s,null)}}}]);