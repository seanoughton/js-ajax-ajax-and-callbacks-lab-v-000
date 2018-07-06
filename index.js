$(document).ready(function (){
});

var url = "https://api.github.com/repositories"

//Include repository name, description, and a link to the HTML URL. Also include repository owner login, repository owner avatar as an image, and a link to the owner's profile page. Hint: Pay close attention to the structure of the search results!
function searchRepositories() {
  searchTerm = document.getElementById("searchTerms").value;
  const src = document.getElementById("repository-template").innerHTML;
  const template = Handlebars.compile(src);
  $.get(url).done(function(data) {
    //document.getElementById("results").innerHTML = data
    console.log(data);
    const repoList = template(data);
    document.getElementById("results").innerHTML = repoList
  });

};
