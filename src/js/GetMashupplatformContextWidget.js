/*
 * Get MashupPlatform context widget
 * https://github.com/lets-fiware/get-mashupplatform-context-widget
 *
 * Copyright (c) 2019-2024 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* exported GetMashupplatformContext */
/* global MashupPlatform, StyledElements */

var GetMashupplatformContext = (function () {

    "use strict";

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================

    var GetMashupplatformContext = function GetMashupplatformContext() {
        var getContext = function getContext(name, mp) {
            var availableContext = mp.getAvailableContext();
            var context = [];
            for (var key in availableContext) {
                var values = {};
                for (var subKey in availableContext[key]) {
                    values[subKey] = availableContext[key][subKey];
                }
                values.value = mp.get(key);
                values.context = name;
                context.push(values);
            }
            return context;
        }

        var context = getContext('MashupPlatform.widget.context', MashupPlatform.widget.context);
        context = context.concat(getContext('MashupPlatform.conext.context', MashupPlatform.mashup.context));
        context = context.concat(getContext('MashupPlatform.context', MashupPlatform.context));

        if (MashupPlatform.widget.outputs.output.connected) {
            MashupPlatform.wiring.pushEvent('output', context);
        }

        var layout = new StyledElements.VerticalLayout();

        var fields = [
            {field: 'context', label: 'Context', sortable: false, width: "20%"},
            {field: 'name', label: 'Name', sortable: false},
            {field: 'label', label: 'Label', sortable: false},
            {field: 'value', label: 'value', sortable: false},
            {field: 'description', label: 'Description', sortable: false}
        ];

        var contextList = new StyledElements.PaginatedSource({
            'pageSize': 90,
            'requestFunc': function (page, options, onSuccess, onError) {
                if (context.length > 0) {
                    onSuccess(context, {resources: context, total_count: context.length, current_page: 1});
                } else {
                    onSuccess([], {resources: [], total_count: 0, current_page: 0});
                }
            }.bind(this)
        });
        contextList.addEventListener('requestStart', function () {
            layout.center.disable();
        });
        contextList.addEventListener('requestEnd', function () {
            layout.center.enable();
        });

        var table = new StyledElements.ModelTable(fields, {id: 'name', pageSize: 90, source: contextList, 'class': 'table-striped'});
        table.reload();
        layout.center.clear();
        layout.center.appendChild(table);

        layout.center.addClassName('loading');
        layout.insertInto(document.body);
    };

    return GetMashupplatformContext;

})();
