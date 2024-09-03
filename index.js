//widget's IDs
const profileButtonId = "profile-button";
const windowId = "mywindow";
const toolbarId = "myToolbar";
const filmsTableId = "films-table";
const filmsFormId = "films-form";


function showPopup() {
  const node = $$(profileButtonId).getNode();
  const win = $$(windowId);
  const isVisible = win.isVisible();
  if (isVisible) {
    win.hide();
  } else {
    win.show(node);

  }
}

const profileList = {
  view: "list",
  width: 250,
  autoheight: true,
  select: true,
  scroll: false,
  data: [
    { id: 1, value: "Settings" },
    { id: 2, value: "Log out" },
  ]
}

const head = {
  view: "toolbar",
  css: "webix_dark",
  id: toolbarId,
  height: 50,
  padding: 10,
  cols: [
    { view: "label", label: "My App", css: "logo" },
    {
      view: "button",
      id: profileButtonId,
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
  id: filmsTableId,
  autoConfig: true,
  data: small_film_set,
};

const formButtons = [
  {
    view: "button",
    value: "Add new",
    css: "webix_primary",
    click: function () {

      const filmsForm = $$(filmsFormId);

      const isValid = filmsForm.validate();

      if (isValid) {
        const values = filmsForm.getValues();
        $$(filmsTableId).add(values);
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
          const formId = $$(filmsFormId);
          webix.message("Confirmed");
          formId.clear();
          formId.clearValidation()
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
  id: filmsFormId,
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


