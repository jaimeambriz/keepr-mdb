<template>
    <div class="vault">
        <div class="row">
            <!-- ********** DRAW KEEPS ********** -->
            <div class="column">
                <div class="thumbnail" v-for="keep in keeps[0]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                        <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                        <i class="fa fa-trash" @click="removeKeepFromVault(keep._id)"></i>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="thumbnail" v-for="keep in keeps[1]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                        <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                        <i class="fa fa-trash" @click="removeKeepFromVault(keep._id)"></i>
                    </div>
                </div>
            </div>
            <div v-if="keeps.length > 2" class="column">
                <div class="thumbnail" v-for="keep in keeps[2]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                        <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                        <i class="fa fa-trash" @click="removeKeepFromVault(keep._id)"></i>
                    </div>
                </div>
            </div>
            <div v-if="keeps.length > 2" class="column">
                <div class="thumbnail" v-for="keep in keeps[3]">
                    <img :src="keep.imageUrl" @click="openImageModal(keep)" alt="image" style="width:100%">
                    <div class="caption">
                        <p>{{keep.name}}</p>
                        <i class="fa fa-eye" @click="openImageModal(keep)">{{keep.views}}</i>
                        <i class="fa fa-code-fork" @click="setActiveKeep(keep)">{{keep.saveCount}}</i>
                        <i class="fa fa-trash" @click="removeKeepFromVault(keep._id)"></i>
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
        },
        mounted() {
            this.$store.dispatch('getKeepsByVaultId', this.$route.params.id)
        },
        methods: {
            removeKeepFromVault(keepId) {
                this.$store.dispatch('removeKeepFromVault', { removeVaultId: this.$route.params.id, keepId: keepId })
            },
            openImageModal(keep) {
                this.$store.dispatch('setActiveKeep', keep)
                $("#imageModal").modal('show')
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
                }
                return
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
        background-color: rgba(87, 87, 87, 0.5);
    }
    i, p{color: white;}

    .keeps {
        padding-top: 2rem;

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
    }

    /* *********** COLUMN STYLING ********* */

    .row {
        margin-top: 5rem;
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
</style>