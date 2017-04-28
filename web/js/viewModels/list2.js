define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{     
    var data = [{id: 0, name: 'Hiking trip', date: 'Apr 9', content: 'Yosemite'},
                {id: 1, name: 'Team meeting', date: 'Apr 10', content: '10am conference room'},
                {id: 2, name: 'Doctor appointment', date: 'Apr 11', content: '4pm annual checkup'},
                {id: 3, name: 'Lunch with client', date: 'Apr 12', content: 'Find a good restaurant'},
                {id: 4, name: 'Oil change', date: 'Apr 13', content: '8am drop car off'},
                {id: 5, name: 'Project due', date: 'Apr 14', content: ''},
                {id: 6, name: 'Night out', date: 'Apr 15', content: '6pm Meet for dinner'}
               ]
    
    var viewModel = function(moduleParams)
    {
        this.dataSource = new oj.ArrayTableDataSource(data, {idAttribute: "id"});

        this.gotoContent = function(event, ui) {
            if (ui.option === 'currentItem' && ui.value != null)
            {   
                var row = data[ui.value];
                moduleParams.content(row.content);
                moduleParams.currentModule("content");                
            }
        };
    }

    return viewModel;
});	
