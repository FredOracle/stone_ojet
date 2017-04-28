/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery',
  'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojmenu'],
        function (oj, ko, $) {

          var AboutViewModelTable = function () {
            var self = this;

            self.chemicals = [
              {name: 'Hydrogen',
                sizeClass: 'oj-masonrylayout-tile-2x2'},
              {name: 'Helium',
                sizeClass: 'oj-masonrylayout-tile-2x2'},
              {name: 'Lithium',
                sizeClass: 'oj-masonrylayout-tile-2x2'},
              {name: 'Beryllium',
                sizeClass: 'oj-masonrylayout-tile-2x2'},
              {name: 'Boron',
                sizeClass: 'oj-masonrylayout-tile-1x1'},
              {name: 'Carbon',
                sizeClass: 'oj-masonrylayout-tile-1x1'},
              {name: 'Nitrogen',
                sizeClass: 'oj-masonrylayout-tile-1x1'},
              {name: 'Oxygen',
                sizeClass: 'oj-masonrylayout-tile-1x1'}
            ];

            getLabelId = function (index)
            {
              return 'label' + (index + 1);
            };

            getDragHandleId = function (index)
            {
              return 'dragHandle' + (index + 1);
            };

            getDragHandleLabelledBy = function (index)
            {
              return getDragHandleId(index) + ' ' + getLabelId(index);
            };
          }


          /*
           * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
           * each time the view is displayed.  Return an instance of the ViewModel if
           * only one instance of the ViewModel is needed.
           */
          return   new AboutViewModelTable();
        });
