#!/usr/bin/env node

var json = require('read-data').json;
var replace = require("replace"),
    userHome = require('user-home');

var args = process.argv.slice(2);

var replacePath = args[0];
var recursive = args[1];
var passPath = args[2];

var path = (passPath) ? passPath : userHome;

try {
    var data = json.sync(path + '/pass.json');
} catch (err) {
    console.info("Please, create your pass.json file before execute this command. Error message: ");
    return console.error(err);
}

console.info("Your pass.json file will be readed from: " + path + '/pass.json');

if (replacePath) {
    for (var group in data) {
        for (var pass in data[group]) {
            var toReplace = group + '.' + pass;
            console.info("Replacing: " + toReplace + " by: " + data[group][pass]);
            replace({
                regex: "<" + toReplace + ">",
                replacement: data[group][pass],
                paths: [replacePath],
                recursive: (recursive) ? recursive : false
            })
        }
    }
} else {
    return console.error("Please, write directory path or file path to replace: node replace 'your/folder/to/replace'");
}

