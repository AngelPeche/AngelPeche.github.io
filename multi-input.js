function loadthis(that, changedProperties) {
    var that_ = that;

    widgetName = changedProperties.widgetName;
    if (typeof widgetName === "undefined") {
        widgetName = that._export_settings.title.split("|")[0];
    }


    div = document.createElement('div');
    div.slot = "content_" + widgetName;

    let div0 = document.createElement('div');
    div0.innerHTML = '<?xml version="1.0"?><script id="oView_' + widgetName + '" name="oView_' + widgetName + '" type="sapui5/xmlview"><mvc:View height="100%" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" controllerName="myView.Template"><l:VerticalLayout class="sapUiContentPadding" width="100%"><l:content><MultiInput width="100%" id="multiInput" suggestionItems="{' + widgetName + '>/}" valueHelpRequest="handleValueHelp"><core:Item key="{' + widgetName + '>partner}" text="{' + widgetName + '>partner}" /></MultiInput></l:content><Button id="buttonId" class="sapUiSmallMarginBottom" text="Get Score" width="150px" press=".onButtonPress" /></l:VerticalLayout></mvc:View></script>';
    _shadowRoot.appendChild(div0);

    let div1 = document.createElement('div');
    div1.innerHTML = '<?xml version="1.0"?><script id="myXMLFragment_' + widgetName + '" type="sapui5/fragment"><core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><SelectDialog title="Partner Number" class="sapUiPopupWithPadding"  items="{' + widgetName + '>/}" search="_handleValueHelpSearch"  confirm="_handleValueHelpClose"  cancel="_handleValueHelpClose"  multiSelect="true" showClearButton="true" rememberSelections="true"><StandardListItem icon="{' + widgetName + '>ProductPicUrl}" iconDensityAware="false" iconInset="false" title="{' + widgetName + '>partner}" description="{' + widgetName + '>partner}" /></SelectDialog></core:FragmentDefinition></script>';
    _shadowRoot.appendChild(div1);

    let div2 = document.createElement('div');
    div2.innerHTML = '<div id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div>';
    _shadowRoot.appendChild(div2);

    that_.appendChild(div);

    var mapcanvas_divstr = _shadowRoot.getElementById('oView_' + widgetName);
    var mapcanvas_fragment_divstr = _shadowRoot.getElementById('myXMLFragment_' + widgetName);

    Ar.push({
        'id': widgetName,
        'div': mapcanvas_divstr,
        'divf': mapcanvas_fragment_divstr
    });

    that_._renderExportButton();

    sap.ui.getCore().attachInit(function() {
        "use strict";

        //### Controller ###
        sap.ui.define([
            "jquery.sap.global",
            "sap/ui/core/mvc/Controller",
            "sap/ui/model/json/JSONModel",
            "sap/m/MessageToast",
            "sap/ui/core/library",
            "sap/ui/core/Core",
            'sap/ui/model/Filter',
            'sap/m/library',
            'sap/m/MessageBox',
            'sap/ui/unified/DateRange',
            'sap/ui/core/format/DateFormat',
            'sap/ui/model/BindingMode',
            'sap/ui/core/Fragment',
            'sap/m/Token',
            'sap/ui/model/FilterOperator',
            'sap/ui/model/odata/ODataModel',
            'sap/m/BusyDialog'
        ], function(jQuery, Controller, JSONModel, MessageToast, coreLibrary, Core, Filter, mobileLibrary, MessageBox, DateRange, DateFormat, BindingMode, Fragment, Token, FilterOperator, ODataModel, BusyDialog) {
            "use strict";

            var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

            return Controller.extend("myView.Template", {

                onInit: function() {

                    if (that._firstConnection === 0) {
                        that._firstConnection = 1;
                    } else {
                        var _oModel = new JSONModel(JSON.parse(that._export_settings.footer.split("|")[1]));

                        _oModel.setSizeLimit(1000000);

                        this.getView()
                            .setModel(_oModel, that.widgetName);

                        sap.ui.getCore().setModel(_oModel, that.widgetName);
                    }
                },

                handleValueHelp: function(oEvent) {
                    var sInputValue = oEvent.getSource().getValue();

                    if (!this._valueHelpDialog) {

                        var foundIndex_ = Ar.findIndex(x => x.id == widgetName);
                        var divfinal_ = Ar[foundIndex].divf;

                        this._valueHelpDialog = sap.ui.xmlfragment({
                            fragmentContent: jQuery(divfinal_).html()
                        }, this);

                        var oModel = sap.ui.getCore().getModel(widgetName);

                        this._valueHelpDialog.setModel(oModel);
                        this.getView().addDependent(this._valueHelpDialog);
                    }
                    this._openValueHelpDialog(sInputValue);
                },

                _openValueHelpDialog: function(sInputValue) {
                    // create a filter for the binding
                    this._valueHelpDialog.getBinding("items").filter([new Filter(
                        "partner",
                        FilterOperator.Contains,
                        sInputValue
                    )]);

                    // open value help dialog filtered by the input value
                    this._valueHelpDialog.open(sInputValue);
                },

                _handleValueHelpSearch: function(evt) {
                    var sValue = evt.getParameter("value");
                    var oFilter = new Filter(
                        "partner",
                        FilterOperator.Contains,
                        sValue
                    );
                    evt.getSource().getBinding("items").filter([oFilter]);
                },

                _handleValueHelpClose: function(evt) {
                    var aSelectedItems = evt.getParameter("selectedItems"),
                        oMultiInput = this.byId("multiInput");

                    if (aSelectedItems && aSelectedItems.length > 0) {
                        aSelectedItems.forEach(function(oItem) {
                            oMultiInput.addToken(new Token({
                                text: oItem.getTitle()
                            }));
                        });
                    }
                },

                onButtonPress: async function(oEvent) {
                    var this_ = this;
                    this_.wasteTime();
                    var oMultiInput = this.byId("multiInput");

                    var aTokens = oMultiInput.getTokens();
                    // Get an array of the keys of the tokens and join them together with a "," inbetween
                    var sData = aTokens.map(function(oToken) {
                        return oToken.getText();
                    }).join(",");

                    console.log(sData);

                    _score = sData;

                    that._firePropertiesChanged();
                    this.settings = {};
                    this.settings.score = "";

                    that.dispatchEvent(new CustomEvent("onStart", {
                        detail: {
                            settings: this.settings
                        }
                    }));

                    this_.runNext();
                },

                wasteTime: function() {
                    busyDialog.open();
                },

                runNext: function() {
                    busyDialog.close();
                },

            });
        });

        console.log("widgetName Final:" + widgetName);
        var foundIndex = Ar.findIndex(x => x.id == widgetName);
        var divfinal = Ar[foundIndex].div;
        console.log(divfinal);

        //### THE APP: place the XMLView somewhere into DOM ###
        var oView = sap.ui.xmlview({
            viewContent: jQuery(divfinal).html(),
        });

        oView.placeAt(div);
        if (that_._designMode) {
            oView.byId("multiInput").setEnabled(false);
            oView.byId("buttonId").setEnabled(false);
        }
    });
}
