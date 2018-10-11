export default {

    computed: {

        breakpoint() {

            return this.$store.state.breakpoint;

        },

        screenIsSmall() {

            return this.breakpoint === 'small';

        },
        screenIsLarge() {

            return this.breakpoint === 'large';

        }

    }

};
