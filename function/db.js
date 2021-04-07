'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 * @copyright ©yuzuru, 2021
 **/
let low = require('lowdb');
let FileSync = require('lowdb/adapters/FileSync');
let adapter = new FileSync("./db/shiroko.json");
let db = low(adapter);

exports.getDB = () => {
    return db;
};

db.defaults({
    user: [],
    servers: []
}).write();

exports.createServer = (id) => {
    db.get('servers').push({serverid: id}).write();
};

exports.deleteServer = (id) => {
    db.get('servers').push({serverid: id}).write();
};

exports.doesServerExists = (id) => {
    if(db.get('servers')
        .find({ serverid: id })
        .value() === undefined) return false;
    return true;
};

exports.noServerCreate = (id) => {
    if (!this.doesServerExists(id)) return this.createServer(id);
};

exports.setServer = (id, entry, value) => {
    db.get('servers').find({ serverid: id }).set(entry, value).write();
};

exports.unsetServer = (id, entry) => {
    this.noServerCreate(id);
    db.get('servers').find({serverid: id}).unset(entry).write();
};

exports.getServer = (id, entry) => {
    db.get('servers').find({serverid: id}).get(entry).value();
};

exports.doesUserExist = (id) => {
    return db.get('user')
        .find({id: id})
        .value() !== undefined;

};

exports.noUserCreate = (id) => {
    if (!this.doesUserExist(id)) this.createUser(id);
};

exports.createUser = (id) => {
    db.get('user').push({id: id}).write();
};

exports.deleteUser = (id) => {
    db.get('user').remove({id: id}).write();
};

exports.setUser = (id, entry, value) => {
    this.noUserCreate(id);
    db.get('user').find({ id: id }).set(entry, value).write();
};

exports.getUser = (id, entry) => {
    db.get('user').find({id: id}).get(entry).value();
};