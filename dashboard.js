import widgetsIds from "./data_variables.js";

function save() {
    const form = $$(widgetsIds.filmsFormId);
    const isValid = form.validate();

    const films_table = $$(widgetsIds.filmsTableId);

    const item_data = form.getValues();

    if (isValid) {
        if (item_data.id) {
            films_table.updateItem(item_data.id, item_data);
            webix.message("The film is successfully updated");
        } else {

            let filmsQty = films_table.serialize(true).length;
            let newValues = { ...item_data, rank: ++filmsQty }
            films_table.add(newValues);
            webix.message("The film is successfully added");

        }
    }

}

function setFormValues(id) {
    const values = $$(widgetsIds.filmsTableId).getItem(id);
    $$(widgetsIds.filmsFormId).setValues(values);
}

//films table

const filmsTable = {
    view: "datatable",
    id: widgetsIds.filmsTableId,
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
        onAfterSelect: setFormValues
    },
    url: "./data/data.js",
    hover: "hover-row"
};

//form

const formButtons = [
    {
        view: "button",
        value: "Save",
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
                    const formId = $$(widgetsIds.filmsFormId);
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
    id: widgetsIds.filmsFormId,
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

        { view: "text", label: "Rating", name: "rating", invalidMessage: "Rating cannot be empty or 0" },
        { view: "text", label: "Votes", name: "votes", invalidMessage: "Votes must be less than 100000" },

        {
            cols: formButtons,
        },

        {},
    ],
    rules: {
        title: webix.rules.isNotEmpty,
        year: function (value) {
            return 1970 < value && value < 2024;
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

const dashboard = { id: widgetsIds.dashboard, cols: [filmsTable, formBody] }
export default dashboard;
