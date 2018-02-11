<template>
    <div id="navbar">
        <nav class="nav-down">
            <div class="nav-bar">
                <div class="nav-logo pull-left">
                    <router-link to="/">
                        <img src="https://preview.ibb.co/jq2bbm/Keepr.png" alt="Keeper" height="50" width="50" style="display: inline-block">
                    </router-link>
                </div>
                <div v-if="user._id" class="nav-explore pull-left nav-content">
                    <router-link to="/">
                        <i class="fa fa-search fa-lg"></i> Explore
                    </router-link>
                </div>
                <div v-if="user._id" class="nav-vaults pull-left nav-content">
                    <!-- ********** PUSH TO VAULTS ********** -->
                    <router-link to="/vaults">
                        <i class="fa fa-microchip fa-lg"></i> Vaults
                    </router-link>
                </div>
                <div v-if="user._id" class="nav-keeps pull-left nav-content">
                    <!-- ********** PUSH TO KEEPS ********** -->
                    <router-link to="/keeps">
                        <i class="fa fa-thumb-tack fa-lg"></i> Keeps
                    </router-link>
                </div>
                <div v-if="!user._id" class="nav-register pull-right nav-content" data-toggle="modal" data-target="#register">
                    <a href="#">
                        <i class="fa fa-user-plus"></i> Register</a>
                </div>
                <div v-if="!user._id" class="nav-login pull-right nav-content" data-toggle="modal" data-target="#login">
                    <a href="#">
                        <i class="fa fa-sign-in"></i> Login</a>
                </div>
                <div v-else="user._id" class="nav-logout pull-right nav-content">
                    <a href="#" @click="logout">
                        <i class="fa fa-sign-out"></i> Logout</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                scrolled: false,
                previousSrollPosition: 0
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        components: {},
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            handleScroll() {
                this.scrolled = window.scrollY > 0;
                var currentScrollPosition = window.scrollY
                if (this.scrolled && currentScrollPosition > this.previousSrollPosition + 10) {
                    this.previousSrollPosition = currentScrollPosition
                    $('nav').removeClass('nav-down').addClass('nav-up')
                } else if (this.scrolled && currentScrollPosition < this.previousSrollPosition - 5) {
                    this.previousSrollPosition = currentScrollPosition
                    $('nav').removeClass('nav-up').addClass('nav-down')
                } else if (!this.scrolled && currentScrollPosition == 0) {
                    $('nav').removeClass('nav-up').addClass('nav-down')
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*navbar*/

    nav {
        background-color: #7777777d;
        position: fixed;
        z-index: 1;
        top: 0;
        transition: top 0.2s ease-in-out;
        width: 100%;
    }

    .nav-up {
        top: -60px;
    }

    .nav-logo {
        margin-left: 15px;
        margin-right: 15px
    }

    .nav-bar {
        padding-top: 0px;
    }

    .nav-content {
        font-size: 18px;
        padding-top: 15px;
        margin-right: 15px;

    }

    #navbar {
        min-height: 52px;
    }

    a {
        color: black
    }

    a:focus,
    a:hover {
        color: white;
        text-decoration: none;

    }

    @media(max-width:450px) {
        .nav-content {
            font-size: 17px;
            margin-right: 10px;
        }
    }

    @media(max-width:414px) {
        .nav-content {
            font-size: 14px;
            margin-right: 6px;
        }
    }

    @media(max-width:350px) {
        .nav-content {
            font-size: 12px;
            margin-right: 6px;
        }
    }

    /* ********** TOGGLE SWITCH ********* */

    /*makes the size of the slider*/

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* this makes the checkbox a slider*/

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    /*actual slider itself*/

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    /* set background color when active */

    input:checked+.slider {
        background-color: #2196F3;
    }

    /* change backround color*/

    input:checked+.slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders border*/

    .slider.round {
        border-radius: 34px;
    }

    /* Rounded sliders inside circle*/

    .slider.round:before {
        border-radius: 50%;
    }

    /* SLIDER BOARDER */

    .navbar-inverse .navbar-toggle {
        border-color: #3330;
    }
</style>