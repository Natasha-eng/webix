const categoriesCollection = new webix.DataCollection({
    url: "./data/categories.js"
});

const usersCollection = new webix.DataCollection({
    url: "./data/users.js"
});

export { categoriesCollection, usersCollection };
