<template>
   <div class="tableComponent">
        <textarea-form-element
            :value="title" :attributes="{input: {
                class: 'inputType2 fontBold',
                style: {fontSize: '20px', border: 0},
                placeholder: 'Table title'
            }}"
            @input="updateComponent({title: $event})"
        ></textarea-form-element>
        <component-controls
            :controls="defaultControls"
        ></component-controls>
        <div class="tableWrapper">
            <table>
                <thead>
                    <tr>
                        <th v-for="(headingText, cellIndex) in rows[0]" :key="cellIndex"
                        >
                            <div class="headCellWrapper">
                                <textarea-form-element
                                    :value="headingText" :attributes="getInputAttributes('heading')"
                                    @input="updateCell(0, cellIndex, $event)"
                                ></textarea-form-element>
                                <div class="dropdown" :class="{
                                    active: activeDropdown === 'column' + cellIndex
                                }">
                                    <button
                                        type="button" @click="toggleDropdown('column' + cellIndex)"
                                        class="dropdownToggle nBtn icr iconMoreHorizontal"
                                        tabindex="-1"
                                    >More</button>
                                    <ul
                                        class="dropdownList"
                                        v-if="activeDropdown === 'column' + cellIndex"
                                        v-on-dismiss="closeDropdown"
                                    >
                                        <li @click="removeColumn(cellIndex)">Remove column</li>
                                    </ul>
                                </div>
                            </div>
                        </th>
                        <th class="dropdownCell"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(row, rowIndex) in rows">
                        <tr v-if="rowIndex !== 0" :key="rowIndex">
                            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                                <textarea-form-element
                                    :value="cell" :attributes="getInputAttributes('cell')"
                                    @input="updateCell(rowIndex, cellIndex, $event)"
                                ></textarea-form-element>
                            </td>
                            <td class="dropdownCell">
                                <div class="dropdown" :class="{
                                    active: activeDropdown === 'row' + rowIndex
                                }">
                                    <button
                                        type="button" @click="toggleDropdown('row' + rowIndex)"
                                        class="dropdownToggle nBtn icr iconMoreHorizontal"
                                        tabindex="-1"
                                    >More</button>
                                    <ul
                                        class="dropdownList"
                                        v-if="activeDropdown === 'row' + rowIndex"
                                        v-on-dismiss="closeDropdown"
                                    >
                                        <li @click="removeRow(rowIndex)">Remove row</li>
                                        <li @click="addRow(rowIndex)">Insert row above</li>
                                        <li @click="addRow(rowIndex + 1)">Insert row bellow</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="bottomControls">
            <button type="button" class="nBtn" @click="addRow(rows.length)">
                Add new row
            </button>
            <button type="button" class="nBtn" @click="addColumn">
                Add new column
            </button>
        </div>
   </div>
</template>

<script>
import TextareaFormElement from 'trim/formElements/textarea.vue';
import baseComponent from 'trim/formElements/htmlComponents/baseComponent.vue';
import vueDismiss from 'vue-dismiss';

export default {

    mixins: [baseComponent, vueDismiss],

    components: {
        TextareaFormElement
    },

    componentType: 'table',

    insertCaption: 'Table',

    props: {
        title: String,
        rows: Array
    },

    data: () => ({
        activeDropdown: null
    }),

    methods: {

        getRowsCopy() {

            return this.rows.map(row => row.slice(0));

        },

        addRow(rowIndex) {

            const rows = this.getRowsCopy();
            const newRow = rows[0].slice(0).map(item => '');

            rows.splice(rowIndex, 0, newRow);
            this.updateComponent({rows});
            this.closeDropdown();

        },

        removeRow(rowIndex) {

            const rows = this.getRowsCopy();
            rows.splice(rowIndex, 1);
            this.updateComponent({rows});
            this.closeDropdown();

        },

        addColumn() {

            const rows = this.getRowsCopy();
            rows.forEach(row => row.push(''));

            this.updateComponent({rows});

        },

        removeColumn(colIndex) {

            const rows = this.getRowsCopy();
            rows.forEach(row => {
                row.splice(colIndex, 1);
            });
            this.updateComponent({rows});

        },

        getInputAttributes(type) {
            return {
                input: {
                    class: 'inputType2 ' + (type === 'heading' ? 'fontBold' : ''),
                    style: {fontSize: '13px', border: 0, padding: '0.8em'},
                    placeholder: type === 'heading' ? 'Heading' : undefined
                }
            };
        },

        updateCell(atRowIndex, atCellIndex, content) {

            const rows = this.getRowsCopy();
            rows[atRowIndex][atCellIndex] = content;

            this.updateComponent({rows});

        },

        toggleDropdown(key) {

            if (this.activeDropdown === key) {
                this.activeDropdown = null;
            } else {
                this.activeDropdown = key;
            }

        },

        closeDropdown() {
            this.activeDropdown = null;
        }

    },

    prepareDataModel(done) {

        done({
            title: '',
            rows: [
                ['Column', 'Column'],
                ['', ''],
                ['', '']
            ]
        });

    }

};
</script>

<style lang="scss" scoped>

.tableComponent {
    position: relative;
    border-radius: 5px; box-sizing: border-box;
    margin: 2em 0; padding: 1.3em 4em 0 2em;
    border: 1px solid $colorGrayLight1;
    background: #fff;
}

.tableWrapper {

    @include mediaMaxWidth($breakpointMedium) {
        overflow-x: auto;
        margin-right: -4em; margin-left: -2em;

        > table {
            margin-left: -1px; margin-right: -1px;
            min-width: 70em;
        }
    }
}

table {
    table-layout: fixed;
    width: 100%; margin-top: 1.5em;
    text-align: left;
}

th, td {
    background: #fff;
    border: 1px solid $colorGrayLight2;
}

th {
    background: #f9f9f9;
}

.headCellWrapper {
    position: relative;
    padding-right: 3em;

    .dropdown {
        position: absolute; right: 0; top: em(4,10);
    }

    .dropdownList {
        top: -0.3em;
    }
}

.componentControls {
    border: 0; background: transparent;
}

.bottomControls {
    @include fontSans;
    padding: 1em 0;

    button {
        font-size: 1.2em; padding: em(10,12) 0;
        margin-right: em(20,12);
        color: $colorGrayDark3; transition: color 0.2s;

        &:hover, &:focus {
            color: $colorGrayDark1;
        }
    }

    @include mediaMaxWidth($breakpointMedium) {
        margin-right: -4em;
    }
}

.dropdown {
    position: relative;
}

.dropdownCell {
    width: 3em;
}

.dropdownToggle {
    width: 3em; height: 3em;

    &:before {
        font-size: 1.2em;
    }

    &:hover {
        color: $colorMain1;
    }

    .dropdown.active & {
        z-index: 3;
    }
}

.dropdownList {
    @include fontSans;
    position: absolute; right: 0.2em; top: -0.2em;
    padding: em(4,10) em(35,10) em(4,10) 0; z-index: 2;
    background: #fff; border: 1px solid $colorGrayLight1;
    border-radius: 3px;
    animation: slideFromRightFadeIn 0.2s;

    > li {
        font-size: 1.3em; padding: em(7,13) em(15,13);
        white-space: nowrap;
        cursor: pointer;

        &:hover {
            color: $colorMain1;
        }
    }
}

</style>
