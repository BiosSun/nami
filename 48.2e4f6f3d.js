(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{230:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c});var a=n(0),r=n.n(a),o=n(14),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var i=function(e){function t(){var e,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=a=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.state={at:"bottom",offset:0},u(a,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a["Component"]),l(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderController(),this.renderPopover())}},{key:"renderPopover",value:function(){return r.a.createElement(o.j,{of:r.a.createElement(o.a,{type:"primary"},"Toggle Popover"),at:this.state.at,offset:this.state.offset},r.a.createElement("div",{className:"mv-s mh-l"},"Popover content."))}},{key:"renderController",value:function(){var e=this;return r.a.createElement("div",{className:"demo-popover__controller"},r.a.createElement(o.e,{spacing:!0},r.a.createElement(o.e.Col,{span:4},r.a.createElement(o.l,{value:this.state.at,onChange:function(t){return e.setState({at:t.detail.value})}},r.a.createElement(o.l.Option,{value:"auto-start"},"auto-start"),r.a.createElement(o.l.Option,{value:"auto"},"auto"),r.a.createElement(o.l.Option,{value:"auto-end"},"auto-end"),r.a.createElement(o.l.Option,{value:"top-start"},"top-start"),r.a.createElement(o.l.Option,{value:"top"},"top"),r.a.createElement(o.l.Option,{value:"top-end"},"top-end"),r.a.createElement(o.l.Option,{value:"right-start"},"right-start"),r.a.createElement(o.l.Option,{value:"right"},"right"),r.a.createElement(o.l.Option,{value:"right-end"},"right-end"),r.a.createElement(o.l.Option,{value:"bottom-start"},"bottom-start"),r.a.createElement(o.l.Option,{value:"bottom"},"bottom"),r.a.createElement(o.l.Option,{value:"bottom-end"},"bottom-end"),r.a.createElement(o.l.Option,{value:"left-start"},"left-start"),r.a.createElement(o.l.Option,{value:"left"},"left"),r.a.createElement(o.l.Option,{value:"left-end"},"left-end"))),r.a.createElement(o.e.Col,{span:4},r.a.createElement(o.n,{value:this.state.offset.toString(),onChange:function(t){return e.setState({offset:t.target.value})},placeholder:"offset"}))))}}]),t}();function c(){return r.a.createElement(i,null)}}}]);