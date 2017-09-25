const express = require("express");

const app = express();
var port = process.env.PORT || 3000;
app.use('/public/', express.static("server/public"));
app.get('/', function(req, res){
  res.redirect("/public/html/index.html");
})
app.listen(port, function(){
  console.log("Listening on port " + port);
});
