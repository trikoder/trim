<script>
import ComponentControls from './componentControls.vue';
import {confirm} from '../../components/dialogModal.vue';

export default {

    components: {
        ComponentControls
    },

    props: {
        type: {
            type: String,
            required: true
        },
        clientId: {
            type: String,
            required: true
        },
        context: {
            type: Object
        }
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

