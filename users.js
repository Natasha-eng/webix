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

};

const usersFilterAndSort = {
    cols: [
        {
            view: "text", id: widgetsIds.usersInputId,
            on: {
                onTimedKeyPress: function () {
                    let value = this.getValue().toLowerCase();
                    $$(widgetsIds.usersListId).filter(function (obj) {
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
    id: widgetsIds.usersListId,
    template: "<div class='space user-list-style'>#name# from #country# <span class='deleteUser webix_icon wxi-close' ></span></div>",
    select: true,
    url: "./data/users.js",
    onClick: {
        "deleteUser": deleteUser
    },
    ready: function () {
        let count = 0;
        this.data.each(function (obj) {
            count++;
            if (count < 6) {
                $$(widgetsIds.usersListId).addCss(obj.id, "common")
            }
        });
    }
}

const userschart = {
    view: "chart",
    type: "bar",
    value: "#age#",
    barWidth: 50,
    radius: 0,
    layout: "x",
    xAxis: {
        template: "'#age#"
    },
    label: "#age#",
    legend: {
        values: [{ text: "Age", color: "transparent" }],
        valign: "bottom",
        align: "center",
        layout: "x"
    },
    url: "./data/users.js"
}


const users = { id: widgetsIds.users, template: "Users View", rows: [usersFilterAndSort, usersList, userschart] }

export default users;