/*
 * Get MashupPlatform context widget
 * https://github.com/lets-fiware/get-mashupplatform-context-widget
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* globals $, MashupPlatform, MockMP, GetMashupplatformContext */

(function () {

    "use strict";

    describe("GetMashupplatformContextWidget", function () {

        var widget;

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'widget',
                outputs: ['output']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            MashupPlatform.widget.outputs.output.connect({simulate: () => {}});
            widget = new GetMashupplatformContext();
        });


        it("output", function () {
            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', []);
        });

        it("output endoint is not connected", function () {
            MashupPlatform.reset();
            MashupPlatform.widget.outputs.output.disconnect();

            expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
        });
    });

})();
