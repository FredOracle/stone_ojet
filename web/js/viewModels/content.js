define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojbutton'],
function(oj, ko, $)
{     
    var viewModel = function(moduleParams)
    {
        this.content = moduleParams.content;

        this.gotoList = function(event, ui) {
            $("#listview").ojListView("option", "currentItem", null);
            moduleParams.currentModule(moduleParams.currentList);            
        };
    }

    return viewModel;
});	
