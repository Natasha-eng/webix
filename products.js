import widgetsIds from "./data_variables.js";

// products

const products = {
    view: "treetable",
    id: widgetsIds.products,
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
    url: "./data/products.js",
    ready: function () {
        this.openAll();
    },
}

export default products;