import widgetsIds from "./data_variables.js";

//users

function sortNameAsc() {
  $$(widgetsIds.usersListId).sort("#name#");
}

function sortNameDesc() {
  $$(widgetsIds.usersListId).sort("#name#", "desc");
}

function deleteUser(ev, id) {
  this.remove(id);
  return false;
}
function addNewUser() {
  const userList = $$(widgetsIds.usersListId);
  const inputValue = $$(widgetsIds.usersInputId).getValue();
  if (!inputValue) {
    webix.message("Fill in the filed.");
    return;
  }
  const userArr = inputValue.split(",");
  userList.add({ name: userArr[0], age: userArr[1], country: userArr[2] });
}

const usersFilterAndSort = {
  cols: [
    {
      view: "text",
      id: widgetsIds.usersInputId,
      on: {
        onTimedKeyPress: function () {
          let value = this.getValue().toLowerCase();
          $$(widgetsIds.usersListId).filter(function (obj) {
            return obj.name.toLowerCase().indexOf(value) !== -1;
          });
        },
      },
    },
    {
      view: "button",
      autowidth: true,
      value: "Sort asc",
      click: sortNameAsc,
    },
    {
      view: "button",
      autowidth: true,
      value: "Sort desc",
      click: sortNameDesc,
    },
    {
      view: "button",
      autowidth: true,
      value: "Add new",
      click: addNewUser,
    },
  ],
};

const usersList = {
  view: "editlist",
  height: 200,
  id: widgetsIds.usersListId,
  editable: true,
  editor: "text",
  editValue: "name",
  template:
    "<div class='space user-list-style'>#name# from #country# <span class='deleteUser webix_icon wxi-close' ></span></div>",
  select: true,
  url: "./data/users.js",
  scheme: {
    $init: function (obj) {
      if (obj.age < 26) obj.$css = "yellow";
    },
  },
  onClick: {
    deleteUser: deleteUser,
  },
  ready: function () {
    $$(widgetsIds.chart).sync($$(widgetsIds.usersListId), function () {
      this.group({
        by: "country",
        map: {
          id: ["id", "count"],
        },
      });
    });
  },
};

const userschart = {
  view: "chart",
  id: widgetsIds.chart,
  type: "bar",
  barWidth: 50,
  radius: 0,
  layout: "x",
  value: "#id#",
  xAxis: {
    template: "#country#",
  },
  yAxis: {
    start: 0,
    step: 2,
    end: 10,
  },
  legend: {
    values: [{ text: "Country", color: "transparent" }],
    valign: "bottom",
    align: "center",
    layout: "x",
  },
};

const users = {
  id: widgetsIds.users,
  template: "Users View",
  rows: [usersFilterAndSort, usersList, userschart],
};

webix.protoUI(
  {
    name: "editlist",
  },
  webix.EditAbility,
  webix.ui.list
);

export default users;
