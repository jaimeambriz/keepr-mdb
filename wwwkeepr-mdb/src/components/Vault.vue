<template>
    <div class="vaultIn">
        <!-- <router-link to="/vaults">
            <img src="../assets/BackButton.png" class="pull-left" height="40" width="50" style="display: inline-block" alt="Back button">
        </router-link> -->
        <h1 style="color:white;margin-bottom: 0">{{vault.name}}</h1>
        <div class="row">
            <!-- ********** DRAW KEEPS ********** -->
            <div class="column">
                <div class="thumbnail" v-for="keep in keeps[0]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="removeKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="thumbnail" v-for="keep in keeps[1]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="removeKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="keeps.length > 2" class="column">
                <div class="thumbnail" v-for="keep in keeps[2]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="removeKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="keeps.length > 2" class="column">
                <div class="thumbnail" v-for="keep in keeps[3]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="removeKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- *********** ADD KEEP TO VAULT MODAL************ -->
        <div class="modal fade" id="addKeep" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- *********** Modal Header *********** -->
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title">
                        Add Keep
                    </h4>
                    <h6>{{activeKeep.name}}</h6>
                    <img :src="activeKeep.imageUrl" alt="" style="height:100px; width:auto;">
                    <!-- *********** Modal Body *********** -->
                    <div class="modal-body">
                        <form class="form">
                            <div class="form-group">
                                <div class="col-sm-12 dropdown-style" title="choose category">
                                    <label for="vault options">Select Vault</label>
                                    <select class="form-control text-center" v-model="addKeep">
                                        <option class="col-sm-12" disabled>Vaults</option>
                                        <option class="col-sm-12" v-for="vault in vaults" selected :value="vault._id">{{vault.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <button @click="addKeepToVault(addKeep)" data-dismiss="modal">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <image-modal></image-modal>
    </div>
</template>

<script>
    import swal from 'sweetalert2'
    import ImageModal from './imagemodal'
    export default {
        name: 'Vault',
        data() {
            return {
                keep: {
                    name: "",
                    imageUrl: "",
                },
                addKeep: {
                    vaultId: "",
                    keepId: "",
                },
            }
        },
        components: {
            ImageModal
        },
        computed: {
            keeps() {
                // ********** COMMENT THIS OUT WHEN THE SERVER IS RUNNING **********
                // var keeps = this.$store.state.activeKeeps
                // if (keeps.length == 4) {
                //     return keeps
                // }
                // this.$store.dispatch('massageKeepData', { data: keeps, num: 4, set: "setActiveVaultKeeps" })
                // ********** END **********
                return this.$store.state.activeKeeps
            },
            activeKeep() {
                return this.$store.state.activeKeep
            },
            vaults() {
                return this.$store.state.vaults
            },
            vault() {
                return this.$store.state.activeVault
            },

        },
        beforeMount() {
            this.$store.dispatch('getKeepsByVaultId', this.$route.params.id)
            this.$store.dispatch('setActiveVault', this.$route.params.id)
        },
        methods: {
            removeKeep(keepId) {
                swal({
                    title: 'Are you sure?',
                    text: "This keep will be removed!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, remove it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-danger',
                    cancelButtonClass: 'btn btn-success',
                    buttonsStyling: false,
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch('removeKeepFromVault', { removeVaultId: this.$route.params.id, keepId: keepId })
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Your Keep has been deleted',
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
            },
            openImageModal(keep) {
                var window = this.$store.state.windowWidth
                var img = document.getElementById(keep._id);
                //or however you get a handle to the IMG
                var width = img.clientWidth;
                var height = img.clientHeight;
                if (window > 800) {
                    if (height > width) {
                        $("#img01").css({ height: "98%" });
                    }
                    else {
                        $("#img01").css({ width: "98%" });
                    }
                } else {
                    // ******** THIS IS FOR MOBILE *******
                    if (height > width) {
                        $("#img01").css({ height: "98%" });
                    }
                    else {
                        $("#img01").css({ width: "98%" });
                    }
                }
                this.$store.dispatch('setActiveKeep', keep)
                $("#myModal").css({ display: "flex" });
            },
            addKeepToVault(vaultId) {
                var activeKeep = this.activeKeep
                if (!activeKeep.vaultId.includes(vaultId)) {
                    var addKeep = {
                        keepId: activeKeep._id,
                        addVaultId: vaultId,
                    }
                    this.incrementCount()
                    this.$store.dispatch("addKeepToVault", addKeep)
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Your Keep has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            },
            incrementCount() {
                var keep = this.$store.state.activeKeep
                keep.saveCount++
                this.$store.dispatch("updateKeep", keep)
            },
            setActiveKeep(keep) {
                this.$store.dispatch('setActiveKeep', keep)
                $("#addKeep").modal('show')
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .thumbnail {
        background-color: rgb(44, 44, 44);
        border: none
    }

    i,
    p {
        color: white;
    }

    .keeps {
        padding-top: 2rem;

    }

    .fa-code-fork {
        margin-right: 15px;
        margin-left: 15px;
    }

    img:hover {
        -ms-transform: scale(1.02);
        /* IE 9 */
        -webkit-transform: scale(1.02);
        /* Safari 3-8 */
        transform: scale(1.02);
    }

    img {
        border-radius: 10px;
        cursor:zoom-in
    }

    /* *********** COLUMN STYLING ********* */

    .row {
        margin-top: 1rem;
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

    .vaultIn {
        animation-name: slideIn, fadeIn;
        animation-duration: 1s;
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