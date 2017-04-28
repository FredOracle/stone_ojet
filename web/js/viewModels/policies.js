/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojnbox', 'ojs/ojtabs', 'ojs/ojinputtext', 'ojs/ojselectcombobox'], function (oj, ko, $) {

    var NBoxModel = function ()
    {
        var self = this;

        // Grid Styles
        self.rowsTitleStyle = ko.observable();
        self.rowsTitleShow = ko.observable(false);
        self.rowLabelStyle = ko.observable('font-weight:bold');
        self.rowLabelShow = ko.observable(false);
        self.columnsTitleStyle = ko.observable();
        self.columnsTitleShow = ko.observable(false);
        self.columnLabelStyle = ko.observable('font-weight:bold');
        self.columnLabelShow = ko.observable(false);

        // Cell Styles
        self.cellLabelStyle = ko.observable('color:#226622');
        self.cellLabelShow = ko.observable(true);
        self.cellShowCount = ko.observable(false);
        self.cellCustomCount = ko.observable(false);
        self.disableCustomCount = ko.computed(function () {
            return !self.cellShowCount()
        });
        self.cellLabelAlign = ko.observable('start');
        self.cellStyle = ko.observable('background-color:rgb(196,212,189)');
        self.cellMinimizedStyle = ko.observable('background-color:rgb(204,222,196)');
        self.cellMaximizedStyle = ko.observable('background-color:rgb(185,202,178)');

        // Node Styles
        self.nodeColor = ko.observable();
        self.nodeIndicatorColor = ko.observable();
        self.nodeLabelStyle = ko.observable();
        self.nodeSecondaryLabelStyle = ko.observable();
        self.nodeBorderColor = ko.observable();
        self.nodeBorderWidth = ko.observable();


        // Rows array
        self.rows = ko.computed(function () {
            return self.rowLabelShow() ?
                    [{id: '0', label: 'Low'},
                        {id: '1', label: 'Medium'},
                        {id: '2', label: 'High'}] :
                    [{id: '0'},
                        {id: '1'},
                        {id: '2'}];
        });

        // Columns array
        self.columns = ko.computed(function () {
            return self.columnLabelShow() ?
                    [{id: '0', label: 'Poor'},
                        {id: '1', label: 'Fair'},
                        {id: '2', label: 'Good'}] :
                    [{id: '0'},
                        {id: '1'},
                        {id: '2'}];
        });

        // Cells array
        self.cells = ko.computed(function () {
            var cellShowCount = self.cellShowCount() ? 'on' : 'off';
            return self.cellLabelShow() ?
                    [{row: '0', column: '0', label: 'Misaligned Talent', shortDesc: 'Misaligned Talent', showCount: cellShowCount},
                        {row: '0', column: '1', label: 'Solid Talent', shortDesc: 'Solid Talent', showCount: cellShowCount},
                        {row: '0', column: '2', label: 'Expert Talent', shortDesc: 'Expert Talent', showCount: cellShowCount},
                        {row: '1', column: '0', label: 'Unproven Talent', shortDesc: 'Unproven Talent', showCount: cellShowCount},
                        {row: '1', column: '1', label: 'Core Talent', shortDesc: 'Core Talent', showCount: cellShowCount},
                        {row: '1', column: '2', label: 'Flexible Talent', shortDesc: 'Flexible Talent', showCount: cellShowCount},
                        {row: '2', column: '0', label: 'Evolving Talent', shortDesc: 'Evolving Talent', showCount: cellShowCount},
                        {row: '2', column: '1', label: 'Emerging Talent', shortDesc: 'Emerging Talent', showCount: cellShowCount},
                        {row: '2', column: '2', label: 'Top Talent', shortDesc: 'Top Talent', showCount: cellShowCount}] :
                    [{row: '0', column: '0', shortDesc: 'Low Potential, Poor Performance'},
                        {row: '0', column: '1', shortDesc: 'Low Potential, Fair Performance'},
                        {row: '0', column: '2', shortDesc: 'Low Potential, Good Performance'},
                        {row: '1', column: '0', shortDesc: 'Medium Potential, Poor Performance'},
                        {row: '1', column: '1', shortDesc: 'Medium Potential, Fair Performance'},
                        {row: '1', column: '2', shortDesc: 'Medium Potential, Good Performance'},
                        {row: '2', column: '0', shortDesc: 'High Potential, Poor Performance'},
                        {row: '2', column: '1', shortDesc: 'High Potential, Fair Performance'},
                        {row: '2', column: '2', shortDesc: 'High Potential, Good Performance'}];
        });

        // If cellCustomCount true, set customCountLabelFunc to our custom label function
        self.customCountLabelFunc = ko.computed(function () {
            if (self.cellCustomCount()) {
                return function (dataContext) {
                    var s = dataContext['nodeCount'];
                    var percent = Math.round(100 * dataContext['nodeCount'] / dataContext['totalNodeCount']);
                    s += " (" + percent + "%)";
                    return s;
                }
            }
            return null;
        });
        // Axis titles
        self.rowsTitle = ko.computed(function () {
            return self.rowsTitleShow() ? "Potential" : null;
        });
        self.columnsTitle = ko.computed(function () {
            return self.columnsTitleShow() ? "Performance" : null;
        });



    var data = new Object();
    $.getJSON('js/data/employees.json',
        function (jsonData) {
            data = jsonData;
        }
    )
    alert(data);
    
    
        // Nodes array
        var nodes = [];
        for (var i = 0; i < data.length; i++) {
            var node = {};
            var employee = data[i];

            // Basic Node Info
            node['id'] = i.toString();
            node['label'] = employee['name'];
            node['secondaryLabel'] = employee['position'];
            node['row'] = employee['potential'];
            node['column'] = employee['performance'];
            node['shortDesc'] = employee['shortDesc'];

            // Node Icon
            var icon = {};
            icon['source'] = employee['image'];
            node['icon'] = icon;
            nodes.push(node);
        }
        self.nodes = nodes;

        self.styleDefaults = ko.computed(function () {
            var defaults = {};

            // Grid Styles
            if (self.rowsTitleStyle() && self.rowsTitleStyle().trim().length > 0)
                defaults['rowsTitleStyle'] = self.rowsTitleStyle().trim();
            if (self.rowLabelStyle() && self.rowLabelStyle().trim().length > 0)
                defaults['rowLabelStyle'] = self.rowLabelStyle().trim();
            if (self.columnsTitleStyle() && self.columnsTitleStyle().trim().length > 0)
                defaults['columnsTitleStyle'] = self.columnsTitleStyle().trim();
            if (self.columnLabelStyle() && self.columnLabelStyle().trim().length > 0)
                defaults['columnLabelStyle'] = self.columnLabelStyle().trim();

            // Cell Styles
            var cellDefaults = {};
            if (self.cellLabelStyle() && self.cellLabelStyle().trim().length > 0)
                cellDefaults['labelStyle'] = self.cellLabelStyle().trim();
            if (self.cellLabelAlign())
                cellDefaults['labelHalign'] = self.cellLabelAlign();
            if (self.cellStyle() && self.cellStyle().trim().length > 0)
                cellDefaults['style'] = self.cellStyle().trim();
            if (self.cellMinimizedStyle() && self.cellMinimizedStyle().trim().length > 0)
                cellDefaults['minimizedStyle'] = self.cellMinimizedStyle().trim();
            if (self.cellMaximizedStyle() && self.cellMaximizedStyle().trim().length > 0)
                cellDefaults['maximizedStyle'] = self.cellMaximizedStyle().trim();
            defaults['cellDefaults'] = cellDefaults;

            // Node Styles
            var nodeDefaults = {};
            if (self.nodeColor() && self.nodeColor().trim().length > 0)
                nodeDefaults['color'] = self.nodeColor().trim();
            if (self.nodeIndicatorColor() && self.nodeIndicatorColor().trim().length > 0)
                nodeDefaults['indicatorColor'] = self.nodeIndicatorColor().trim();
            if (self.nodeLabelStyle() && self.nodeLabelStyle().trim().length > 0)
                nodeDefaults['labelStyle'] = self.nodeLabelStyle().trim();
            if (self.nodeSecondaryLabelStyle() && self.nodeSecondaryLabelStyle().trim().length > 0)
                nodeDefaults['secondaryLabelStyle'] = self.nodeSecondaryLabelStyle().trim();
            if (self.nodeBorderColor() && self.nodeBorderColor().trim().length > 0)
                nodeDefaults['borderColor'] = self.nodeBorderColor().trim();
            if (self.nodeBorderWidth() && self.nodeBorderWidth().trim().length > 0)
                nodeDefaults['borderWidth'] = self.nodeBorderWidth().trim();
            defaults['nodeDefaults'] = nodeDefaults;

            return defaults;
        });
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new NBoxModel();
}
);
