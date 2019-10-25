<script>
import ComponentControls from './componentControls';
import {confirm} from 'trim/components/dialogModal';

export default {

    components: {
        ComponentControls
    },

    props: {
        clientId: String
    },

    computed: {

        defaultControls() {

            return [{
                icon: 'move',
                isSortHandle: true
            }, {
                icon: 'trash',
                action: () => this.confirmRemove(
                    () => this.removeComponent()
                )
            }];

        }

    },

    methods: {

        confirmRemove(callback, message) {
            confirm({
                message: message,
                onAccept: callback,
                parent: this
            });
        },

        removeComponent() {
            this.$emit('deleteComponent', this.clientId);
        },

        updateComponent(data) {
            this.$emit('updateComponent', Object.assign(
                {clientId: this.clientId}, data
            ));
        }

    }
};
</script>

