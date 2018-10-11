<template>
    <div class="teaser">
        <div class="topBlock">
            <div class="textTeaser">
                <h2 class="title">Modernize your content management system</h2>
                <p class="text">
                    Trikoder Trim is user interface framework for building headless
                    content management systems that connect to JSON API powered backend.
                    Craft responsive single page applications that work on all devices.
                </p>
            </div>
            <div class="iframeCont">
                <iframe frameborder="0" src="https://trikoder.github.io/trim/demo/index.html"></iframe>
            </div>
        </div>
        <div class="featuresAccented">
            <ul>
                <li>
                    <h3 class="title">Headless and powered by JSON API standard</h3>
                    <p class="text">
                        Client applications built with Trikoder Trim are decoupled from
                        server side technology stack. Develop with any
                        backend that can process json api datasets
                        compliant with json:api specification.
                    </p>
                </li>
                <li>
                    <h3 class="title">Responsive UI for all screen sizes and devices</h3>
                    <p class="text">
                        Admin panels built with Trikoder Trim framework are responsive single page
                        applications powered by Vue.js. Extend components or write custom
                        ones using powerful Vue dev tools and environment.
                    </p>
                </li>
                <li>
                    <h3 class="title">Open source, free and battle tested</h3>
                    <p class="text">
                        Trikoder Trim is open source project and can be used in private or commercial
                        projects free of charge. Library is developed, maintained and used by
                        leading Croatian development agency Trikoder.
                    </p>
                </li>
            </ul>
        </div>
        <h3 class="quote">
            Elevate developer and user experience by decoupling frontend
            and agreeing on standardized api.
        </h3>
        <div class="features">
            <ul>
                <li>
                   <h3 class="title">Communicate with backend efficiently</h3>
                   <p class="text">
                        JSON API standard defines how attribute and relation data is structured,
                        how resources are created and updated. By agreeing on standardized
                        input / output with your backend colleges and following shared conventions
                        you can increase productivity and focus on your application.
                   </p>
                </li>
                <li>
                   <h3 class="title">Build resource UI in minutes</h3>
                   <p class="text">
                        Define how resource is browsed, filtered and sorted in list,
                        what form fields are rendered when resource is created or updated.
                        All this is done inside one javascript file via domain specific
                        language or api that anyone can easily read and write.
                   </p>
                </li>
                <li>
                   <h3 class="title">Design with built-in performance</h3>
                   <p class="text">
                        Vue.js is doing its magic underneath all Trim controllers and components.
                        To ensure maximum performance and scalability every controller and its resources
                        are loaded on demand by utilizing webback's code splitting features.
                        No css framework is used and css is component scoped.
                        Browser only downloads css and js related to currently viewed page.
                   </p>
                </li>
                <li>
                   <h3 class="title">Integrate your own components</h3>
                   <p class="text">
                        Custom components and controllers can be easily injected to your Trim application.
                        You can use standard Vue development environment with single file authoring
                        format for composing component template, logic and styles.
                   </p>
                </li>
            </ul>
        </div>
        <section class="contributors">
            <h3 class="title">Contributors</h3>
            <ul>
                <li>
                    <a class="person" href="https://github.com/dbrekalo">
                        <img src="https://s.gravatar.com/avatar/32754a476fb3db1c5a1f9ad80c65d89d?s=100" alt="Damir Brekalo">
                    </a>
                </li>
                <li>
                    <a class="person" href="https://github.com/davoreric">
                        <img src="https://s.gravatar.com/avatar/3024633e44d412a635dfe9adde700e17?s=100" alt="Davor Erić">
                    </a>
                </li>
                <li>
                    <a class="person" href="https://github.com/alenpokos">
                        <img src="https://s.gravatar.com/avatar/e3b6f47be05e23b4c29531b382fecfbd?s=100" alt="Davor Erić">
                    </a>
                </li>
                <li>
                    <a class="person" href="https://hr.linkedin.com/in/vedrankrizek">
                        <img src="https://s.gravatar.com/avatar/43e4f34c2fb55c49c20781c49c14a0f3?s=100" alt="Vedran Križek">
                    </a>
                </li>
            </ul>
        </section>
        <footer class="mainFooter">
            Made with love by Trikoder 2018.
        </footer>
    </div>
</template>

