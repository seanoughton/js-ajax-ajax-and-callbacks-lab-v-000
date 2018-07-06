$(document).ready(function (){
});

var url =  "https://api.github.com/search/repositories?q=topic:"

function searchRepositories() {
  searchTerm = document.getElementById("searchTerms").value;
/** Handlebars stuff
  const src = document.getElementById("repository-template").innerHTML;
  const template = Handlebars.compile(src);
**/
  searchURl = url + searchTerm
  $.get(searchURl).done(function(data) {
    //const repoList = template(data.items);





    //document.getElementById("results").innerHTML = repoList
  }).fail(function displayError(error){
    let response = "<p>I'm sorry, there's been an error. Please try again.</p>";
    document.getElementById("errors").innerHTML = response;
  });
};

  function displayError(error) {
    let response = "<p>I'm sorry, there's been an error. Please try again.</p>";
    document.getElementById("errors").innerHTML = response;
  };

  function showCommits(el) {
    const baseUrl = "https://api.github.com/repos/"
    const name = el.dataset.name
    const commitUrl = baseUrl + name + '/' + name + '/commits'

    const src = document.getElementById("commit-template").innerHTML;
    const template = Handlebars.compile(src);

    $.get(commitUrl).done(function(data) {
      const commitData = template(data);
      document.getElementById("details").innerHTML = commitData;
    });
  };
