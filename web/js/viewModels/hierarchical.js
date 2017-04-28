/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistview'],
        function (oj, ko, $) {

          var ViewModelTable = function () {
            document.getElementById('listview');
           
          }

 
          /*
           * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
           * each time the view is displayed.  Return an instance of the ViewModel if
           * only one instance of the ViewModel is needed.
           */
          return  new ViewModelTable();
   });