<style lang="scss" scoped>

    .topBlock {

        position: relative; padding: 25px 25px 0;
        background: #f5f5f5 url('/trim/trikoder.svg') no-repeat center 150px;
        background-size: 700px;

        @media screen and (min-width: 720px) {

            padding: 115px 40px 0;
            background-size: 1700px; background-position: center;

        }

    }

    .textTeaser {

        max-width: 600px; padding-bottom: 25px;

        > .title {

            font-size: 35px; margin: 0; position: relative;
            padding: 0 0 20px 0; margin-bottom: 22px;
            letter-spacing: -0.02em; font-weight: bold;
            border: 0;

            &:after {
                content: ''; position: absolute; left: 0; top: 100%;
                width: 40px;
                border-top: 3px solid #e03431;
            }

        }

        > .text {

            color: #585858; margin: 0;

        }

        @media screen and (min-width: 720px) {

            text-align: center; margin: 0 auto 60px; padding-bottom: 0;

            > .title {

                font-size: 45px;

                &:after {

                    left: 50%; margin-left: -20px;

                }

            }

        }

    }

    .iframeCont {

        position: relative; max-width: 1200px; margin: 0 auto; z-index: 10;
        height: 690px; overflow: hidden; display: none;
        box-shadow: 0 0 2em rgba(#000, 0.1); background: #fff;

        > iframe {

            position: absolute; left: 0; top: 0; width: 100%; height: 100%;

        }

        @media screen and (min-width: 720px) {
            display: block;
        }

    }

    .featuresAccented {

        position: relative; padding: 25px 25px 25px;
        background-color: #303844; color: #fff;

        > ul {

            margin: 0 auto; max-width: 1200px; padding: 0; overflow: hidden;

        }

        li {

            list-style: none; margin-bottom: 25px;

            &:last-child { margin-bottom: 0; }

        }

        .title {

            font-size: 24px; font-weight: bold; margin: 0 0 15px 0; padding-bottom: 15px;
            position: relative;

            &:after {
                content: ''; position: absolute; left: 0; top: 100%; width: 20px;
                border-top: 2px solid #e03431;
            }

        }

        .text {

            margin: 0; font-size: 15px;

        }

        @media screen and (min-width: 720px) {

            margin-top: -200px; padding: 270px 40px 80px;

            li {

                float: left; width: percentage(1/3); margin: 0; box-sizing: border-box;
                padding: 0 45px 0 0;

            }

        }

    }

    .quote {

        font-size: 26px; max-width: 900px; margin: 0 auto;
        padding: 25px; position: relative; line-height: 1.4;
        font-weight: normal;

        &:after {

            content: ""; position: absolute; left: 25px; bottom: -1px; width: 50px;
            border-top: 4px solid #e03431;

        }

        @media screen and (min-width: 720px) {

            font-size: 36px; padding: 60px 40px;

            &:after {

                left: 40px;

            }

        }

    }

    .features {

        background-color: #fff; border-top: 1px solid #ededed;

        > ul {

            margin: 0 auto; max-width: 800px; padding: 0; box-sizing: border-box;
            overflow: hidden; padding: 40px 25px;

            @media screen and (min-width: 720px) {

                padding: 60px 40px;

            }

        }

        li {

            list-style: none; margin-bottom: 40px;

            &:last-child { margin-bottom: 0; }

            @media screen and (min-width: 720px) {

                margin-bottom: 60px;

            }

        }

        .title {

            font-size: 24px; font-weight: bold; margin: 0 0 15px 0; padding-bottom: 15px;
            position: relative;

            &:after {
                content: ''; position: absolute; left: 0; top: 100%; width: 20px;
                border-top: 2px solid #e03431;
            }

        }

        .text {

            margin: 0; font-size: 15px;

        }

    }

    .contributors {

        text-align: center; padding: 0 25px 20px; position: relative;
        border-top: 1px solid #ededed;

        > .title {

            font-size: 12px; display: inline-block;
            position: relative; padding: 0 10px; top: -20px;
            text-transform: uppercase; background-color: #fff; color: #ababab;

        }

        ul,
        li { margin: 0; padding: 0; }

        li { display: inline-block; }

        .person {

            display: inline-block; overflow: hidden; margin: 0 5px 5px;
            width: 50px; height: 50px; border-radius: 50%;
            // filter: grayscale(1); opacity: 0.5;

            // &:hover {

            //     filter: grayscale(0); opacity: 1;

            // }

        }

        img {

            display: block; width: 100%;

        }

    }

    .mainFooter {

        text-align: center; padding: 20px 20px; font-size: 13px;
        background: #f5f5f5; color: #ababab; border-top: 1px solid #e2e2e2;

    }

</style>