const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7db644329fmsh52b412170f59829p169394jsn670535384297",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

fetch("https://weatherapi-com.p.rapidapi.com/search.json?q=-33.42%2C-63.30", options).then((response) => console.log(response));
