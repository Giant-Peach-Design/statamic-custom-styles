import CustomStylesClassType from "./custom-styles-class-types";
import CustomStylesClassTypeMenu from "./custom-styles-class-types-menu.vue";

Statamic.$bard.extend(({ mark }) => mark(new CustomStylesClassType()));
Statamic.$bard.buttons(() => {
    return {
        name: "customstylesclass",
        text: "Custom Styles",
        command: "classType",
        args: {
            key: [],
        },
        icon: "paragraph",
        component: CustomStylesClassTypeMenu,
    };
});
