(function () {
    var editMarkdown = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/edit-markdown.html'
        };
    };

    markdownApp.directive('editMarkdown', editMarkdown);
}());