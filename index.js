
const head = {
  view: "toolbar",
  css: "webix_dark",
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

const sideBarData = [
  { id: 1, value: "Dashboard", $css: "sidebar-item" },
  { id: 2, value: "Users", $css: "sidebar-item" },
  { id: 3, value: "Products", $css: "sidebar-item" },
  { id: 4, value: "Locations", $css: "sidebar-item" },
];

const sideBar = {
  view: "list",
  css: "side-bar",
  width: 250,
  scroll: false,
  data: sideBarData,
};

const connectStatus = {
  css: "connect-status",
  height: 40,
  template: "<span class='webix_icon wxi-check'></span> Connected",
};

const filmsTable = {
  view: "datatable",
  autoConfig: true,
  data: small_film_set,
};

const formButtons = [
  {
    view: "button",
    value: "Add new",
    css: "webix_primary",
  },
  {
    view: "button",
    value: "Clear",
  },
];

const formHeader = {
  template: "EDIT FILMS",
  type: "section",
};


const filmsForm = {
  view: "form",
  css: "films_form",
  width: 300,
  elements: [
    formHeader,
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




const formBody = {
  rows: [filmsForm],
};

const main = {
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

const foot = {
  rows: [
    {
      css: "footer",
      height: 30,
      template: `The software id provided by  <a style='margin-left:5px' href="https://webix.com" target="_blank">https://webix.com</a>. All rights reserved (c)`,
    },
  ],
};


