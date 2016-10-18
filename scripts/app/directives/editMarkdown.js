(function () {
    var editMarkdown = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/content/templates/edit-markdown.html'
        };
    };

    markdownApp.directive('editMarkdown', editMarkdown);
}());