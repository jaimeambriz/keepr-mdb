<template>
    <!-- ********* IMAGE MODAL ******** -->
    <div>
        <!-- The Modal -->
        <div id="myModal" class="modal">

            <!-- The Close Button -->

            <!-- <span  class="close">&times;</span> -->

            <!-- Modal Content (The Image) -->
            <img class="modal-content" :src="activeKeep.imageUrl" @click="close" id="img01">


            <!-- Modal Caption (Image Text) -->
            <!-- <div id="caption">
                <h1>{{activeKeep.name}}</h1>
            </div> -->
        </div>
    </div>

</template>
<script>
    export default {
        name: 'Modal',
        data() {
            return {
            }
        },
        components: {
        },
        computed: {
            activeKeep() {
                return this.$store.state.activeKeep
            },
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            // When the user clicks on <span> (x), close the modal
            close() {
                $("#myModal").addClass('exit')
                $("#img01").css({ height: "" });
                $("#img01").css({ width: "" });
                setTimeout(function () {
                    $("#myModal").css({ display: "none" }),
                        $("#myModal").removeClass('exit');
                }, 500)
            },
            removeKeep() {
                this.$store.dispatch('setActiveKeep', {})  
            }
        }
    }
</script>
<style scoped>
    /* ********** CSS FOR MODAL ********** */

    /* The Modal (background) */

    .modal {
        display: none;
        justify-content: center;
        align-items: center;

        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 2;
        /* Sit on top */
        /* padding-top: 50px; */
        /* Location of the box */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100%;
        /* Full height */
        overflow: auto;
        /* Enable scroll if needed */
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.9);
        /* Black w/ opacity */
    }

    /* Modal Content (Image) */

    .modal-content {
        margin: auto;
        display: block;
        max-width: 98%;
        max-height: 98%;
        cursor: zoom-out;
    }

    /* Caption of Modal Image (Image Text) - Same Width as the Image */

    #caption {
        margin: auto;
        display: block;
        width: 80%;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: 10vh;
    }

    /* Add Animation - Zoom in the Modal */

    .modal-content,
    #caption {
        animation: zoom;
        animation-duration: 0.7s;
    }

    @keyframes zoom {
        from {
            transform: scale(0)
        }
        to {
            transform: scale(1)
        }
    }

    .exit {
        animation: zoomout;
        animation-duration: .6s;
    }

    @keyframes zoomout {
        from {
            transform: scale(1)
        }
        to {
            transform: scale(0)
        }
    }

    /* The Close Button */

    .close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #000000;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
        z-index: 3;
    }

    .close:hover,
    .close:focus {
        color: rgb(0, 0, 0);
        text-decoration: none;
        cursor: pointer;
    }

    @keyframes zoomout {
        from {
            transform: scale(1)
        }
        to {
            transform: scale(0)
        }
    }

    /* 100% Image Width on Smaller Screens */

    @media only screen and (max-width: 800px) {
        .modal-content {
            max-width: 98%;
            max-height: 98%;
        }
    }
</style>