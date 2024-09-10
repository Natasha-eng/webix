import dashboard from "./dashboard.js";
import users from "./users.js";
import products from "./products.js";
import widgetsIds from "./data_variables.js";
import admin from "./admin.js"
import { categoriesCollection, usersCollection } from "./collection.js";

function showPopup() {
  const node = $$(widgetsIds.profileButtonId).getNode();
  const win = $$(widgetsIds.windowId);
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
  ],
};

const head = {
  view: "toolbar",
  css: "webix_dark",
  id: widgetsIds.toolbarId,
  height: 50,
  padding: 10,
  cols: [
    { view: "label", label: "My App", css: "logo" },
    {
      view: "button",
      id: widgetsIds.profileButtonId,
      label: "Profile",
      type: "icon",
      icon: "wxi-user",
      width: 150,
      css: "profile-icon",
      on: {
        onItemClick: showPopup,
      },
    },
  ],
};

//sidebar
const sideBarData = [
  { id: widgetsIds.dashboard, value: widgetsIds.dashboard },
  { id: widgetsIds.users, value: widgetsIds.users },
  { id: widgetsIds.products, value: widgetsIds.products },
  { id: widgetsIds.admin, value: widgetsIds.admin },
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
    },
  },
  data: sideBarData,
};

const connectStatus = {
  css: "connect-status",
  height: 40,
  template: "<span class='webix_icon wxi-check'></span> Connected",
};

const switchData = {

  cells: [dashboard, users, products, admin],
  animate: false,
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

webix.ready(function () {
  webix.ui({
    id: widgetsIds.app,
    rows: [head, main, foot],
  });

  webix.ui({
    view: "window",
    id: widgetsIds.windowId,
    width: 300,
    head: false,
    body: profileList,
  });

  $$(widgetsIds.adminTable).sync(categoriesCollection);
  $$(widgetsIds.chart).sync(usersCollection,
    function () {
      this.group({
        by: "country",
        map: {
          countryCount: ["country", "count"],
        },
      });
    }
  );

  $$(widgetsIds.usersListId).sync(usersCollection);
});


