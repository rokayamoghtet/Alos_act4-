import { v4 as uuidv4 } from "uuid";

let DelaiLivraison = [
  {
    Track:888888888 ,
    Service_UPS:"UPS Standard",
    Poids:"3,96 Kg",
    Adresse:"13000 Marseille France",  
    DateLivré:"26-04-2022",
    TempsLivré:"10:14:50",   
    Signé:"MAGUIRE J"
},
{
    Track:111111111 ,
    Service_UPS:"UPS Ground",
    Poids:"2,00 Kg",
    Adresse:"100 rue des fleur Paris France ",  
    DateLivré:"30-04-2022",
    TempsLivré:"14:30:02",   
    Signé:"AMBROSE"
},
{
    Track:555555555 ,
    Service_UPS:"UPS Standard",
    Poids:"19,00 Kg",
    Adresse:"Dharma Paris France",  
    DateLivré:"01-05-2022",
    TempsLivré:"09:40:20",   
    Signé:"Rivers"
},
{
  Track:222222222 ,
  Service_UPS:"UPS Standard",
  Poids:"7,9 Kg",
  Adresse:"12000 Marseille France",  
  DateLivré:"15-06-2022",
  TempsLivré:"13:50:00",   
  Signé:"Donald",
}
];

export const getDelaisLivraison = (request, response) => {
  response.json(DelaiLivraison);
};

export const getDelaiLivraison = (request, response) => {
  const Track = request.params.Track;
  const DelaiLivraison = DelaiLivraison.find((DelaiLivraison) => DelaiLivraison.Track === Track);
  if (DelaiLivraison) {
    response.json(DelaiLivraison);
  } else {
    response.send("DelaiLivraison not found");
  }
};

export const deleteDelaiLivraison = (request, response) => {
  const Track = request.params.Track;
  DelaiLivraison = DelaiLivraison.filter((DelaiLivraison) => DelaiLivraison.Track !== Track);
  response.json(DelaiLivraison);
};

export const addDelaiLivraison = (request, response) => {
  const DelaiLivraison = request.body;
  const DelaiLivraisonWithTrack = { ...DelaiLivraison, Track: uuidv4() };
  DelaiLivraison.push(DelaiLivraisonWithTrack);
  response.send(`DelaiLivraison with Track ${DelaiLivraisonWithTrack.Track} has been added`);
};

export const updateDelaiLivraison = (request, response) => {
  const Track = request.params.Track;
  const { name, grade } = request.body;
  let DelaiLivraison = DelaiLivraison.find((DelaiLivraison) => DelaiLivraison.Track === Track);
  if (name) {
    DelaiLivraison.name = name;
  }
  if (grade) {
    DelaiLivraison.grade = grade;
  }
  response.send(`DelaiLivraison with Track ${Track} has been updated`);
};
