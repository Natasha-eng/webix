//widget's IDs
const profileButtonId = "profile-button";
const windowId = "mywindow";
const toolbarId = "myToolbar";
const filmsTableId = "films-table";
const filmsFormId = "films-form";
const usersInputId = "users-input";
const usersListId = "users-list";


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

function save() {
  const form = $$(filmsFormId);
  let isValid = form.validate();

  const list = $$(filmsTableId);

  const item_data = form.getValues();

  if (item_data.id && isValid) {
    list.updateItem(item_data.id, item_data);
    webix.message("The film is successfully updated");
  } else if (isValid) {
    if (isValid) {
      const last_id = list.getLastId();
      let values = list.getItem(last_id);
      let rank = values.rank;

      let newValues = { ...item_data, rank: ++rank }
      list.add(newValues);
      webix.message("The film is successfully added");
    }
  }


}

function setValues(id) {
  var values = $$(filmsTableId).getItem(id);
  $$(filmsFormId).setValues(values);
}

function sortNameAsc() {
  $$(usersListId).sort("#name#");
}

function sortNameDesc() {
  $$(usersListId).sort("#name#", "desc");
}

function deleteUser() {
  var list = $$(usersListId);
  var item_id = list.getSelectedId();
  if (item_id) {
    list.remove(item_id)
  }
};



//header
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

//sidebar

const sideBarData = [
  { id: "Dashboard", value: "Dashboard", $css: "sidebar-item" },
  { id: "Users", value: "Users", $css: "sidebar-item" },
  { id: "Products", value: "Products", $css: "sidebar-item" },

];

const sideBar = {
  view: "list",
  css: "side-bar",
  width: 250,
  scroll: false,
  select: true,
  on: {
    onAfterSelect: function (id) {
      $$(id).show();
    }
  },
  data: sideBarData,
};

const connectStatus = {
  css: "connect-status",
  height: 40,
  template: "<span class='webix_icon wxi-check'></span> Connected",
};

//films table

const filmsTable = {
  view: "datatable",
  id: filmsTableId,
  select: true,
  scrollX: false,
  columns: [
    { id: "rank", header: "", width: 50, template: "#rank#", css: "rank", sort: "text" },
    { id: "title", header: ["Film title", { content: "textFilter" }], template: "#title#", fillspace: true, sort: "text" },
    {
      id: "year", header: ["Released", { content: "textFilter" }], template: "#year#",
      width: 100,
      sort: "text"
    },
    {
      id: "votes", header: ["Votes", { content: "textFilter" }], template: function (obj) {

        return "<div class='space'>" + obj.votes + "<span class='removeBtn webix_icon wxi-trash'></span></div>";

      },
      width: 100,
      sort: "text"
    },


  ],
  onClick: {
    removeBtn: function (ev, id) {
      this.remove(id);
      return false;
    }
  },
  on: {
    onAfterSelect: setValues
  }
  ,
  url: "http://127.0.0.1:5500/data/data.js",
  hover: "hover-row"
};

//form

const formButtons = [
  {
    view: "button",
    value: "Add new",
    css: "webix_primary",
    click: save
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
    { view: "text", label: "Rank", name: "rank", hidden: true },
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

//users

const usersFilterAndSort = {
  cols: [
    {
      view: "text", id: usersInputId,
      on: {
        onTimedKeyPress: function () {
          let value = this.getValue().toLowerCase();
          $$(usersListId).filter(function (obj) {
            return obj.name.toLowerCase().indexOf(value) !== -1;
          })
        }
      }
    },
    {
      view: "button", autowidth: true, value: "Sort asc", click: sortNameAsc
    },
    {
      view: "button", autowidth: true, value: "Sort desc", click: sortNameDesc
    },
  ]

}

const usersList = {
  view: "list",
  height: 200,
  id: usersListId,
  template: "<div class='space user-list-style'>#name# from #country# <span class='deleteUser webix_icon wxi-close' ></span></div>",
  select: true,
  url: "http://127.0.0.1:5500/data/users.js",
  onClick: {
    "deleteUser": deleteUser
  },
  ready: function () {
    let count = 0;
    this.data.each(function (obj) {
      count++;
      if (count < 6) {
        $$(usersListId).addCss(obj.id, "common")
      }
    });

  }
}

const userschart = {
  view: "chart",
  type: "bar",
  value: "#age#",
  // label: "#age#",
  barWidth: 50,
  radius: 0,
  xAxis: {
    template: "'#age#"
  },
  legend: {
    values: [{ text: "Age" }],
    valign: "bottom",
    align: "center",
  },
  url: "http://127.0.0.1:5500/data/users.js"
}

// products

const products = {
  view: "treetable",
  columns: [
    { id: "id", header: "", css: { "text-align": "right" } },
    {
      id: "title", header: "Title",
      template: "{common.treetable()} #title#",
      fillspace: true
    },
    { id: "price", header: "Price", fillspace: true },

  ],
  select: "cell",
  scrollX: false,
  url: "http://127.0.0.1:5500/data/products.js",
  ready: function () {
    this.openAll();
  },
}


const switchData = {
  cells: [
    { id: "Dashboard", cols: [filmsTable, formBody] },
    { id: "Users", template: "Users View", rows: [usersFilterAndSort, usersList, userschart] },
    { id: "Products", template: "Products view", rows: [products, {}] }
  ],
  animate: false
};

const main = {
  cols: [
    {
      css: "side-bar-container",
      rows: [sideBar, connectStatus],
    },
    { view: "resizer" },
    switchData,
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
