/*
 * Get MashupPlatform context widget
 * https://github.com/lets-fiware/get-mashupplatform-context-widget
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* globals $, MashupPlatform, MockMP, GetMashupplatformContextOperator */

(function () {

    "use strict";

    describe("GetMashupplatformContextOperator", function () {

        var widget;

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'widget'
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            widget = new GetMashupplatformContextOperator();
        });

        it("Dummy test", function () {
            expect(widget).not.toBe(null);
        });

    });

})();
