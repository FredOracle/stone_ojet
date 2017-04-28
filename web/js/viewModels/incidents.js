/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojbutton', 'ojs/ojinputtext'],
        function (oj, ko, $) {
          var BetterListModel = function ()
          {
            this.itemToAdd = ko.observable("");
            this.allItems = ko.observableArray([{"id": 1, "item": "Milk", "production": "NanJin"},
              {"id": 2, "item": "Flour", "production": "BeiJin"},
              {"id": 3, "item": "Sugar", "production": "ShangHai"},
              {"id": 4, "item": "Vanilla Extract", "production": "SuZhou"}
            ]);
            
            this.data = [{name: 'Settings', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Tools', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 16},
                {name: 'Base', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Environment', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 24},
                {name: 'Security', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8}
               ]
            
            this.selectedItems = ko.observableArray([]);

            var lastItemId = this.allItems().length;

            this.dataSource = new oj.ArrayTableDataSource(this.allItems, {idAttribute: "id"});

            this.dataSource2 = new oj.ArrayTableDataSource(this.data, {idAttribute: "name"});

            this.addItem = function ()
            {
              if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0))
              {
                lastItemId++;
                this.allItems.push({"id": lastItemId, "item": this.itemToAdd()});
              }
              this.itemToAdd(""); // Clear the text box
            };

            var self = this;
            this.removeSelected = function ()
            {
              $.each(this.selectedItems(), function (index, value)
              {
                self.allItems.remove(function (item)
                {
                  return (item.id == value);
                });
              });
            };

            this.updateSelected = function ()
            {
              $.each(this.selectedItems(), function (index, value)
              {
                self.dataSource.change({"id": value, "item": self.itemToAdd()});
              });
            };
          };

          /*
           * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
           * each time the view is displayed.  Return an instance of the ViewModel if
           * only one instance of the ViewModel is needed.
           */
          return new BetterListModel();
        }
);
