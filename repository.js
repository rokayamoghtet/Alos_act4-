
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connection) {
    this.connection = connection;
  }

  getUsers() {
    return new Promise((resolve, reject) => {

      this.connection.query('SELECT Track, ServiceUPS, Poids, Adresse, DateLivré, TempsLivré, Signé FROM directory', (err, results) => {
        if(err) {
          return reject(new Error("An error occured getting the users: " + err));
        }

        resolve((results || []).map((user) => {
          return {
            Track: user.Track,
            ServiceUPS: user.ServiceUPS,
            Poids: user.Poids,
            Adresse: user.Adresse,
            DateLivré: user.DateLivré,
            TempsLivré: user.TempsLivré,
            Signé: user.Signé
          };
        }));
      });

    });
  }

  getUserByEmail(Track) {

    return new Promise((resolve, reject) => {

      //  Fetch the customer.
      this.connection.query('SELECT Track, ServiceUPS, Poids, Adresse, DateLivré, TempsLivré, Signé FROM directory WHERE Track = ?', [Track], (err, results) => {

        if(err) {
          return reject(new Error("An error occured getting the user: " + err));
        }

        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            Track: results[0].Track,
            ServiceUPS: results[0].ServiceUPS,
            Poids: results[0].Poids,
            Adresse: results[0].Adresse,
            DateLivré: results[0].DateLivré,
            TempsLivré: results[0].TempsLivré,
            Signé: results[0].Signé
          });
        }

      });

    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(mysql.createConnection(connectionSettings)));
  });
};