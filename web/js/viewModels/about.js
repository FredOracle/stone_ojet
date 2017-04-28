/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistviewdnd', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $) {
          var tableDataArray = [{id: 10, name: 'Dan Raphael', department: 'Research', salary: 150000, job: 'Director', url: 'images/nBox/16.png'},
            {id: 11, name: 'David Young', department: 'Marketing', salary: 120000, job: 'Marketing Manager', url: 'images/nBox/18.png'},
            {id: 12, name: 'Julia Chen', department: 'Marketing', salary: 120000, job: 'Marketing Manager', url: 'images/nBox/7.png'},
            {id: 13, name: 'Jon Wu', department: 'Research', salary: 120000, job: 'Product Manager', url: 'images/nBox/15.png'},
            {id: 14, name: 'Kelly Sullivan', department: 'Marketing', salary: 150000, job: 'Director', url: 'images/nBox/3.png'},
            {id: 15, name: 'Laura Bissot', department: 'Accounts', salary: 80000, job: 'Accountant', url: 'images/nBox/4.png'},
            {id: 16, name: 'Simon Austin', department: 'Research', salary: 100000, job: 'Developer', url: 'images/nBox/17.png'}];

          var listviewDataArray = [{id: 0, name: 'Amy Bartlet', department: 'Accounts', salary: 200000, job: 'Vice President', url: 'images/nBox/1.png'},
            {id: 1, name: 'Andy Jones', department: 'Accounts', salary: 150000, job: 'Director', url: 'images/nBox/10.png'},
            {id: 2, name: 'Andrew Bugsy', department: 'Research', salary: 100000, job: 'Individual Contributor', url: 'images/nBox/11.png'},
            {id: 3, name: 'Annett Barnes', department: 'Research', salary: 100000, job: 'Individual Contributor', url: 'images/nBox/2.png'},
            {id: 4, name: 'Bob Jones', department: 'Sales', salary: 75000, job: 'Salesman', url: 'images/nBox/12.png'},
            {id: 5, name: 'Bart Buckler', department: 'Accounts', salary: 75000, job: 'Purchasing', url: 'images/nBox/13.png'},
            {id: 6, name: 'Bobby Fisher', department: 'Research', salary: 100000, job: 'Individual Contributor', url: 'images/nBox/14.png'}];



          var AboutViewModelTable = function () {
            var self = this;
            self.selection = [];
            self.arr = ko.observableArray(tableDataArray);
            self.datasource = new oj.ArrayTableDataSource(self.arr, {idAttribute: 'id'});

            self.handleDrop = function (event, ui)
            {
              var data, i;

              event.preventDefault();

              data = event.originalEvent.dataTransfer.getData("application/ojlistviewitems+json");
              if (data != null)
              {
                data = JSON.parse(data);
                for (i = data.length - 1; i >= 0; i--)
                {
                  tableDataArray.splice(ui.rowIndex, 0, data[i]);
                }
                self.arr.valueHasMutated();
              }
            };

            self.handleDragEnd = function (event, ui)
            {
              if (event.originalEvent.dataTransfer.dropEffect != "none")
              {
                for (i = 0; i < self.selection.length; i++)
                {
                  var start = self.selection[i].startIndex.row;
                  var end = self.selection[i].endIndex.row;
                  tableDataArray.splice(start, end - start + 1);
                }

                self.arr.valueHasMutated();
              }
            };
          }


          var AboutViewModelListView = function () {
            var self = this;
            self.selection = [];
            self.arr = ko.observableArray(listviewDataArray);
            self.datasource = new oj.ArrayTableDataSource(self.arr, {idAttribute: 'id'});

            self.handleDrop = function (event, ui)
            {
              var data, context, index, i;

              data = event.originalEvent.dataTransfer.getData("application/ojtablerows+json");
              data = JSON.parse(data);

              if (ui.item)
              {
                context = $('#listview').ojListView('getContextByNode', ui.item);
                index = context.index;
                if (ui.position === "after")
                {
                  index = index + 1;
                }

                for (i = data.length - 1; i >= 0; i--)
                {
                  listviewDataArray.splice(index, 0, data[i].data);
                }
              } else
              {
                // empty list case
                for (i = 0; i < data.length; i++)
                {
                  listviewDataArray.push(data[i].data);
                }
              }
              self.arr.valueHasMutated();

              return false;
            }

            self.handleDragEnd = function (event, ui)
            {
              var i, j;

              if (event.originalEvent.dataTransfer.dropEffect != "none")
              {
                for (i = 0; i < self.selection.length; i++)
                {
                  for (j = 0; j < listviewDataArray.length; j++)
                  {
                    // remove the selected items from array
                    if (listviewDataArray[j].id == self.selection[i])
                    {
                      listviewDataArray.splice(j, 1);
                      break;
                    }
                  }
                }
                
                self.arr.valueHasMutated();
              }
            };
          }
          /*
           * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
           * each time the view is displayed.  Return an instance of the ViewModel if
           * only one instance of the ViewModel is needed.
           */
          return {
            t: new AboutViewModelTable(),
            l: new AboutViewModelListView()
          }
   });
