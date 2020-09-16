const express = require("express");
const app = express();
const snekfetch = require('snekfetch');


app.get("/", (req, res) => {
  res.redirect('https://github.com/whasonyt/cardhub')
});

app.get("/info", async(req, res) => {
  try {
  var user = req.query.user
 let desc = req.query.bio
    const { body } = await snekfetch
    .get(`https://api.github.com/users/` + user)
    .catch(err => console.log(err));
  let size
  let choose
  if(desc === "yes") {
    size = "100"
    choose = body.bio
  } else {
size = "80"
choose = ""
}
  
  res.send(`
<svg
        width="350"
        height=${size}
        viewBox="0 0 350 ${size}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #fff;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #9f9f9f }
  
          .bio {
            font: 200 11px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #fff;
          }
          
        </style>
<rect data-testid="card-bg" x="0.5" y="0.5" rx="6" height="89%" stroke="#00a4d1" width="349" fill="#23272A" stroke-opacity="1" stroke-width="2"/>

        
      <g data-testid="card-title" transform="translate(25, 35)">
      
        <g transform="translate(0, 0)">
        
<text text-anchor="middle" x="40%" y="0" class="header" data-testid="header">

      ${body.login}
      
      </text>
    </g></g>
    

        <g data-testid="main-card-body" transform="translate(0, 50)">
          
    <svg data-testid="lang-items" x="25">
      
      
    <g transform="translate(10, 0)">
<image cx="5" cy="6" width="15" height="15" xlink:href="https://i.imgur.com/euQ6EhF.png" />

      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${body.public_repos} Repositories
      </text>
      
    </g>
  
  
  
    <g transform="translate(120, 0)">
<image cx="10" cy="10" width="15" height="13" xlink:href="https://i.imgur.com/BaSx5q2.png" />
<text data-testid="lang-name" x="15" y="10" class='lang-name'>

        ${body.followers} Followers

      </text></g>
    
    
        <g transform="translate(220, 0)">
<image cx="5" cy="6" width="15" height="15" xlink:href="https://i.imgur.com/euQ6EhF.png" />
<text data-testid="lang-name" x="15" y="10" class='lang-name'>

       ${body.public_gists} Gists

      </text></g><g transform="translate(0, 30)"><text  text-anchor="middle" data-testid="lang-name" x="40%" class='bio'>

        ${choose}
      
</text></g></svg></g></svg>`)
  } catch(err) {
res.send('<strong>ERROR!</strong><br>' + err + '<br><strong>Make sure the username was correct. If there\'s still issues, join the Discord: <a href="https://willm.xyz/discord">willm.xyz/discord</a>')
}
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
