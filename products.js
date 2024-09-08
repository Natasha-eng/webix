import widgetsIds from "./data_variables.js";

// products
const products = {
  view: "treetable",
  id: widgetsIds.products,
  editable: true,
  columns: [
    { id: widgetsIds.products_id, header: "", css: { "text-align": "right" } },
    {
      id: widgetsIds.products_title,
      header: "Title",
      template: "{common.treetable()} #title#",
      fillspace: true,
      editor: "text",
    },
    {
      id: widgetsIds.products_price,
      header: "Price",
      fillspace: true,
      editor: "text",
    },
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    price: webix.rules.isNumber,
  },
  scrollX: false,
  url: "./data/products.js",
  ready: function () {
    this.openAll();
  },
};

export default products;
