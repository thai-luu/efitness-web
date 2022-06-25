<template>
    <nuxt-link :to="route" class="tab-links__item link">
        <slot> {{ label }}</slot>
    </nuxt-link>
</template>

<script>
    export default {
        componentName: 'TabLinkItem',

        props: {
            name: {
                type: String,
            },

            route: {
                type: [String, Object],
                required: true,
            },

            label: {
                type: String,
                default: '',
            },
        },
    };
</script>
