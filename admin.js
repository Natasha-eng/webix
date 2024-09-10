import widgetsIds from "./data_variables.js";
import { categoriesCollection } from "./collection.js";

const admin = {
    id: widgetsIds.admin,
    margin: 100,
    type: "clean",
    rows: [
        {
            cols: [
                {
                    id: widgetsIds.adminTable,
                    view: "datatable",
                    editable: true,
                    select: true,
                    width: 600,
                    scrollX: false,
                    autoheight: true,
                    columns: [
                        {
                            id: widgetsIds.admin_category,
                            header: "Category",
                            fillspace: true,
                            editor: "text",
                        },
                        {
                            fillspace: true,
                            template: "<div class='end'><span class='removeBtn webix_icon wxi-trash'></span></div>",
                        },
                    ],

                    onClick: {
                        removeBtn: function (ev, id) {
                            categoriesCollection.remove(id);
                            return false;
                        },
                    },
                    hover: "hover-row",
                },

            ]
        },
        {},
        {
            id: widgetsIds.adminForm,
            view: "form",
            fillspace: true,
            elements: [
                { view: "text", width: 295, id: "title", name: "value", value: "", placeholder: "Category" },
                {
                    view: "button", width: 190, value: "Add new category", click: function () {
                        const values = $$(widgetsIds.adminForm).getValues();
                        categoriesCollection.add(values, 0);
                        $$(widgetsIds.adminForm).clear();

                    }
                }
            ],
        }
    ]


};

export default admin;
