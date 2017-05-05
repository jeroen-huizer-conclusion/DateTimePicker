define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/_base/lang",
    "dojo/sniff",

    "DateTimePicker/lib/jquery",
    "dojo/text!DateTimePicker/widget/template/DateTimePicker.html",

    "DateTimePicker/lib/moment.min",
    "DateTimePicker/lib/bootstrap-datetimepicker"
    
], function (declare, _WidgetBase, _TemplatedMixin,
    dom, lang, sniff,
    _jQuery,
    template, 
    moment,
    dtp
) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget"s prototype.
    return declare("DateTimePicker.widget.DateTimePicker", [_WidgetBase, _TemplatedMixin], {

        //Widget variables
        dateAttribute: null,    // string
        dateFormat: null,       // string
        showTodayButton: null,  // boolean
        showClearButton: null,  // boolean
        showCloseButton: null,  // boolean
        minuteStepping: null,   // integer
        inline: null,           // boolean
        sidebyside: null,       // boolean

        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: template,

        //Internal variables
        _datePicker: null,

        postCreate: function () {
            logger.debug(this.id + ".postCreate"); 

            // template has to be trimmed for inline display
            if(this.inline){
                $(this.domNode).removeClass('input-group').html('');
            }

            var isMobile = sniff('ios') || sniff('android') || sniff('bb');

            // Copy settings from the modeler
            var settings = {
                format: this.dateFormat,
                showTodayButton: this.showTodayButton,
                showClear: this.showClearButton,
                showClose: this.showCloseButton && !this.inline,
                stepping: this.minuteStepping,
                inline: this.inline,
                sideBySide: this.sidebyside,
                focusOnShow: !isMobile  // Do not focus input when showing picker in mobile browsers
            };

            // Create the date time picker
            var dpHandle = $(this.domNode).datetimepicker(settings);
            this._datePicker = dpHandle.data("DateTimePicker")

        },


        update: function (obj, callback) {

            if (obj) {
                this._contextObj = obj;

                // Set the content on update
                this._setDatePicker();
                
                // Listen to changes on the widget from now on
                $(this.domNode).on("dp.change", lang.hitch(this, this._dateChanged));

                this._resetSubscriptions();
    
            } else {
                // Sorry no data no show!
                logger.warn(this.id + ".update - Did not receive a context object.");
            }

            callback && callback();
        },

        _setDatePicker: function(){
            logger.debug(this.id + "._setDatePicker");

            var millisString = this._contextObj.get(this.dateAttribute);
            this._datePicker.date(millisString !== "" ? new Date(millisString) : null);
        },

        _dateChanged: function(event){
            logger.debug(this.id + "._dateChanged");
            var date = new Date(event.date.valueOf());
            this._contextObj.set(this.dateAttribute, event.date.valueOf());
        },

        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");

            this.unsubscribeAll();

            if (this._contextObj) {
                this.subscribe({
                    guid: this._contextObj,
                    callback: lang.hitch(this, this._setDatePicker)
                });

                this.subscribe({
                    guid: this._contextObj,
                    attr: this.dateAttribute,
                    callback: lang.hitch(this, this._setDatePicker)
                });

                this.subscribe({
                    guid: this._contextObj,
                    val: true,
                    callback: lang.hitch(this, this._handleValidation)
                });
            }
        },

        _handleValidation: function(){
            console.log(this.id+'._handleValidation');
            //TODO: Implement validation callback
        }

    })
});

require(["DateTimePicker/widget/DateTimePicker"]);
