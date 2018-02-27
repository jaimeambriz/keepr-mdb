<template>
    <div class="keepsIn">
        <!-- <div class="create-keep">
            <h4 data-toggle="modal" data-target="#createKeep">
                <i class="fa fa-picture-o fa-lg"></i> Create Keep
            </h4>
        </div> -->
        <!-- <div class="create-keep">
                <h4 @click="openCloud">
                    <i class="fa fa-picture-o fa-lg"></i> Create Keep
                </h4>
            </div> -->
        <h1 style="color:white;margin-bottom: 0">My Keeps</h1>
        <div class="row">
            <!-- ********** DRAW KEEPS ********** -->
            <div class="column">
                <div class="thumbnail" data-scroll-reveal="enter left and move 50px over 1.33s" v-for="keep in keeps[0]">
                    <img :src="keep.imageUrl" alt="image" @click="openImageModal(keep)" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="deleteKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="thumbnail" v-for="keep in keeps[1]">
                    <img :src="keep.imageUrl" alt="image" @click="openImageModal(keep)" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="deleteKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="keeps.length > 2" class="column">
                <div class="thumbnail" v-for="keep in keeps[2]">
                    <img :src="keep.imageUrl" alt="image" @click="openImageModal(keep)" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="deleteKeep(keep._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="keeps.length > 2" class="column">
                <div class="thumbnail" v-for="keep in keeps[3]">
                    <img :src="keep.imageUrl" alt="image" @click="openImageModal(keep)" style="width:100%" :id="keep._id">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <div class="buttons">
                            <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                            <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                            <i class="fa fa-trash" @click="deleteKeep(keep._id)"></i>
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
        </div>
        <!-- ********** IMAGE MODAL ********** -->
        <image-modal></image-modal>
    </div>
</template>

<script>
    import swal from "sweetalert2"
    import ImageModal from "./imagemodal"
    export default {
        name: 'Keeps',
        data() {
            return {
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
                // var keeps = this.$store.state.userKeeps
                // if (keeps.length == 4) {
                //     return keeps
                // }
                // this.$store.dispatch('massageKeepData', { data: keeps, num: 4, set: "setUserKeeps" })
                // ********** END **********
                return this.$store.state.userKeeps
            },
            vaults() {
                return this.$store.state.vaults
            },
            activeKeep() {
                return this.$store.state.activeKeep
            }
        },
        mounted() {
            this.$store.dispatch('getUserKeeps')
            this.$store.commit('setActiveVaultKeeps', [])
        },
        methods: {
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
                this.incrementViews(keep)
            },
            incrementViews(keep) {
                keep.views++
                this.$store.dispatch('updateKeep', keep)
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
            deleteKeep(keepId) {
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
                        this.$store.dispatch('deleteKeep', keepId)
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* **********  IMAGE HOVER ********** */

    .buttons:hover,
    img:hover {
        -ms-transform: scale(1.02);
        /* IE 9 */
        -webkit-transform: scale(1.02);
        /* Safari 3-8 */
        transform: scale(1.02);
    }

    /*********** THUMBNAIL OPACITY ********* */

    .caption {
        color: white;
    }

    .thumbnail {
        background-color: rgb(44, 44, 44);
        border: none;
    }

    /* ********* END ********* */

    .create-keep {
        color: white;
        cursor: pointer;
    }

    .row {
        display: flex;
        flex-wrap: wrap
    }

    .buttons {
        background-color: rgba(0, 0, 0, 0.507);
        color: white;
        font-size: 16px;
        padding: 16px 32px;
        border-radius: 10px;
    }

    .fa-code-fork {
        margin-right: 15px;
        margin-left: 15px;
    }

    img,
    .fa-code-fork,
    .fa-trash,
    .fa-eye {
        cursor: pointer;
    }

    .keepsIn {
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

    .keepsOut {
        animation-name: slideOut, fadeOut;
        animation-duration: 0.4s;
    }

    @keyframes slideOut {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-3%);
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    /* .keep-content:hover .overlay {
            opacity: .5;
        }
    
        .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: .5s ease;
            background-color: #40cc4c;
        }
    
        .hover-buttons {
            top: 50%;
            left: 50%;
            position: absolute;
            font-size: 30px;
            transform: translate(-50%, -50%);
            text-align: center;
        } */

    /* *********** COLUMN STYLING ********* */

    body {
        margin: 0;
        font-family: Arial;
    }

    .header {
        text-align: center;
        padding: 32px;
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

    /* Style the buttons */

    /* .btn {
            border: none;
            outline: none;
            padding: 10px 16px;
            background-color: #f1f1f1;
            cursor: pointer;
            font-size: 18px;
        }
    
        .btn:hover {
            background-color: #ddd;
        }
    
        .btn.active {
            background-color: #666;
            color: white;
        } */
</style>