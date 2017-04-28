/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise',
  'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojinputnumber',
  'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojcheckboxset',
  'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource'],
        function (oj, ko, $)
        {

          var viewModel = function ()
          {
            var collection = new oj.Collection(null, {
              url: 'js/data/advancedEditableData.json'
            });

            var options = {rowHeader: 'id', columns:
                      ['ojInputText', 'ojInputNumber', 'ojInputDate', 'ojCombobox',
                        'ojSelect', 'ojCheckboxset', 'readOnly']
            };
            this.dataSource = new oj.CollectionDataGridDataSource(collection, options);

            //// DETERMINE TEMPLATE /////
            this.getCellTemplate = function (cellContext)
            {
              var mode;
              mode = cellContext['mode'];
              if (mode === 'edit')
              {
                return 'editCellTemplate';
              } else if (mode === 'navigation')
              {
                return 'cellTemplate';
              }
            };

            //// EDIT EVENTS /////

            // returning false in the handle edit event will make the cell read-only
            this.handleEdit = function (event, ui)
            {
              if (ui['cellContext']['keys']['column'] == 'readOnly')
              {
                event.preventDefault();
              }
            }

            // the oj.DataCollectionEditUtils.basicHandleEditEnd is a utility method
            // which will handle validation of editable components and also handle
            // canceling the edit
            this.handleEditEnd = oj.DataCollectionEditUtils.basicHandleEditEnd;

            //// INITIAL EDIT MODE ////
            this.editMode = 'cellEdit';

            //// NUMBER AND DATE CONVERTER ////
            var numberConverterFactory = oj.Validation.converterFactory("number");
            this.numberConverter = numberConverterFactory.createConverter();

            var dateConverterFactory = oj.Validation.converterFactory("datetime");
            this.dateConverter = dateConverterFactory.createConverter();

            //// CELL CLASS NAME ////
            this.getCellClassName = function (cellContext)
            {
              var key = cellContext['keys']['column'];
              if (key == 'readOnly')
              {
                // use the oj-read-only style on a cell to set the background
                // color to the default read only color
                return 'oj-helper-justify-content-flex-start oj-read-only';
              } else if (key == 'ojCheckboxset')
              {
                // use the oj-datagrid-cell-no-padding className to ensure
                // padding always is never applied to cells in edit mode
                return 'oj-datagrid-cell-no-padding';
              } else if (key == 'ojInputText' || key == 'ojCombobox' ||
                      key == 'ojSelect')
              {
                // text is default aligned end
                return 'oj-helper-justify-content-flex-start';
              }
            };
          };

          return new viewModel();
        });
