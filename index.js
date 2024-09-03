function showPopup() {
  const node = $$("profile-button").getNode();
  const isVisible = $$("mywindow").isVisible();
  if (isVisible) {
    $$("mywindow").hide();
  } else {
    $$("mywindow").show(node);

  }
}

const profileList = {
  view: "list",
  width: 250,
  height: 72,
  select: true,
  scroll: false,
  data: [{ id: 1, value: "Settings" },
  { id: 2, value: "Log out" },
  ]
}

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
      id: "profile-button",
      label: "Profile",
      type: "icon",
      icon: "wxi-user",
      width: 150,
      css: "profile-icon",
      on: {
        "onItemClick": showPopup
      }
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
  id: 'films-table',
  autoConfig: true,
  data: small_film_set,
};

const formButtons = [
  {
    view: "button",
    value: "Add new",
    css: "webix_primary",
    click: function () {
      var values = $$("films-form").getValues();
      const isValid = $$("films-form").validate();

      if (isValid) {
        $$("films-table").add(values);
        webix.message("The film is successfully added");
      }
    }
  },
  {
    view: "button",
    value: "Clear",
    click: function () {
      webix.confirm({
        text: "Are you sure you want to clear the form?"
      }).then(
        function () {
          webix.message("Confirmed");
          $$("films-form").clear();
          $$("films-form").clearValidation()
        },
        function () {
          webix.message("Rejected");
        }
      );
    }
  },
];

const formHeader = {
  template: "EDIT FILMS",
  type: "section",
};


const filmsForm = {
  view: "form",
  id: "films-form",
  css: "films_form",
  width: 300,
  elements: [
    formHeader,
    { view: "text", label: "Title", name: "title", invalidMessage: "Title must be filled in" },
    {
      view: "text",
      label: "Year",
      name: "year",
      invalidMessage: "Year should be between 1970 and current "
    },

    { view: "text", label: "Rating", name: "rating", invalidMessage: "Votes must be less than 100000" },
    { view: "text", label: "Votes", name: "votes", invalidMessage: "Rating cannot be empty or 0" },
    {
      cols: formButtons,
    },

    {},
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    year: function (value) {
      return 1970 < value < 2024;
    },
    rating: function (value) {
      return webix.rules.isNotEmpty && value > 0;
    },
    votes: function (value) {
      return value < 100000;
    },
  }
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


