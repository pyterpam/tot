var json2csv = require('json2csv');
var fs = require('fs');

function leyendoFichero(fichero){ 
  let lector=(resolve, reject) =>{
    fs.readFile(fichero, (err, data) => {
      return err ? reject(err) : resolve(data);
    })
  };
  return new Promise(lector)
};

leyendoFichero('fileTwitter_turismo.json')
  .then(data =>{
     var obj = JSON.parse(data);
     var fields = [
       'created_at',
       'text',
       'location', 
       'time_zone',
       'lang', 
       'geo',
       'place',
       'followers_count',
       'friends_count',
       'listed_count',
       'favourites_count',
       'statuses_count',
       'retweet_count',
       'reply_count',
       'retweeted'
      ];
     var result = json2csv({ data: obj, fields: fields });
     fs.writeFile('dataset_twitter.csv', result, function(err) {
       if (err) throw err;
       console.log('dataset_twitter creado');
     });
  })
  .catch(error => console.log('Error: ', error));
  

