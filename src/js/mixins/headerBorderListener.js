export default {

    data: () => ({headerHasBorder: false}),

    created() {

        this.setupHeaderBorderListener();

    },

    beforeDestroy() {

        this.removeHeaderScrollListener();

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

            this.removeHeaderScrollListener();

            const useFixedBorder = this.currentContext === 'index'
                ? (this.$refs.listHandler ? !this.$refs.listHandler.showFilters : true)
                : (this.$refs.editHandler ? this.$refs.editHandler.tabItems.length === 0 : true)
            ;

            if (useFixedBorder) {
                this.headerHasBorder = true;
                return;
            }

            this.headerScrollElement = this.isExternal
                ? this.$refs[this.currentContext === 'index' ? 'listHandler' : 'editHandler'].$el
                : window
            ;

            this.headerScrollListener = () => {

                this.headerHasBorder = this.headerScrollElement === window
                    ? window.pageYOffset > 0
                    : this.headerScrollElement.scrollTop > 0
                ;

            };

            this.headerScrollElement.addEventListener('scroll', this.headerScrollListener);
            this.headerScrollListener();

        },

        removeHeaderScrollListener() {

            if (this.headerScrollElement && this.headerScrollListener) {
                this.headerScrollElement.removeEventListener('scroll', this.headerScrollListener);
                delete this.headerScrollElement;
                delete this.headerScrollListener;
            }

        }

    }

};
