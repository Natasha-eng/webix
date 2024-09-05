// products

const products = {
    view: "treetable",
    id: "Products",
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
    url: "ю/data/products.js",
    ready: function () {
        this.openAll();
    },
}

export default products;