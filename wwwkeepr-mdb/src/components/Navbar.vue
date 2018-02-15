<template>
    <div>
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
                    <div v-if="user._id" class="nav-create-keep pull-right nav-content" data-toggle="modal" data-target="#createKeep">
                        <img src="../assets/add-keep.png" height="50" width="50" alt="">
                    </div>
                    <div v-if="user._id" class="nav-create-vault pull-right nav-content" data-toggle="modal" data-target="#createVault">
                        <img src="../assets/add-vault.png" height="40" width="40" alt="">
                    </div>
                </div>
            </nav>
        </div>
        <!--CREATE VAULT MODAL BEGIN -->
        <div class="modal fade" id="createVault" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- *********** Modal Header *********** -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title">
                            Create Vault
                        </h4>
                    </div>
                    <!-- *********** Modal Body *********** -->
                    <div class="modal-body">
                        <form class="form">
                            <div class="form-group">
                                <label class="control-label">Name</label>
                                <input type="text" class="form-control" placeholder="Name" v-model="vault.name" required/>
                            </div>
                            <label class="control-label">Image</label>
                            <div class="image">
                                <img class="add-vault-image" :src="vault.imageUrl" @click="openCloudinary('v')" v-model="vault.imageUrl" required/>
                            </div>
                            <div class="form-group">
                                <button v-if="vault.name && vault.imageUrl != 'https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png' "
                                    @click="createVault" data-dismiss="modal" class="btn btn-success">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- CREATE KEEP MODAL -->
        <div class="modal fade" id="createKeep" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- *********** Modal Header *********** -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title">
                            Create Keep
                        </h4>
                    </div>
                    <!-- *********** Modal Body *********** -->
                    <div class="modal-body">
                        <form class="form">
                            <label class="control-label">Name</label>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Name" v-model="keep.name" required/>
                            </div>
                            <label class="control-label">Image</label>
                            <div class="image">
                                <img :src="keep.imageUrl" class="add-keep-image" @click="openCloudinary" v-model="keep.imageUrl" required/>
                            </div>
                            <div class="form-group">
                                <button v-if="keep.name && keep.imageUrl != 'https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png' "
                                    @click="createKeep" data-dismiss="modal" class="btn btn-success">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2'
    export default {
        name: 'Navbar',
        data() {
            return {
                scrolled: false,
                previousSrollPosition: 0,
                vault: {
                    name: "",
                    imageUrl: "https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png",
                },
                keep: {
                    name: "",
                    imageUrl: "https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png",
                },
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
            createVault() {
                this.$store.dispatch("createVault", this.vault)
                this.vault = {
                    name: "",
                    imageUrl: "https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png"
                }
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'You\'ve created a new Vault!',
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            createKeep() {
                this.$store.dispatch('createKeep', this.keep)
                this.keep = {
                    name: "",
                    imageUrl: "https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png",
                }
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'You\'ve created a new Keep!',
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            openCloudinary(str) {
                cloudinary.openUploadWidget({ cloud_name: 'life-keepr', upload_preset: 'czqfqpq8' },
                    (error, result) => {
                        if (str == 'v'){
                        this.vault.imageUrl = result[0].secure_url
                        }else{
                        this.keep.imageUrl = result[0].secure_url
                        }
                    });
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
        top: -80px;
    }

    .nav-logo {
        padding-top: 8px;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom:10px;
    }

    .nav-bar {
        padding-top: 0px;
    }

    .nav-content {
        font-size: 18px;
        padding-top: 25px;
        margin-right: 15px;
    }

    .nav-create-keep {
        padding-top: 10px;
        cursor: pointer;
    }

    .nav-create-vault {
        padding-top: 16px;
        cursor: pointer
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

    @media(max-width:575px) {
        .nav-content {
            font-size: 17px;
            margin-right: 10px;
        }
        .nav-logo{
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    @media(max-width:530px) {
        .nav-content {
            font-size: 14px;
            margin-right: 6px;
        }
        .nav-logo{
            margin-left: 6px;
            margin-right: 6px;
        }
    }

    @media(max-width:450px) {
        .nav-content {
            font-size: 12px;
            margin-right: 6px;
        }
        .nav-logo{
            margin-left: 0px;
            margin-right: 4px;
        }
    }
    @media(max-width:390px) {
        .nav-content {
            font-size: 10px;
            margin-right: 4px;
        }
        .nav-logo{
            margin-left: 0px;
            margin-right: 4px;
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

    /*********** VAULT MODAL **********/

    .add-vault-image, .add-keep-image {
        height: 200px;
        width: auto;
        cursor: pointer;
    }

    .image {
        margin-bottom: 10px;

    }
</style>