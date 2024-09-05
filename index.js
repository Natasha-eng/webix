import dashboard from "./dashboard.js"
import users from "./users.js"
import products from "./products.js"

//widget's IDs
const profileButtonId = "profile-button";
const windowId = "mywindow";
const toolbarId = "myToolbar";


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
  { id: "Dashboard", value: "Dashboard" },
  { id: "Users", value: "Users" },
  { id: "Products", value: "Products" },

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

const switchData = {
  cells: [
    dashboard,
    users,
    products,
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

//footer
const foot = {
  rows: [
    {
      css: "footer",
      height: 30,
      template: `The software id provided by  <a style='margin-left:5px' href="https://webix.com" target="_blank">https://webix.com</a>. All rights reserved (c)`,
    },
  ],
};

export { head, main, foot, profileList, windowId };