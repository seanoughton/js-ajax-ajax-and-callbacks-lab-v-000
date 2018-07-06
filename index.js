$(document).ready(function (){
});

var url =  "https://api.github.com/search/repositories?q="
//"https://api.github.com/search/repositories?q=topic:"
//https://api.github.com/search/repositories?q=tetris

function searchRepositories() {
  searchTerm = document.getElementById("searchTerms").value;
/** Handlebars stuff
  const src = document.getElementById("repository-template").innerHTML;
  const template = Handlebars.compile(src);
**/
  searchURl = url + searchTerm + '/'
  ///https://api.github.com/search/repositories?q=tetris/
  console.log(searchURl)
  $.get(searchURl).done(function(data) {
    //const repoList = template(data.items);
    const repos = data.items
    console.log(repos);
    //iterate through the array and create html for the elements you want to show
    const repoList = '<ul>' + repos.map(r => {
     return (`
            <li>
              <h2><a href="${r.html_url}">${r.name}</a></h2>
              <p>Description: ${r.description}</p>
              <p>Owner: ${r.owner.login}</p>
              <img src="${r.owner.avatar_url}}" height="32" width="32">
              <h2><a href="${r.html_url}">${r.owner.html_url}</a></h2>
              <a href="#" data-name="${r.name}" onclick="showCommits(this)">Show Commits</a>
            </li>`
            )
    }).join('') + "</ul>"




    document.getElementById("results").innerHTML = repoList
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
    const commitUrl = baseUrl + name + '/commits'
    //const commitUrl = baseUrl + name + '/' + name + '/commits'
    ///https://api.github.com/repos/owner/repo/commits/
    //console.log(commitUrl)

//handlebars stuff
    //const src = document.getElementById("commit-template").innerHTML;
    //const template = Handlebars.compile(src);



    $.get(commitUrl).done(function(data) {
      //const commitData = template(data);
      const commits = data
      const commitData = '<ul>' + commits.map(r => {
       return (`
              <li>
                <p>${r.sha}</p>
                <p>${r.author.login}</p>
                <img src="${r.author.avatar_url}" height="32" width="32">
              </li>`
              )
      }).join('') + "</ul>"

      document.getElementById("details").innerHTML = commitData;
    });
  };
