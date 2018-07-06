$(document).ready(function (){
});

var url =  "https://api.github.com/search/repositories?q=topic:"
//https://api.github.com/search/repositories?q=topic:ruby


//Include repository name, description, and a link to the HTML URL. Also include repository owner login, repository owner avatar as an image, and a link to the owner's profile page. Hint: Pay close attention to the structure of the search results!
function searchRepositories() {
  //NEED TO GET SEARCH TERM INTO THE URL
  //console.log(url)
  searchTerm = document.getElementById("searchTerms").value;
  const src = document.getElementById("repository-template").innerHTML;
  const template = Handlebars.compile(src);
  searchURl = url + searchTerm
  //console.log(searchURl)
  $.get(searchURl).done(function(data) {
    //document.getElementById("results").innerHTML = data
    //console.log(data.items);
    const repoList = template(data.items);
    document.getElementById("results").innerHTML = repoList
  }).fail(function displayError(error){
    //what happens when an error occurs
    let response = "<p>I'm sorry, there's been an error. Please try again.</p>";
    document.getElementById("errors").innerHTML = response;
  });
};

//that gets the repository's commits from the GitHub API and display them in the details div. For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.
  function showCommits(el) {
    const baseUrl = "https://api.github.com/repos/"
    //get the repo's commits from GitHub API
      //need the repo url for the api to get the commits
      //ex: https://api.github.com/repos/rails/rails/commits
    const name = el.dataset.name
    const commitUrl = baseUrl + name + '/' + name + '/commits'
    //console.log(commitUrl + name + '/' + name + '/commits');

    const src = document.getElementById("commit-template").innerHTML;
    const template = Handlebars.compile(src);
    //dispay the commits in the details div
    //for each commit, list : SHA, author, author login, author avatar image
    $.get(commitUrl).done(function(data) {
      //document.getElementById("results").innerHTML = data
      //console.log(data);
      const commitData = template(data);
      document.getElementById("details").innerHTML = commitData;
    });
  };
