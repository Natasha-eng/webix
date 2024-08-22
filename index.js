webix.ready(function () {
  var head = {
    view: "toolbar",
    css: "header",
    id: "myToolbar",
    height: 50,
    padding: 10,
    cols: [
      { view: "label", label: "My App", css: "logo" },
      {
        view: "button",
        label: "Profile",
        type: "icon",
        icon: "wxi-user",
        width: 150,
        css: "profile-icon",
      },
    ],
  };

  var sideBarData = [
    { id: 1, value: "Dashboard", $css: "sidebar-item" },
    { id: 2, value: "Users", $css: "sidebar-item" },
    { id: 3, value: "Products", $css: "sidebar-item" },
    { id: 4, value: "Locations", $css: "sidebar-item" },
  ];

  var sideBar = {
    view: "list",
    css: "side-bar",
    width: 250,
    scroll: false,
    data: sideBarData,
  };

  var connectStatus = {
    css: "connect-status",
    height: 50,
    template: "<span class='webix_icon wxi-check'></span> Connected",
  };

  var filmsTable = {
    view: "datatable",
    autoConfig: true,
    data: small_film_set,
  };

  var formButtons = [
    {
      view: "button",
      type: "form",
      value: "Add new",
      css: "form-button",
    },
    {
      view: "button",
      type: "form",
      value: "Clear",
    },
  ];

  var filmsForm = {
    view: "form",
    borderless: true,
    css: "films_form",
    width: 300,
    elements: [
      { view: "text", label: "Title", name: "title" },
      {
        view: "text",
        label: "Year",
        name: "year",
      },

      { view: "text", label: "Rating", name: "rating" },
      { view: "text", label: "Votes", name: "votes" },
      {
        cols: formButtons,
      },

      {},
    ],
  };

  var formHeader = {
    css: "form_name_wrapper",
    height: 60,
    template:
      "<div class='bottom'> <div class='form-name'>EDIT FILMS<div/><div/>",
    type: "header",
  };

  var formBody = {
    rows: [formHeader, filmsForm],
  };

  var main = {
    cols: [
      {
        css: "side-bar-container",
        rows: [sideBar, connectStatus],
      },
      { view: "resizer" },
      filmsTable,
      formBody,
    ],
  };

  var foot = {
    rows: [
      {
        css: "footer",
        height: 30,
        template: `The software id provided by  <a style='margin-left:5px' href="https://webix.com" target="_blank">https://webix.com</a>. All rights reserved (c)`,
      },
    ],
  };

  webix.ui({
    id: "app",
    rows: [head, main, foot],
  });
});
