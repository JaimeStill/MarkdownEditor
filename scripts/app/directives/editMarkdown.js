(function () {
    var editMarkdown = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/MarkdownEditor/content/templates/edit-markdown.html'
        };
    };

    markdownApp.directive('editMarkdown', editMarkdown);
}());