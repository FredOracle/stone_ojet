define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{     
    var data = [{id: 0, name: 'Potential cat names', date: 'Apr 2', content: 'Mewtwo, Furball, Puss'},
                {id: 1, name: 'Todo list for work', date: 'Apr 3', content: 'Add one more'},
                {id: 2, name: 'Chicken recipes', date: 'Apr 4', content: 'Fried, Shake & Bake, Sautee'},
                {id: 3, name: 'Running routes', date: 'Apr 5', content: 'Bedroom to kitchen and back'},
                {id: 4, name: 'Groceries', date: 'Apr 6', content: 'Milk, bread, meat, veggie, can, etc.'},
                {id: 5, name: 'Party guest list', date: 'Apr 7', content: ''},
                {id: 6, name: 'Weekend projects', date: 'Apr 8', content: 'TBD'}
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
