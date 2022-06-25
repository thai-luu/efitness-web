<template>
    <div class="tab-links border-b shadow flex justify-center z-10 h-12">
        <slot />

        <div class="tab-links__active-bar" :style="activeBarStyle" />
    </div>
</template>

<script>
    import _flow from 'lodash/flow';
    import _find from 'lodash/fp/find';
    import _filter from 'lodash/fp/filter';

    export default {
        props: {
            current: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                activeBarStyle: {},
            };
        },

        watch: {
            current() {
                this.updateActivebar();
            },
        },

        mounted() {
            this.updateActivebar();
        },

        methods: {
            updateActivebar() {
                const activeLink = _flow(
                    _filter(child => child.$options.componentName === 'TabLinkItem'),
                    _find(child => (child.$props.name || child.$props.route) === this.current),
                )(this.$children);

                if (!activeLink) {
                    return;
                }

                const rect = this.$el.getBoundingClientRect();
                const linkRect = activeLink.$el.getBoundingClientRect();

                this.activeBarStyle = {
                    left: `${linkRect.left - rect.left}px`,
                    width: `${linkRect.width}px`,
                };
            },
        },
    };
</script>

<style >

    .tab-links {
        position: relative;
    }
    .tab-links__item {
            display: inline-block;
            padding: 10px 25px;
        }
    .tab-links__active-bar {
        height: 2px;
        /* background: $primary; */
        position: absolute;
        bottom: 0;
        transition: width .2s ease-in-out, left .2s ease-in-out;
    }
</style>
