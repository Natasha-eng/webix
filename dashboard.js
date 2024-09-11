import { categoriesCollection } from "./collection.js";
import widgetsIds from "./data_variables.js";

function filterYear() {
  $$(widgetsIds.filmsTableId).registerFilter(
    $$(widgetsIds.tabuttons_id),
    {
      columnId: widgetsIds.filmTables_year,
      compare: function (value, filter, item) {
        let year = value;
        if (filter == widgetsIds.tabbuttons_old) return year < 2000;
        else if (filter == widgetsIds.tabbuttons_modern)
          return year >= 2000 && year <= 2006;
        else if (filter == widgetsIds.tabbuttons_new) return year > 2007;
        else return year;
      },
    },
    {
      getValue: function (object) {
        return object.getValue();
      },
    }
  );
}

function bindFormData() {
  $$(widgetsIds.filmsFormId).bind($$(widgetsIds.filmsTableId));
  filterYear();
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
  borderless: true,
  view: "tabbar",
  id: widgetsIds.tabuttons_id,
  value: widgetsIds.tabbuttons_all,
  autoheight: true,
  options: [
    { id: widgetsIds.tabbuttons_all, value: widgetsIds.tabbuttons_all },
    { id: widgetsIds.tabbuttons_old, value: widgetsIds.tabbuttons_old },
    { id: widgetsIds.tabbuttons_modern, value: widgetsIds.tabbuttons_modern },
    { id: widgetsIds.tabbuttons_new, value: widgetsIds.tabbuttons_new },
  ],
  click: function () {
    $$(widgetsIds.filmsTableId).filterByAll();
  },
};

//films table
const filmsTable = {
  view: "datatable",
  id: widgetsIds.filmsTableId,
  select: true,
  scrollX: false,
  fillspace: true,
  columns: [
    {
      id: widgetsIds.filmTables_rank,
      header: "",
      width: 50,
      template: "#rank#",
      css: "rank",
    },
    {
      id: widgetsIds.filmTables_title,
      header: ["Film title", { content: "textFilter" }],
      template: "#title#",
      fillspace: true,
    },
    {
      id: widgetsIds.filmTables_category,
      header: ["Category", { content: "selectFilter" }],
      editable: true,
      width: 100,

      collection: categoriesCollection,
    },
    {
      id: widgetsIds.filmTables_votes,
      header: ["Votes", { content: "textFilter" }],
      template: "#votes#",
      width: 100,
    },
    {
      id: widgetsIds.filmTables_rating,
      header: ["Rating", { content: "textFilter" }],
      template: "#rating#",
      width: 100,
    },
    {
      id: widgetsIds.filmTables_year,
      header: "Year",
      width: 100,
      template: function (obj) {
        return (
          "<div class='space'>" +
          obj.year +
          "<span class='removeBtn webix_icon wxi-trash'></span></div>"
        );
      },
    },
  ],
  scheme: {
    $init: function (obj) {
      const randomId = Math.floor(Math.random() * (4 - 1 + 1) + 1);
      obj.categoryId = randomId;
    },
  },
  onClick: {
    removeBtn: function (ev, id) {
      this.remove(id);
      return false;
    },
  },
  ready: bindFormData,
  url: "./data/data.js",
  hover: "hover-row",
};

//form
const formButtons = [
  {
    view: "button",
    value: "Save",
    css: "webix_primary",
    click: save,
  },
  {
    view: "button",
    value: "Clear",
    click: function () {
      webix
        .confirm({
          text: "Are you sure you want to clear the form?",
        })
        .then(
          function () {
            const formId = $$(widgetsIds.filmsFormId);
            const dataTableId = $$(widgetsIds.filmsTableId);
            webix.message("Confirmed");
            formId.clear();
            formId.clearValidation();
            dataTableId.clearSelection();
          },
          function () {
            webix.message("Rejected");
          }
        );
    },
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
    {
      view: "text",
      label: "Title",
      name: widgetsIds.filmTables_title,
      invalidMessage: "Title must be filled in",
    },
    {
      view: "text",
      label: "Year",
      name: widgetsIds.filmTables_year,
      invalidMessage: "Year should be between 1970 and current",
    },

    {
      view: "text",
      label: "Rating",
      name: widgetsIds.filmTables_rating,
      invalidMessage: "Rating cannot be empty or 0",
    },

    {
      view: "text",
      label: "Votes",
      name: widgetsIds.filmTables_votes,
      invalidMessage: "Votes must be less than 100000",
    },
    {
      view: "richselect",
      options: categoriesCollection,
      label: "Category",
      name: widgetsIds.filmTables_category,
    },
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
  },
};

const formBody = {
  rows: [filmsForm],
};

const dashboard = {
  id: widgetsIds.dashboard,

  rows: [
    {
      cols: [
        tabButtons,
        {
          view: "",
          template: "<div> </div>",
          borderless: true,
        },
      ],
    },
    {
      cols: [filmsTable, formBody],
    },
  ],
};

export default dashboard;
