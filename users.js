'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/users', (req, res, next) => {
    options.repository.getUsers().then((users) => {
      res.status(200).send(users.map((user) => { return {
        Track: user.Track,
        ServiceUPS: user.ServiceUPS,
        Poids: user.Poids,
        Adresse: user.Adresse,
        DateLivré: user.DateLivré,
        TempsLivré: user.TempsLivré,
        Signé: user.Signé
        };
      }));
    })
    .catch(next);
  });

  app.get('/search', (req, res) => {

    //  Get the Track.
    var Track = req.query.Track;
    if (!Track) {
      throw new Error("When searching for a user, the Track must be specified, e.g: '/search?Track=111111111'.");
    }

    //  Get the user from the repo.
    options.repository.getUserByEmail(Track).then((user) => {

      if(!user) { 
        res.status(404).send('User not found.');
      } else {
        res.status(200).send({
            Track: user.Track,
            ServiceUPS: user.ServiceUPS,
            Poids: user.Poids,
            Adresse: user.Adresse,
            DateLivré: user.DateLivré,
            TempsLivré: user.TempsLivré,
            Signé: user.Signé
        });
      }
    })
    .catch(next);

  });
};