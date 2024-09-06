import widgetsIds from "./data_variables.js";



function bindFormData() {
    $$(widgetsIds.filmsFormId).bind($$(widgetsIds.filmsTableId));
}

// function bindFormData() {
//     $$(widgetsIds.filmsFormId).bind($$(widgetsIds.filmsTableId));
// }
function filterYear() {
    $$(widgetsIds.filmsTableId).registerFilter(
        $$("selector"),
        {
            columnId: "start", compare: function (value, filter, item) {
                let year = value;
                console.log('value', value)
                console.log('filter', filter)
                console.log('item', item)
                if (filter == "old") return year > 2000;
                else if (filter == "modern") return year >= 2000 && year >= 2015;
                else if (filter == "new") return year > 2015;
                else return year > 1600
            }
        },
        {
            getValue: function (node) {
                return node.getValue();
            },
            setValue: function (node, value) {
                node.setValue(value);
            }
        }
    );
}


function save() {
    const form = $$(widgetsIds.filmsFormId);
    const isValid = form.validate();
    const films_table = $$(widgetsIds.filmsTableId);
    const form_data = form.getValues();

    if (isValid) {
        if (form_data.id) {
            form.save();
            webix.message("The film is successfully updated");
        } else {
            let filmsQty = films_table.serialize(true).length;
            let newValues = { ...form_data, rank: ++filmsQty };

            form.save(newValues);
            webix.message("The film is successfully added");
        }
    }
}

const tabButtons = {
    borderless: true, view: "tabbar", id: "tabbar", value: "listView", multiview: true, options: [
        { value: 'All', id: 'All' },
        { value: 'Old', id: 'Old' },
        { value: 'Modern', id: 'Modern' },
        { value: 'New', id: 'New' }
    ]
}


//films table
const filmsTable = {
    view: "datatable",
    id: widgetsIds.filmsTableId,
    select: true,
    scrollX: false,
    fillspace: true,
    columns: [
        { id: "rank", header: "", width: 50, template: "#rank#", css: "rank", sort: "text" },
        { id: "title", header: ["Film title", { content: "textFilter" }], template: "#title#", fillspace: true, sort: "text" },
        {
            id: "categoryId", header: ["Category", { content: "selectFilter" }], editable: true, width: 100, sort: "int", collection: "./data/categories.js"
        },
        // {
        //     id: "year", header: ["Released", { content: "textFilter" }], template: "#year#",
        //     width: 100,
        //     sort: "text"
        // },
        {
            id: "votes", header: ["Votes", { content: "textFilter" }], template: function (obj) {

                return "<div class='space'>" + obj.votes + "<span class='removeBtn webix_icon wxi-trash'></span></div>";
            },
            width: 100,
            sort: "text"
        },
        { id: "start", header: "Year", width: 100, template: "#year#" },
    ],
    scheme: {
        $init: function (obj) {
            const randomId = Math.floor(Math.random() * (4 - 1 + 1) + 1);
            obj.categoryId = randomId;
        }
    },
    onClick: {
        removeBtn: function (ev, id) {
            this.remove(id);
            return false;
        }
    },
    
    ready: bindFormData,
    ready: filterYear,
   
    url: "./data/data.js",
    hover: "hover-row",
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
            name: "start",
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

const dashboard = {
    id: widgetsIds.dashboard,

    rows: [
        {
            view: "segmented",
            id: "selector",
            value: "all",
            options: [
                { "id": "all", "value": "All" },
                { "id": "old", "value": "Old" },
                { "id": "modern", "value": "Modern" },
                { "id": "new", "value": "New" }
            ],
            on: {
                onChange: function () {
                    $$(widgetsIds.filmsTableId).filterByAll();
                }
            }

        },
        {
            cols: [filmsTable, formBody]
        }
    ]
}
export default dashboard;
