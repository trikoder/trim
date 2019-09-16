<script>
import ComponentControls from './componentControls';

export default {

    components: {
        ComponentControls
    },

    computed: {

        defaultControls() {

            return [{
                icon: 'trash',
                action: () => this.removeComponent()
            }];

        }

    },

    methods: {

        removeComponent() {
            this.$emit('deleteComponent', this.clientId);
        },

        updateComponent(data) {
            this.$emit('updateComponent', Object.assign(
                {}, data, {clientId: this.clientId}
            ));
        }

    }
};
</script>

