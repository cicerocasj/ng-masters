$(document).ready(function(){
    window.username = $("#user");
    window.reponame = $("#reponame");
    window.issuestable = $("#issuestable");
});

function line_table(number, title){
    return "<tr><td>"+number+"</td><td>"+title+"</td><tr>";
}

function vaibuscarasissues(){
    function GithubRepo(username, reponame){
        var issues;
        var methods = {
            'busca_issues': function(){
                $.ajax({
                    url: "https://api.github.com/repos/"+username+"/"+reponame+"/issues"
                }).success(function(data){
                    issues = data;
                    methods.popula_tabela();
                });
            },
            'popula_tabela': function(){
                issuestable.empty();
                for(var line in issues){
                    issuestable.append(line_table(issues[line].number, issues[line].title));
                }
            }
        };
        return methods;
    }
    var le_repo = GithubRepo(username.val(), reponame.val());
    le_repo.busca_issues();
}