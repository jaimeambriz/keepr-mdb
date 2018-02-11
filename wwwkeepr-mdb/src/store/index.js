import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import $ from 'jquery'
import index from 'vue';

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:3000/' : 'https://life-keepr.herokuapp.com/'

let api = axios.create({
    baseURL: base + 'api/',
    timeout: 20000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: base,
    timeout: 5000,
    withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
    state: {
        user: {},
        keeps: [],
        vaults: [],
        userKeeps: [],
        activeVaults: [],
        activeKeeps: [],
        activeKeep: {},
        error: {},
        windowWidth:0
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setKeeps(state, payload) {
            state.keeps = payload
        },
        setVaults(state, payload) {
            state.vaults = payload
        },
        setUserKeeps(state, payload) {
            // console.log("setUserKeeps: ", payload)
            state.userKeeps = payload
        },
        setActiveKeep(state, payload) {
            state.activeKeep = payload
        },
        setActiveVaultKeeps(state, payload) {
            state.activeKeeps = payload
        },
        setActiveVaults(state, payload) {
            state.activeVaults = payload
        },
        setWindowWidth(state, payload){
            state.windowWidth = payload
        }
    },
    actions: {
        windowWidth({ commit, dispath}, payload){
            commit('setWindowWidth', payload)
        },
        // ********** User **********
        login({ commit, dispatch }, payload) {
            auth.post('accounts/login', payload)
                .then(res => {
                    commit('setUser', res.data.data)
                    // console.log('Login: ', res)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        register({ commit, dispatch }, payload) {
            auth.post('accounts/register', payload)
                .then(res => {
                    // console.log('Register: ', res)
                    commit('setUser', res.data.data)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        authenticate({ commit, dispatch }) {
            auth('authenticate')
                .then(res => {
                    // console.log('authenticate: ', res)
                    if (res.data.data != "") {
                        commit('setUser', res.data.data)
                        dispatch('getAllKeeps')
                        dispatch('getVaults')
                        dispatch('getUserKeeps')
                        // router.push({ name: 'Home' })
                    }
                    else {
                        commit('setUser', {})
                        dispatch('getAllKeeps')
                        dispatch('getVaults')
                        dispatch('getUserKeeps')
                    }
                })
                .catch(err => {
                    // console.log(err)
                    commit('setUser', {})
                    dispatch('getAllKeeps')
                    router.push({ name: 'Home' })
                })
        },
        logout({ commit, dispatch }) {
            auth.delete('accounts/logout')
                .then(res => {
                    commit('setUser', {})
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    router.push({ name: 'Home' })
                })
        },
        // ********** Vaults **********
        getVaults({ commit, dispatch }) {
            var userId = this.state.user.id;
            api('uservaults')
                .then(res => {
                    commit('setVaults', res.data.data)
                    dispatch('massageKeepData', { data: res.data.data, num: 2, set: "setActiveVaults" })
                    // console.log('Get Usesr Vaults: ', res)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        createVault({ commit, dispatch }, payload) {
            api.post('vaults', payload)
                .then(res => {
                    // console.log('Create Vault ', res)
                    dispatch('getVaults')
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        updateVault({ commit, dispatch }, payload) {
            api.put('vaults/' + payload.vaultId, payoald)
                .then(res => {
                    // console.log('Update Vault ', res)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        deleteVault({ commit, dispatch }, payload) {
            api.delete('vaults/' + payload)
                .then(res => {
                    // console.log('Delete Vault ', res)
                    dispatch('getVaults')
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        // ********** Keeps **********
        getAllKeeps({ commit, dispatch }) {
            var num = 2
            if (this.state.windowWidth > 640){
                num = 4
            }

            api('keeps')
                .then(res => {
                    dispatch('massageKeepData', { data: res.data.data, num: num, set: "setKeeps" })
                    // console.log('Get Keeps: ', res.data.data)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        massageKeepData({ commit, dispatch }, payload) {
            var arrayIndex = 0;
            var outArray4 = [[], [], [], []];
            var outArray2 = [[], []];
            for (var i = 0; i < payload.data.length; i++) {
                var thumbnail = payload.data[i];
                if (payload.num == 4) {
                    outArray4[arrayIndex].push(thumbnail);
                    arrayIndex++;
                }
                if (payload.num == 2) {
                    outArray2[arrayIndex].push(thumbnail);
                    arrayIndex++;
                }
                if (arrayIndex == payload.num) {
                    arrayIndex = 0;
                }
            }
            if (payload.num == 2) {
                commit(`${payload.set}`, outArray2)
            } else {
                commit(`${payload.set}`, outArray4)
            }
        },
        getUserKeeps({ commit, dispatch }) {
            var num = 2
            if (this.state.windowWidth > 640){
                num = 4
            }
            api('userkeeps')
                .then(res => {
                    dispatch('massageKeepData', { data: res.data.data, num: num, set: "setUserKeeps" })
                    // console.log('Get User Keeps: ', res)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        getKeepsByVaultId({ commit, dispatch }, payload) {
            var num = 2
            if (this.state.windowWidth > 640){
                num = 4
            }
            api('vaults/' + payload + '/keeps/')
                .then(res => {
                    // console.log('Get Keeps By ValutId: ', res)
                    dispatch('massageKeepData', { data: res.data.data, num: num, set: "setActiveVaultKeeps" })
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        setActiveKeep({ commit, diapatch }, payload) {
            commit('setActiveKeep', payload)
        },
        createKeep({ commit, dispatch }, payload) {
            api.post('keeps', payload)
                .then(res => {
                    dispatch('getAllKeeps')
                    dispatch('getUserKeeps')
                    // console.log('Create Keep: ', res)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        addKeepToVault({ commit, dispatch }, payload) {
            api.put('keeps/' + payload.keepId , payload)
                .then(res => {
                    // console.log('Added Keep To Vault: ', res)

                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        removeKeepFromVault({ commit, dispatch }, payload) {
            api.put('keeps/' + payload.keepId, payload )
                .then(res => {
                    // console.log('RemoveKeepFromVault: ', res.data)
                    dispatch('getKeepsByVaultId', payload.removeVaultId)
                })
        },
        updateKeep({ commit, dispatch }, payload) {
            api.put('keeps/' + payload._id, payload)
                .then(res => {
                    // console.log('Update Keep: ', res)
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },
        deleteKeep({ commit, dispatch }, payload) {
            api.delete('keeps/' + payload)
                .then(res => {
                    // console.log('Delete Keep: ', res)
                    dispatch('getUserKeeps')
                    dispatch('getAllKeeps')
                })
                .catch(err => {
                    // console.log('Error: ', err)
                })
        },

    }

})

export default store