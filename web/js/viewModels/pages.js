define(['ojs/ojcore','knockout','ojs/ojmodel','ojs/ojtrain','ojs/ojbutton','ojs/ojinputtext','ojs/ojselectcombobox','ojs/ojdialog'],
function(oj, ko) {

  var viewModel = {
    data:          undefined,
    trainSteps:    new Array(),
    currentStep:   ko.observable(),
    currentStepNo: ko.observable(0),

    initialize: function() {
      // Initialize the wizard with sample questions.
      this.data = {
        name: "Create Customer",
        steps: [
          {id:"0",name:"Basic Information",questions:[{id:"0", type:"Text", question:"Full name", answer:""},
                                                      {id:"1", type:"Text", question:"Email",  answer:""},
                                                      {id:"2", type:"YesNo",question:"VIP Customer", answer:""}]},
          {id:"1",name:"Additional Information",questions:[{id:"3", type:"YesNo",question:"Receive newsletter?",answer:""},
                                                           {id:"4", type:"YesNo",question:"Discount?",answer:""}]},
          {id:"2",name:"Confirmation",questions:[{id:"5", type:"YesNo",question:"Are all entered data correct?",answer:""}]}
        ]
      };
      
      // Make an array of steps for the Oracle JET train component.    
      for(i=0; i<this.data.steps.length; i++) {
        this.trainSteps.push({id:   this.data.steps[i].id,
                              label:this.data.steps[i].name});
      }
      
      this.go(this.currentStepNo());
    },

    go: function(stepNo) {
      this.currentStepNo(stepNo);
      this.currentStep(this.data.steps[stepNo]); 
    },
    
    back: function() {
      var newStepNo = $("#train").ojTrain("previousSelectableStep");
		  if(newStepNo != null) {
        this.go(newStepNo);
      }
    },
    
    next: function() {
      // If last step, submit the wizard.
      if(this.currentStepNo() == (this.trainSteps.length-1)) {
        console.log("SUBMIT: ", this.data);
      }
      
      var newStepNo = $("#train").ojTrain("nextSelectableStep");
		  if(newStepNo != null) {
        this.go(newStepNo);
      }
    },
    
    openCreateUserDialog: function() {
      $("#createUserDialog").ojDialog("open");
    }
  };

  return viewModel;
});
