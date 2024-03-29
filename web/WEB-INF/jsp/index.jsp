<!DOCTYPE html>
<!--
 Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 -->

<!-- ************************ IMPORTANT INFORMATION ************************************
  This web navigation drawer template is provided as an example of how to configure
  a JET web application with a navigation drawer as a single page application
  using ojRouter and ojModule.  It contains the Oracle JET framework and a default
  requireJS configuration file to show how JET can be setup in a common application.
  This project template can be used in conjunction with demo code from the JET
  website to test JET component behavior and interactions.

  Any CSS styling with the prefix "demo-" is for demonstration only and is not
  provided as part of the JET framework.

  Please see the demos under Cookbook/Patterns/App Shell: Web and the CSS documentation
  under Support/API Docs/Non-Component Styling on the JET website for more information on how to use 
  the best practice patterns shown in this template.

  Aria Landmark role attributes are added to the different sections of the application
  for accessibility compliance. If you change the type of content for a specific
  section from what is defined, you should also change the role value for that
  section to represent the appropriate content type.
  ***************************** IMPORTANT INFORMATION ************************************ -->
<html lang="en-us">
  <head>
    <title>Oracle JET Starter Template - Web Nav Drawer</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="css/images/favicon.ico" type="image/x-icon" />

    <!-- This is the main css file for the default Alta theme -->
    <!-- injector:theme -->
    <link rel="stylesheet" href="css/libs/oj/v3.0.0/alta/oj-alta-min.css" type="text/css"/>
    <!-- endinjector -->
    
    <!-- This contains icon fonts used by the starter template -->
    <link rel="stylesheet" href="css/demo-alta-site-min.css" type="text/css"/>

    <!-- This is where you would add any app specific styling -->
    <link rel="stylesheet" href="css/override.css" type="text/css"/>
    
    
		
    
    
  </head>
  <body class="oj-web-applayout-body">
    <!-- Template for rendering navigation items shared between nav bar and nav list -->
    <script type="text/html" id="navTemplate">
      <li><a href="#">
        <span data-bind="css: $data['iconClass']"></span>
        <!-- ko text: $data['name'] --> <!--/ko-->
      </a></li>
    </script>

    <div id="globalBody" class="oj-offcanvas-outer-wrapper oj-offcanvas-page">
      <!--
         ** Oracle JET V2.3.0 web application navigation drawer pattern.
         ** Please see the demos under Cookbook/Patterns/App Shell: Web
         ** and the CSS documentation under Support/API Docs/Non-Component Styling
         ** on the JET website for more information on how to use this pattern. 
         ** The off-canvas section is used when the browser is resized to a smaller media
         ** query size for a phone format and hidden until a user clicks on
         ** the header hamburger icon.
      -->
      <div id="navDrawer" class="oj-contrast-marker oj-web-applayout-offcanvas oj-offcanvas-start">
        <div role="navigation" data-bind="ojComponent: {component: 'ojNavigationList',
          optionChange: navChangeHandler, navigationLevel: 'application',
          item: {template: 'navTemplate'}, data: navDataSource,
          selection: router.stateId, edge: 'start'}">
        </div>
      </div>
      <div id="pageContent" class="oj-web-applayout-page">
        <!--
           ** Oracle JET V2.3.0 web application header pattern.
           ** Please see the demos under Cookbook/Patterns/App Shell: Web
           ** and the CSS documentation under Support/API Docs/Non-Component Styling
           ** on the JET website for more information on how to use this pattern.
        -->
        <header role="banner" class="oj-web-applayout-header">
          <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
            <!-- Offcanvas toggle button -->
            <div class="oj-flex-bar-start oj-md-hide">
              <button class="oj-button-lg" data-bind="click: toggleDrawer,
                ojComponent: {component:'ojButton', label: 'Application Navigation',
                chroming: 'half', display: 'icons', icons: {start: 'oj-web-applayout-offcanvas-icon'}}">
              </button>
            </div>
            <div data-bind="css: smScreen() ? 'oj-flex-bar-center-absolute' : 'oj-flex-bar-middle oj-sm-align-items-baseline'">
              <span role="img" class="oj-sm-only-hide oj-icon demo-oracle-icon" title="Oracle Logo" alt="Oracle Logo"></span>
              <h1 class="oj-web-applayout-header-title" title="Application Name" data-bind="text: appName"></h1>
            </div>
            <div class="oj-flex-bar-end">
              <!-- Responsive Toolbar -->
              <div data-bind="ojComponent: {component:'ojToolbar'}">
                <button id="userMenu"
                  data-bind="ojComponent: {component: 'ojButton', label: userLogin,
                  display: smScreen() ? 'icons' : 'all',
                  icons: smScreen() ? {start: 'oj-icon demo-appheader-avatar', end: null} : {end: 'oj-component-icon oj-button-menu-dropdown-icon'},
                  chroming: 'half', menu: '#menu1'}">
                </button>
                <ul id='menu1' data-bind="ojComponent: {component: 'ojMenu'}" style="display:none">
                  <li id="pref"><a href="#">Preferences</a></li>
                  <li id="help"><a href="#">Help</a></li>
                  <li id="about"><a href="#">About</a></li>
                  <li id="out"><a href="#">Sign Out</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div role="navigation" class="oj-web-applayout-max-width oj-web-applayout-navbar">
            <div data-bind="ojComponent: {component: 'ojNavigationList',
              navigationLevel: 'application',
              item: {template: 'navTemplate'}, data: navDataSource,
              selection: router.stateId, edge: 'top'}"
              class="oj-web-applayout-navbar oj-sm-only-hide oj-md-condense oj-md-justify-content-flex-end">
            </div>
          </div>
        </header>
        <div role="main" class="oj-web-applayout-max-width oj-web-applayout-content" data-bind="ojModule: router.moduleConfig">
        </div>
        <footer class="oj-web-applayout-footer" role="contentinfo">
          <div class="oj-web-applayout-footer-item oj-web-applayout-max-width">
            <ul>
              <!-- ko foreach: footerLinks -->
              <li><a data-bind="text : name, attr : {id: linkId, href : linkTarget}"></a></li>
              <!-- /ko -->
            </ul>
          </div>
          <div class="oj-web-applayout-footer-item oj-web-applayout-max-width oj-text-secondary-color oj-text-sm">
            Copyright � 2014, 2017 Oracle and/or its affiliates All rights reserved.
          </div>
        </footer>
      </div>
    </div>
    
    <script type="text/javascript" src="js/libs/require/require.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

  </body>

</html>