<template>
    <div class="vaults">
        <!-- CREATE VAULT BUTTON -->
        <!-- <div class="create-vault">
            <h4 data-toggle="modal" data-target="#createVault">
                <i class="fa fa-picture-o fa-lg"></i> Create Vault
            </h4>
        </div> -->
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
         
        </div>
    </div>
</template>

<script>
    import swal from'sweetalert2'
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
                return this.$store.state.activeVaults
            },

        },
        mounted() {
            this.$store.dispatch('getVaults')
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
                        swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    } else if (
                        // Read more about handling dismissals
                        result.dismiss === swal.DismissReason.cancel
                    ) {
                        swal(
                            'Cancelled',
                            'Your image file is safe :)',
                            'error'
                        )
                    }
                })
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
        padding: 20px 4px;
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
</style>