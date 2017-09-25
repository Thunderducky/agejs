const express = require("Express");

const app = express();
app.use('/public/', express.static("server/public"));
app.get('/', function(req, res){
  res.redirect("/public/html/index.html");
})
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
