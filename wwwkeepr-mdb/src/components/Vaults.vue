<template>
    <div class="vaults">
        <!-- CREATE VAULT BUTTON -->
        <div class="create-vault">
            <h4 data-toggle="modal" data-target="#createVault">
                <i class="fa fa-picture-o fa-lg"></i> Create Vault
            </h4>
        </div>
        <div class="row">
            <!-- DRAW THE VAULTS -->
            <div class="column">
                <div class="thumbnail" v-for="vault in vaults[0]">
                    <router-link :to="'/vaults/'+vault._id">
                        <img :src="vault.imageUrl" alt="image" style="width:100%">
                    </router-link>
                    <div class="caption">
                        <p>{{vault.name}}</p>
                        <i class="fa fa-trash" @click="deleteVault(vault._id)"></i>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="thumbnail" v-for="vault in vaults[1]">
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
                                    <img class="add-vault-image" :src="vault.imageUrl" @click="openCloudinary" v-model="vault.imageUrl" required/>
                                </div>
                                <div class="form-group">
                                        <button v-if="vault.name && vault.imageUrl != 'https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png' " @click="createVault" data-dismiss="modal" class="btn btn-success">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Valuts',
        data() {
            return {
                vault: {
                    name: "",
                    imageUrl: "https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png",
                }
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
                return this.$store.state.activeVaults
            },

        },
        mounted() {
            this.$store.dispatch('getVaults')
        },
        methods: {
            createVault() {
                this.$store.dispatch("createVault", this.vault)
                this.vault = {
                    name: "",
                    imageUrl: "https://churchtraconline.com/articles/wp-content/uploads/2017/09/Antu_insert-image.svg_-846x846.png"
                }
            },
            openCloudinary() {
                cloudinary.openUploadWidget({ cloud_name: 'life-keepr', upload_preset: 'czqfqpq8' },
                    (error, result) => {
                        this.vault.imageUrl = result[0].secure_url
                    });
            },
            deleteVault(vaultId) {
                this.$store.dispatch('deleteVault', vaultId)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .create-vault {
        color: white;
        cursor: pointer;
    }

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
    }

    .row {
        display: -ms-flexbox;
        /* IE 10 */
        display: flex;
        -ms-flex-wrap: wrap;
        /* IE 10 */
        flex-wrap: wrap;
        padding: 0 4px;
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

    /*********** VAULT MODAL **********/

    .add-vault-image {
        height: 200px;
        width: auto;
    }

    .image {
        margin-bottom: 10px;
    }
</style>