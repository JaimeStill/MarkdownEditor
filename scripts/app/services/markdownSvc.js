(function () {
    var markdownSvc = function () {
        var
            makeHtml = function (text) {
                var converter = new showdown.Converter({
                    extensions: ['prettify'],
                    omitExtraWLInCodeBlocks: true,
                    parseImgDimensions: true,
                    simplifiedAutoLink: true,
                    tables: true,
                    strikethrough: true,
                    tasklists: true,
                    smoothLivePreview: true
                });
                var html = converter.makeHtml(text);
                return html;
            };

        return {
            makeHtml: makeHtml
        };
    };

    markdownApp.factory('markdownSvc', markdownSvc);
}());