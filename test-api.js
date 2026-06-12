const https = require("https");
https.get("https://studies.cs.helsinki.fi/restcountries/api/all", res => {
   let data = "";
   res.on("data", d => data+=d);
   res.on("end", () => {
      const parsed = JSON.parse(data);
      console.log(parsed[0].flags);
   });
});
