<template>
    <div class="class-type-wrapper">
        <button
            class="bard-toolbar-button"
            :class="{ 'active': currentKey || showOptions }"
            v-html="button.html"
            v-tooltip="button.text"
            @click="showOptions = !showOptions"
        ></button>
        <div class="class-type-container" v-if="showOptions" v-click-outside="closeClassTypeMenu">
            <div v-for="(type, key) in classTypes" v-bind:key="type">
                <div class="class-type-button" :class="{ 'active' : currentKey && currentKey.includes(key) }">
                    <div :key="type.advanced" v-if="type.advanced" v-on:click="toggleAdvanced(type)" class="mr-1" :class="{'rotate-90' : type.isToggle}">
                        >
                    </div>
                    <span @click="setClassType(key)" class="class-type-label">{{ type.name }}</span>
                </div>
                <div v-if="type.isToggle" class="flex justify-between">
                    <div  v-for="(t, k) in type.advanced" class="class-type-button" v-bind:key="k" @click="setClassType(k)" :class="{ 'active' : currentKey && currentKey.includes(k) }">
                        <span class="class-type-label class-type-smol">{{ t.name }}</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import vClickOutside from 'v-click-outside'

const generateBreakPointClasses = (cls, breakpoints = ['sm', 'md', 'lg', 'xl', '2xl']) => {
    const itms = {};

    breakpoints.forEach(bp => {
        itms[`${bp}:${cls}`] = {
            name: `${bp}`
        }
    });

    return itms;
}

export default {
    directives: {
        clickOutside: vClickOutside.directive
    },
    mixins: [BardToolbarButton],
    computed: {
        classTypes() {
            return {
                'intro': {
                    name: 'Intro Paragraph',
                },
                'btn': {
                    name: 'Button'
                },
                'text-xs': {
                  name: 'Text XS',
                  advanced: generateBreakPointClasses('text-xs'),
                  isToggle: false
                },
                'text-sm': {
                  name: 'Text SM',
                  advanced: generateBreakPointClasses('text-sm'),
                  isToggle: false
                },
                'text-base': {
                  name: 'Text Base',
                  advanced: generateBreakPointClasses('text-base'),
                  isToggle: false
                },
                'text-lg': {
                  name: 'Text LG',
                  advanced: generateBreakPointClasses('text-lg'),
                  isToggle: false
                },
                'text-xl': {
                  name: 'Text XL',
                  advanced: generateBreakPointClasses('text-xl'),
                  isToggle: false
                },
                'text-2xl': {
                  name: 'Text 2XL',
                  advanced: generateBreakPointClasses('text-2xl'),
                  isToggle: false
                },
                'text-3xl': {
                  name: 'Text 3XL',
                  advanced: generateBreakPointClasses('text-3xl'),
                  isToggle: false
                },
                'text-4xl': {
                  name: 'Text 4XL',
                  advanced: generateBreakPointClasses('text-4xl'),
                  isToggle: false
                },
            };
        },
        currentKey() {
            return this.editor.getMarkAttrs('customStylesClassType').key;
        }
    },
    data() {
        return {
            showOptions: false
        };
    },
    methods: {
        closeClassTypeMenu() {
            // close the menu
            this.showOptions = false;
        },
        setClassType(classTypeKey) {
            // update the editor
            console.log("SELECTED :: ", classTypeKey);
            console.log("CURRENT :: ", this.currentKey);

            let key = [];

            if (typeof this.currentKey !== 'undefined') {
                key = this.currentKey;
            }

            if (key.includes(classTypeKey)) {
                /**
                 * If we already exist in the array remove us
                 */
                const index = key.indexOf(classTypeKey);
                key.splice(index, 1);
            } else {
                /**
                 * Otherwise, add us
                 */
                key.push(classTypeKey);
            }

            if (key.length === 0) {
                /**
                 * If our array is empty, set it to false
                 */
                key = false;
            }

            this.editor.commands.customStylesClassType({
                key: key
            })
            // hide the menu
            this.showOptions = false;
        },
        toggleAdvanced(type) {
            type.isToggle = !type.isToggle;
            /**
             * This feels completely wrong, but I don't have the time right now
             * to make this work in the correct Vue way.
             */
            this.$forceUpdate();
        }
    },
};
</script>
<style lang="postcss">
.class-type-wrapper {
    @apply inline-block relative;
}
.class-type-container {
    @apply absolute bg-white border border-gray-300 rounded-sm z-10 divide-y divide-gray-100 shadow-lg;
}
.class-type-button {
    @apply text-left px-3 py-2 w-full hover:bg-gray-100 flex items-center cursor-pointer;
}
.class-type-button.active {
    @apply bg-gray-200;
}
.class-type-label {
    @apply block text-left whitespace-nowrap;
}
.class-type-mark {
    @apply block w-4 h-4 mr-3 flex-none;
}

.class-type-smol {
    @apply text-xs uppercase;
}
</style>