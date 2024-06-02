(function(){let t;let e;let s;let n=document.createElement("template");n.innerHTML=`\n        <style>\n        </style>\n        <div id="ui5_content" name="ui5_content">\n         <slot name="content"></slot>\n        </div>\n\n        <script id="oView" name="oView" type="sapui5/xmlview">\n            <mvc:View\n\t\t\t    controllerName="myView.Template"\n\t\t\t\txmlns:l="sap.ui.layout"\n\t\t\t\txmlns:mvc="sap.ui.core.mvc"\n\t\t\t\txmlns="sap.m">\n\t\t\t\t<l:VerticalLayout\n\t\t\t\t\tclass="sapUiContentPadding"\n\t\t\t\t\twidth="100%">\n\t\t\t\t\t<l:content>\n\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\tid="passwordInput"\n\t\t\t\t\t\t\ttype="Password"\n\t\t\t\t\t\t\tplaceholder="Enter password ..." liveChange="onButtonPress"/>\n\t\t\t\t\t</l:content>\n\t\t\t\t</l:VerticalLayout>\n\t\t\t</mvc:View>\n        <\/script>        \n    `;class i extends HTMLElement{constructor(){super();t=this.attachShadow({mode:"open"});t.appendChild(n.content.cloneNode(true));e=a();t.querySelector("#oView").id=e+"_oView";this._export_settings={};this._export_settings.password="";this.addEventListener("click",t=>{console.log("click")})}connectedCallback(){try{if(window.commonApp){let t=commonApp.getShell().findElements(true,t=>t.hasStyleClass&&t.hasStyleClass("sapAppBuildingOutline"))[0];if(t&&t.getReactProps){let e=t=>{let e={};let s=t.globalState;let n=s.instances;let i=n.app['[{"app":"MAIN_APPLICATION"}]'];let o=i.names;for(let t in o){let s=o[t];let n=JSON.parse(t).pop();let i=Object.keys(n)[0];let a=n[i];e[a]={type:i,name:s}}for(let t in e){let s=e[t]}let a=JSON.stringify({components:e,vars:i.globalVars});if(a!=this.metadata){this.metadata=a;this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{metadata:a}}}))}};let s=t=>{this._subscription=t.subscribe({effect:t=>{e(t);return{result:1}}})};let n=t.getReactProps();if(n){s(n.store)}else{let e=t.renderReactComponent;t.renderReactComponent=n=>{let i=t.getReactProps();s(i.store);e.call(t,n)}}}}}catch(t){}}disconnectedCallback(){if(this._subscription){this._subscription();this._subscription=null}}onCustomWidgetBeforeUpdate(t){if("designMode"in t){this._designMode=t["designMode"]}}onCustomWidgetAfterUpdate(t){o(this)}_firePropertiesChanged(){this.password="";this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{password:this.password}}}))}get password(){return this._export_settings.password}set password(t){t=s;this._export_settings.password=t}static get observedAttributes(){return["password"]}attributeChangedCallback(t,e,s){if(e!=s){this[t]=s}}}customElements.define("com-fd-djaja-sap-sac-inputpassword",i);function o(n){var i=n;let o=document.createElement("div");o.slot="content";i.appendChild(o);sap.ui.getCore().attachInit(function(){"use strict";sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller"],function(jQuery,t){"use strict";return t.extend("myView.Template",{onButtonPress:function(t){s=a.byId("passwordInput").getValue();n._firePropertiesChanged();console.log(s);this.settings={};this.settings.password="";n.dispatchEvent(new CustomEvent("onStart",{detail:{settings:this.settings}}))}})});var a=sap.ui.xmlview({viewContent:jQuery(t.getElementById(e+"_oView")).html()});a.placeAt(o);if(i._designMode){a.byId("passwordInput").setEnabled(false)}})}function a(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{let e=Math.random()*16|0,s=t==="x"?e:e&3|8;return s.toString(16)})}})();
//# sourceMappingURL=inputpassword.js.map