(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{228:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return s});var r=n(0),l=n.n(r),a=n(14),o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var i=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var l=arguments.length,a=Array(l),o=0;o<l;o++)a[o]=arguments[o];return n=r=c(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.state={disabledCloseOnOfClick:!1,disabledCloseOnOtherClick:!1,disabledCloseOnEscape:!1},c(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["Component"]),o(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,this.renderController(),this.renderPopover())}},{key:"renderPopover",value:function(){var e=this.state,t=e.disabledCloseOnOfClick,n=e.disabledCloseOnOtherClick,r=e.disabledCloseOnEscape;return l.a.createElement(a.j,{of:l.a.createElement(a.a,{type:"primary"},"Toggle Popover"),disabledCloseOnOfClick:t,disabledCloseOnOtherClick:n,disabledCloseOnEscape:r},l.a.createElement("div",{className:"mv-s mh-l"},"Popover content."))}},{key:"renderController",value:function(){var e=this,t=this.state,n=t.disabledCloseOnOfClick,r=t.disabledCloseOnOtherClick,o=t.disabledCloseOnEscape;return l.a.createElement(a.g,{className:"demo-popover__controller",spacing:!0},l.a.createElement(a.g.Item,null,l.a.createElement(a.b,{label:"disabledCloseOnOfClick",checked:n,onChange:function(t){return e.setState({disabledCloseOnOfClick:t.target.checked})}})),l.a.createElement(a.g.Item,null,l.a.createElement(a.b,{label:"disabledCloseOnOtherClick",checked:r,onChange:function(t){return e.setState({disabledCloseOnOtherClick:t.target.checked})}})),l.a.createElement(a.g.Item,null,l.a.createElement(a.b,{label:"disabledCloseOnEscape",checked:o,onChange:function(t){return e.setState({disabledCloseOnEscape:t.target.checked})}})))}}]),t}();function s(){return l.a.createElement(i,null)}}}]);