(function () {
    var markdownEditor = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/content/templates/markdown-editor.html',
            scope: {
                mdModel: '='
            },
            compile: function (element) {
                return {
                    pre: function (scope) {
                        var editor = element.find('textarea')[0];

                        scope.setH1 = function () {
                            createMarkdown("# ");
                        }

                        scope.setH2 = function () {
                            createMarkdown("## ");
                        }

                        scope.setH3 = function () {
                            createMarkdown("### ");
                        }

                        scope.setH4 = function () {
                            createMarkdown("#### ");
                        }

                        scope.setH5 = function () {
                            createMarkdown("##### ");
                        }

                        scope.setH6 = function () {
                            createMarkdown("###### ");
                        }

                        scope.setBold = function () {
                            createWrappingMarkdown("**");
                        }

                        scope.setItalic = function () {
                            createWrappingMarkdown("*");
                        }

                        scope.setBq = function () {
                            var start = validateStart(),
                                end = validateEnd(),
                                symbol = "> ",
                                message = "Each line in the quote must be prefixed with a > ",
                                value;

                            if (start < end) {
                                var splitLines = editor.value.substring(start, end).split("\n");

                                if (start > 0) {
                                    if (splitLines.length > 1) {
                                        value = editor.value.substring(0, start);

                                        for (var i = 0; i < splitLines.length; i++) {
                                            if (i < splitLines.length - 1) {
                                                value += symbol + splitLines[i] + "\n";
                                            } else {
                                                value += symbol + splitLines[i];
                                            }
                                        }

                                        value += editor.value.substring(end, editor.value.length);
                                    } else {
                                        value = editor.value.substring(0, start) + symbol + editor.value.substring(start, end) + editor.value.substring(end, editor.value.length);
                                    }
                                } else {
                                    if (splitLines.length > 1) {
                                        value = '';

                                        for (var i = 0; i < splitLines.length; i++) {
                                            if (i < (splitLines.length - 1)) {
                                                value += symbol + splitLines[i] + "\n";
                                            } else {
                                                value += symbol + splitLines[i];
                                            }
                                        }

                                        value += editor.value.substring(end, editor.value.length);
                                    } else {
                                        value = symbol + editor.value.substring(start, end) + editor.value.substring(end, editor.value.length);
                                    }
                                }

                                updateEditorValue(value, end + symbol.length, end + symbol.length);
                            } else if (start || start === 0) {
                                value = editor.value.substring(0, start) + symbol + message + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, start + symbol.length, start + symbol.length + message.length);
                            }
                        }

                        scope.setHr = function () {
                            var start = validateStart();
                            var value = editor.value.substring(0, start) + "***" + editor.value.substring(start, editor.value.length);
                            updateEditorValue(value, start + 3, start + 3);
                        }

                        scope.setLink = function () {
                            var start = validateStart(),
                                message = 'Display Text';

                            if (start || start === 0) {
                                var value = editor.value.substring(0, start) + "[" + message + "](hyperlink)" + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, start + 1, start + message.length + 1);
                            }
                        }

                        scope.setImage = function () {
                            var start = validateStart(),
                                message = 'Display Text';

                            if (start || start === 0) {
                                var value = editor.value.substring(0, start) + "![" + message + "](hyperlink)" + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, start + 2, start + message.length + 2);
                            }
                        }

                        scope.setCode = function () {
                            var start = validateStart(),
                                end = validateEnd(),
                                value;

                            if (start < end) {
                                value = editor.value.substring(0, start) + '```\n' + editor.value.substring(start, end) + '\n```' +
                                    editor.value.substring(end, editor.value.length);
                                updateEditorValue(value, end + 4, end + 4);
                            }
                        }

                        scope.setUl = function () {
                            createMarkdown("* ");
                        }

                        scope.setOl = function () {
                            createMarkdown("1. ");
                        }

                        scope.setTl = function () {
                            var start = validateStart(),
                                messageOne = "- [x] Completed Task",
                                messageTwo = "- [] Incomplete Task";

                            if (start || start === 0) {
                                var value = editor.value.substring(0, start) + messageOne + "\n" + messageTwo + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, start + messageOne.length + messageTwo.length + 1, start + messageOne.length + messageTwo.length + 1);
                            }
                        }

                        function createMarkdown(symbol) {
                            var start = validateStart(),
                                end = validateEnd(),
                                value;
                            if (start < end) {
                                value = editor.value.substring(0, start) + symbol + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, end + symbol.length, end + symbol.length);
                            } else if (start || start === 0) {
                                value = editor.value.substring(0, start) + symbol + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, start + symbol.length, start + symbol.length);
                            }
                        }

                        function createWrappingMarkdown(symbol) {
                            var start = validateStart(),
                                end = validateEnd(),
                                value;

                            if (start < end) {
                                value = editor.value.substring(0, start) + symbol + editor.value.substring(start, end) + symbol + editor.value.substring(end, editor.value.length);
                                updateEditorValue(value, end + symbol.length, end + symbol.length);
                            } else if (start || start === 0) {
                                var message = "replace text";
                                value = editor.value.substring(0, start) + symbol + message + symbol + editor.value.substring(start, editor.value.length);
                                updateEditorValue(value, start + symbol.length, start + symbol.length + message.length);
                            }
                        }

                        function validateStart() {
                            if (editor.value.length < editor.selectionStart) {
                                return editor.value.length;
                            } else {
                                return editor.selectionStart;
                            }
                        }

                        function validateEnd() {
                            if (editor.value.length < editor.selectionEnd) {
                                return editor.value.length;
                            } else {
                                return editor.selectionEnd;
                            }
                        }

                        function updateEditorValue(value, start, end) {
                            scope.$evalAsync(function () {
                                editor.value = value;
                                setCursorSelect(start, end);
                            });
                        }

                        function setCursorSelect(start, end) {
                            editor.focus();
                            if (editor.setSelectionRange) {
                                editor.setSelectionRange(start, end);
                            } else {
                                editor.selectionStart = start;
                                editor.selectionEnd = end;
                            }
                        }

                        scope.checkShortcut = function (event) {
                            // Tab - Indent 4 spaces
                            if (event.keyCode === 9) {
                                event.preventDefault();
                                var start = editor.selectionStart;
                                var value = editor.value.substring(0, start) + "    " + editor.value.substring(start, editor.value.length);

                                scope.$evalAsync(function () {
                                    editor.value = value;
                                    setCursorSelect(start + 4, start + 4);
                                });
                            }

                            // Ctrl + K - Code
                            if (event.ctrlKey && event.keyCode === 75) {
                                if (editor.selectionStart < editor.selectionEnd) {
                                    event.preventDefault();
                                    scope.setCode();
                                }
                            }

                            // Ctrl + B - Bold
                            if (event.ctrlKey && event.keyCode === 66) {
                                event.preventDefault();
                                scope.setBold();
                            }

                            // Ctrl + I - Italics
                            if (event.ctrlKey && event.keyCode === 73) {
                                event.preventDefault();
                                scope.setItalic();
                            }

                            // Ctrl + 1 - h1
                            if (event.ctrlKey && event.keyCode === 49) {
                                event.preventDefault();
                                scope.setH1();
                            }

                            // Ctrl + 2 - h2
                            if (event.ctrlKey && event.keyCode === 50) {
                                event.preventDefault();
                                scope.setH2();
                            }

                            // Ctrl + 3 - h3
                            if (event.ctrlKey && event.keyCode === 51) {
                                event.preventDefault();
                                scope.setH3();
                            }

                            // Ctrl + 4 - h4
                            if (event.ctrlKey && event.keyCode === 52) {
                                event.preventDefault();
                                scope.setH4();
                            }

                            // Ctrl + 5 - h5
                            if (event.ctrlKey && event.keyCode === 53) {
                                event.preventDefault();
                                scope.setH5();
                            }

                            // Ctrl + 6 - h6
                            if (event.ctrlKey && event.keyCode === 54) {
                                event.preventDefault();
                                scope.setH6();
                            }

                            // Ctrl + Q - Blockquotes
                            if (event.ctrlKey && event.keyCode === 81) {
                                event.preventDefault();
                                scope.setBq();
                            }

                            // Ctrl + L - Link
                            if (event.ctrlKey && event.keyCode === 76) {
                                event.preventDefault();
                                scope.setLink();
                            }

                            // Ctrl + P - Image
                            if (event.ctrlKey && event.keyCode === 80) {
                                event.preventDefault();
                                scope.setImage();
                            }

                            // Ctrl + U - Unordered List
                            if (event.ctrlKey && event.keyCode === 85) {
                                event.preventDefault();
                                scope.setUl();
                            }

                            // Ctrl + O - Ordered List
                            if (event.ctrlKey && event.keyCode === 79) {
                                event.preventDefault();
                                scope.setOl();
                            }

                            // Ctrl + T - Task List
                            if (event.ctrlKey && event.keyCode === 84) {
                                event.preventDefault();
                                scope.setTl();
                            }

                            // Ctrl + H - Horizontal Rule
                            if (event.ctrlKey && event.keyCode === 72) {
                                event.preventDefault();
                                scope.setHr();
                            }
                        }
                    },
                    post: function (scope) {
                        var editor = element.find('textarea')[0];

                        scope.$watch(function () { return editor.value },
                            function () {
                                if (scope.mdModel.markdown !== editor.value) {
                                    scope.mdModel.markdown = editor.value;
                                }
                            });
                    }
                }
            }
        };
    };

    markdownApp.directive('markdownEditor', markdownEditor);
}());