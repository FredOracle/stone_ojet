/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojlistviewdnd', 'ojs/ojjsontreedatasource', 'ojs/ojbutton', 'ojs/ojmenu'],
        function (oj, ko, $) {
          var data = [
            {"attr": {"id": "public",
                "name": "Public"
              },
              "children": [
                {"attr": {"id": "f5",
                    "name": "Letter to Parents - Kindergarden",
                    "modified": "05/12/2014",
                    "type": "doc"
                  }
                },
                {"attr": {"id": "f1",
                    "name": "Christmas Planning",
                    "modified": "12/11/2014",
                    "type": "xls"
                  }
                }
              ]
            },
            {"attr": {"id": "private",
                "name": "Private"
              },
              "children": [
                {"attr": {"id": "f2",
                    "name": "Budget (2014)",
                    "modified": "1/1/2014",
                    "type": "xls"
                  }
                },
                {"attr": {"id": "f3",
                    "name": "New Year KK",
                    "modified": "12/27/2014",
                    "type": "xls"
                  }
                },
                {"attr": {"id": "f4",
                    "name": "Waiver For Grant Street Garage",
                    "modified": "12/12/2014",
                    "type": "doc"
                  }
                },
                {"attr": {"id": "f6",
                    "name": "Inspection Report",
                    "modified": "11/10/2014",
                    "type": "pdf"
                  }
                }
              ]
            },
            {"attr": {"id": "work",
                "name": "Work"
              },
              "children": [
                {"attr": {"id": "f7",
                    "name": "Patent Declaration (Signed Copy)",
                    "modified": "03/04/2015",
                    "type": "pdf"
                  }
                },
                {"attr": {"id": "f8",
                    "name": "Presentation - Openworld 2014",
                    "modified": "10/04/2014",
                    "type": "ppt"
                  }
                }
              ]
            }
          ];

          function CustomerViewModel() {
            var self = this;
            this.dataSource = new oj.JsonTreeDataSource(data),
                    this.itemOnly = function (context)
                    {
                      if (self.disablePasteIntoFolder())
                        return context['leaf'];
                      else
                        return true;
                    };

            this.selectTemplate = function (file, bindingContext)
            {
              if (bindingContext.$itemContext.leaf && bindingContext.$data.type)
                return self.activeLayout() == "thumbView" ? 'item_grid_template' : 'item_template';
              else
                return 'group_template';
            };

            this.disablePasteIntoFolder = ko.observable(true);
            this.disablePasteIntoFolder.subscribe(function (newValue)
            {
              $('#listview').ojListView('option', 'contextMenu', newValue ? '#itemMenu' : '#itemAndFolderMenu');
            });

            this.layoutViewRadios = [{id: 'thumbView', icon: 'demo-icon-font demo-grid-icon-16'},
              {id: 'listView', icon: 'demo-icon-font demo-list-icon-16'}
            ];
            this.activeLayout = ko.observable("listView");
            this.handleLayoutChange = function (event, ui)
            {
              $('#listview').toggleClass("oj-listview-card-layout")
                      .ojListView('refresh');
            };

            this.handleDragOver = function (event, ui)
            {
              // do not allow drop on folders
              if (!self.disablePasteIntoFolder() || !$(ui['item']).hasClass("folder"))
              {
                event.preventDefault();
              }
            };

            this.handleReorder = function (event, ui)
            {
              var source, dest, i, callback;

              dest = $('#listview').ojListView('getContextByNode', ui.reference);
              for (var i = 0; i < ui.items.length; i++)
              {
                source = $('#listview').ojListView('getContextByNode', ui.items[i]);
                // invoke callback when last item has been moved successfully
                if (i == ui.items.length - 1)
                  callback = {'success': self.handleMoveSuccess};
                self.dataSource.move(source.key, dest.key, ui.position, callback);
              }
            };

            this.handleMoveSuccess = function ()
            {
              $('#listview').ojListView('refresh');

              // restore focus on current item (should use whenReady)
              var current = $('#listview').ojListView('option', 'currentItem');
              $("#" + current).focus();
            }
          }

          /*
           * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
           * each time the view is displayed.  Return an instance of the ViewModel if
           * only one instance of the ViewModel is needed.
           */
          return new CustomerViewModel();
        }
);
