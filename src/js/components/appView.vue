<template>
    <div id="app">
        <router-view/>
        <Component
            v-for="modal in modals" :key="modal.id"
            :is="modal.component()"
            v-bind="modal.props()"
            @closeModal="closeModal(modal.id)"
        />
    </div>
</template>

<script>
import {setModalContainer, guid} from '../library/addModal.js';

export default {
    name: 'App',

    data() {
        return {
            modals: []
        };
    },

    created() {
        setModalContainer(this);
    },

    methods: {
        addModal(providers) {
            const id = guid();
            const modal = {
                id,
                ...providers
            };
            this.modals.push(modal);
            return {
                close: () => this.closeModal(id)
            };
        },
        closeModal(id) {
            this.modals = this.modals.filter(item => item.id !== id);
        }
    }
};

</script>
