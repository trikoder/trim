<template>
    <section class="login">
        <h1 class="title">{{title}}</h1>
        <form class="form" @submit.prevent="submitForm">
            <div class="message error" v-if="error">{{error}}</div>
            <div class="formItem">
                <label for="username">{{usernameLabel}}</label>
                <input type="text" class="textInput username" v-model="username" />
            </div>
            <div class="formItem">
                <label for="password">{{passwordLabel}}</label>
                <input type="password" class="textInput password" v-model="password" />
            </div>
            <button type="submit" class="cta">{{buttonCaption}}</button>
        </form>
    </section>
</template>

<script>

import translate from '../library/translate';
import bootData from '../library/bootData';

export default {

    props: {
        authApi: {type: Object, required: true}
    },

    data: () => ({
        title: bootData('loginTitle') || translate('auth.title'),
        usernameLabel: translate('auth.usernameLabel'),
        passwordLabel: translate('auth.passwordLabel'),
        username: '',
        password: '',
        error: undefined,
        loading: false
    }),

    computed: {
        buttonCaption() {
            return translate(this.loading
                ? 'auth.submitBtnLoadingCaption'
                : 'auth.submitBtnCaption'
            );
        }
    },

    methods: {

        submitForm() {

            const auth = this.authApi;

            this.error = undefined;

            if (!this.loading) {

                this.loading = true;

                Promise.resolve(auth.isUserLogged())
                    .then(userLogged => userLogged && auth.teardownEnvironment())
                    .then(() => auth.loginWithCredentials({
                        username: this.username,
                        password: this.password
                    }))
                    .then(() => { this.$router.navigateTo(auth.afterLoginRoute.path); })
                    .catch(error => {
                        this.loading = false;
                        this.error = error.message;
                    })
                ;

            }

        }

    }

};

</script>

<style lang="scss" scoped>

    .login {

        min-width: 30em;
        background: #fff; border: 1px solid $colorGrayLight1;
        box-shadow: 0 2px 5px rgba(#000, 0.05);

        > .title {

            @include fontSansCondensed;

            font-size: 1.5em; padding: em(20,15) em(20,15); letter-spacing: 0.05em;
            text-transform: uppercase; color: lighten($colorGrayDark2, 20%); text-align: center;
            border-bottom: 1px solid $colorGrayLight1;

        }

        .message {

            font-size: 1.4em; padding: em(20,14); position: relative;
            color: #16A740; background-color: #F4FFF6;
            text-align: center; margin: em(-20,14) em(-20,14) em(25,14) em(-20,14);

            &.error {

                background-color: #F8E6E5; color: darken(#F8E6E5, 40%);

                > .actionBtn {

                    border-color: darken(#F8E6E5, 20%); color: darken(#F8E6E5, 40%);

                }

                > .closeBtn:before {

                    color: darken(#F8E6E5, 20%);

                }

            }

        }

        > .form {

            padding: 2em;

            > .cta {

                @include normalizeButton;
                @include fontSansCondensedBold;
                transition: box-shadow 0.2s, color 0.2s;

                font-size: 1.4em; color: $colorGrayDark2; text-transform: uppercase; letter-spacing: 0.03em;
                display: block; width: 100%; padding: em(17,14) em(15,14); margin-top: em(35,14);
                border: 1px solid $colorGrayLight2;
                box-shadow: 0 1px 3px rgba(#000, 0.05);

                @include hover {
                    color: $colorMain1;
                    box-shadow: 0 2px 6px rgba(#000, 0.05);
                }

            }

        }

        .formItem {

            margin-bottom: 4em;

            &:nth-child(4) {

                margin-top: -2em; margin-bottom: 2em;

            }

            > label {

                font-size: 1.2em; padding: em(5,12) 0; display: block;
                text-transform: uppercase; color: $colorGrayDark2; letter-spacing: 0.08em;

            }

            > .textInput {

                appearance: none;
                transition: border-color 0.2s;

                font-size: 1.7em; padding: em(10,17) 0; display: block; width: 100%;
                background-color: transparent; border: 0; border-bottom: 1px solid $colorGrayLight2;

                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px white inset;
                    background-color: transparent;
                }

                &.withError {
                    border-bottom-color: $colorError;
                }

                &:focus {
                    border-bottom-color: $colorMain1;
                }

            }

            > .checkboxInput {

                position: absolute; left: -999em;

                + label {

                    position: relative; display: inline-block; padding-left: 2.5em;

                    &:after {

                        content: "";
                        position: absolute; left: 0; top: 50%; box-sizing: border-box;
                        width: 1.5em; height: 1.5em; margin-top: -0.75em;
                        background-color: #fff; border: 1px solid rgba(#000, 0.2); border-radius: 0.2em;

                    }

                    &:before {

                        display: none; z-index: 10; color: $colorMain1; font-size: 1em; width: 1.7em;

                    }

                }

                &:checked {

                    + label:before {

                        animation: slideDownFadeIn 0.2s;
                        display: block;

                    }

                }

            }

            &.link {

                font-size: em(14,10);
                margin-bottom: 0; margin-top: 2em; text-align: center;

                > a {

                    color: $colorGrayLight2; display: block;

                }

                > .withLeftIcon {

                    padding-left: 25px;

                    &:before { width: 10px; }

                }

            }

        }

        @include mediaMinWidth($breakpointMedium) {

            width: 45em; margin: 7em auto 7em;

            .message {

                margin: em(-40,14) em(-40,14) em(30,14) em(-40,14);

            }

            > .form {

                padding: 4em;

            }

        }

    }

</style>
