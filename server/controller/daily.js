import fetch from "node-fetch";
import fs from "file-system";
import request from "request";
import db from "./../config.js";
import dailyVerse from "./../../public/daily_verse.json";
import dailyImage from "./../../public/daily_image.json";

let conn;

function setVerse() {
  fetch("https://beta.ourmanna.com/api/v1?format=json")
    .then(res => res.json())
    .then(json => {
      let verse = {
        reference: json.verse.details.reference,
        text: json.verse.details.text
      };
      conn = db.connect();

      conn.execute(
        "INSERT INTO daily_info (reference,verse) VALUES (?,?)",
        [verse.reference, verse.text],
        function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated Verse");
          }
        }
      );
      // let str = JSON.stringify(verse);
      // let stream = fs.createWriteStream("public/daily_verse.json");
      // stream.once("open", function() {
      //   stream.write(str);
      //   stream.end();
      //   console.log("daily verse updated");
      // });
    });
}

function setImage() {
  let uri =
    "https://api.unsplash.com/photos/random?client_id=a4b7228ae8cd670e64825f084f54b1827017e3834d65f929069c5e597ed453fd&orientation=landscape&query=nature";
  // get json object from unsplash
  request.get({ url: uri, json: true }, function(err, res, data) {
    if (err) {
      console.log(err);
    } else {
      // parse out image url then download it to server
      uri =
        data.urls.full + "?q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max";
      let count = Math.floor(Math.random() * 10000000000 + 1);
      let image = {
        id: count,
        src: uri
      };
      let str = JSON.stringify(image);
      let stream = fs.createWriteStream("public/daily_image.json");
      stream.once("open", function() {
        stream.write(str);
        stream.end();
        count++;
        console.log("daily image updated");
      });
    }
  });
}

function getVerse(req, res) {
  res.send(dailyVerse);
}

function getImage(req, res) {
  res.send(dailyImage);
}

export default { getVerse, getImage, setVerse, setImage };
