export default class CustomStylesClassType {
    name() {
        return "customStylesClassType";
    }

    schema() {
        return {
            attrs: {
                key: "",
            },
            parseDOM: [
                {
                    tag: "span.custom-styles",
                    getAttrs: (dom) => {
                        console.log(dom);
                        return {
                            key: dom.getAttribute("data-class"),
                        };
                    },
                },
            ],
            toDOM: (mark) => {
                let markAttrs = "";

                if (typeof mark.attrs.key === "object") {
                    markAttrs = mark.attrs.key.join(" ");
                } else {
                    markAttrs = mark.attrs.key;
                }

                return [
                    "span",
                    {
                        class: "custom-styles " + markAttrs,
                        "data-class": markAttrs,
                    },
                    0,
                ];
            },
        };
    }

    commands({ type, updateMark, removeMark }) {
        return (attrs) => {
            if (attrs.key) {
                return updateMark(type, attrs);
            }

            return removeMark(type);
        };
    }

    pasteRules({ type }) {
        return [];
    }

    plugins() {
        return [];
    }
}
