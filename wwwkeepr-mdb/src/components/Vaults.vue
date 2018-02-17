<template>
    <div class="vaultsIn">
        <!-- CREATE VAULT BUTTON -->
        <!-- <div class="create-vault">
            <h4 data-toggle="modal" data-target="#createVault">
                <i class="fa fa-picture-o fa-lg"></i> Create Vault
            </h4>
        </div> -->
        <div class="row" v-for="vault in vaults">
            <!-- DRAW THE VAULTS -->

            <div class="vault-image img-responsive col-xs-3">
                <router-link :to="'/vaults/'+vault._id">
                    <img :src="vault.imageUrl" class="pull-left" alt="image" style="width:100%">
                </router-link>
            </div>
            <div class="vault-caption col-xs-6" >
                <router-link :to="'/vaults/'+vault._id">
                    <h1>{{vault.name}}</h1>
                </router-link>
            </div>
            <div class="delete col-xs-3">
                <i class="fa fa-trash fa-3x" @click="deleteVault(vault._id)" ></i>
                <router-link :to="'/vaults/'+vault._id">
                    <i class="fa fa-angle-right fa-4x"></i>
                </router-link>
            </div>

            <!-- <div class="column">
                <div class="thumbnail" v-for="vault in vaults[1]">
                    <router-link :to="'/vaults/'+vault._id">
                        <img :src="vault.imageUrl" alt="image" style="width:100%">
                    </router-link>
                    <div class="caption">
                        <p>{{vault.name}}</p>
                        <i class="fa fa-trash" @click="deleteVault(vault._id)"></i>
                    </div>
                </div>
            </div> -->
            <!-- <div v-if="vaults.length > 2" class="column">
                <div class="thumbnail" v-for="vault in vaults[2]">
                    <router-link :to="'/vaults/'+vault._id">
                        <img :src="vault.imageUrl" alt="image" style="width:100%">
                    </router-link>
                    <div class="caption">
                        <p>{{vault.name}}</p>
                        <i class="fa fa-trash" @click="deleteVault(vault._id)"></i>
                    </div>
                </div>
            </div>
            <div v-if="vaults.length > 2" class="column">
                <div class="thumbnail" v-for="vault in vaults[3]">
                    <router-link :to="'/vaults/'+vault._id">
                        <img :src="vault.imageUrl" alt="image" style="width:100%">
                    </router-link>
                    <div class="caption">
                        <p>{{vault.name}}</p>
                        <i class="fa fa-trash" @click="deleteVault(vault._id)"></i>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2'
    export default {
        name: 'Valuts',
        data() {
            return {
            }
        },
        components: {},
        computed: {
            vaults() {
                // ********** COMMENT THIS OUT WHEN THE SERVER IS RUNNING **********
                // var vaults = this.$store.state.activeVaults
                // if (vaults.length == 2) {
                //     return vaults
                // }
                // this.$store.dispatch('massageKeepData', { data: vaults, num: 2, set: "setActiveVaults" })
                // ********** END **********
                return this.$store.state.vaults
            }

        },
        mounted() {
            // this.$store.dispatch('getVaults')
            this.$store.commit('setActiveVaultKeeps', [])
        },

        methods: {
            deleteVault(vaultId) {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-danger',
                    cancelButtonClass: 'btn btn-success',
                    buttonsStyling: false,
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch('deleteVault', vaultId)
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Your Vault has been deleted',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    // else if (
                    //     // Read more about handling dismissals
                    //     result.dismiss === swal.DismissReason.cancel
                    // ) {
                    //     swal(
                    //         'Cancelled',
                    //         'Your image file is safe :)',
                    //         'error'
                    //     )
                    // }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: black;
    }

    a:focus,
    a:hover {
        text-decoration: none;
        color: white;
    }

    .modal {
        z-index: 9999
    }


    /* *********** COLUMN STYLING ********* */

    img:hover {
        -ms-transform: scale(1.02);
        /* IE 9 */
        -webkit-transform: scale(1.02);
        /* Safari 3-8 */
        transform: scale(1.02);
    }

    img {
        border-radius: 10px;
        max-width: 200px;
        max-height: 124px;

    }

    .row {
        display: -ms-flexbox;
        /* IE 10 */
        display: flex;
        -ms-flex-wrap: wrap;
        /* IE 10 */
        flex-wrap: wrap;
        padding: 10px 4px;
        background-color: gray;
        margin-top: 3vh;
        margin-left: 0;
        margin-right: 0;
        border-radius: 10px;
        height: 130px
    }

    /* Create two equal columns that sits next to each other */

    .column {
        -ms-flex: 25%;
        /* IE 10 */
        flex: 25%;
        padding: 0 4px;
    }

    .column img {
        margin-top: 8px;
        vertical-align: middle;
    }

    .vault-image,
    .caption,
    .delete {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .delete {
        justify-content: space-around;
    }

    .fa-trash:hover {
        color: white;
        cursor: pointer;
    }

    @media(max-width:400px) {
        h1 {
            font-size: 17px;

        }
    }

    .vaultsIn {
        animation-name: slideIn, fadeIn;
        animation-duration: 0.4s;
    }

    @keyframes slideIn {
        0% {
            transform: translateY(-3%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>