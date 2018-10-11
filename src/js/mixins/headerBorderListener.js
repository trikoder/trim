export default {

    data: () => ({headerHasBorder: false}),

    created() {

        this.setupHeaderBorderListener();

    },

    methods: {

        setupHeaderBorderListener() {

            ['afterIndexSetup', 'afterEditSetup', 'afterCreateSetup'].forEach(event => {
                this.$on(event, () => {
                    this.$nextTick(() => this.addHeaderScrollListener());
                });
            });

        },

        addHeaderScrollListener() {

            const layoutNotList = this.currentContext !== 'index';
            const fixedBorder = layoutNotList && !this.$el.querySelector('.tabNavType1');

            this.removeHeaderScrollListener();

            if (fixedBorder) {
                this.headerHasBorder = true;
            } else {

                this.scrollElement = this.isExternal ? this.$el.lastElementChild : window;

                this.headerScrollListener = () => {

                    this.headerHasBorder = this.scrollElement === window
                        ? window.pageYOffset > 0
                        : this.scrollElement.scrollTop > 0
                    ;

                };

                this.scrollElement.addEventListener('scroll', this.headerScrollListener);
                this.headerScrollListener();

            }

        },

        removeHeaderScrollListener() {

            if (this.scrollElement && this.headerScrollListener) {
                this.scrollElement.removeEventListener('scroll', this.headerScrollListener);
                delete this.scrollElement;
            }

        }

    }

};
