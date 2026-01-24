db = db.getSiblingDB("clothing_db");

db.createUser({
    user: "clothing_user",
    pwd: "clothing_pass",
    roles: [{ role: "readWrite", db: "clothing_db" }]
});
