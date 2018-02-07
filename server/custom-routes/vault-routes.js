var Users = require('../models/user')
var Vaults = require( '../models/vault')
var Keeps = require('../models/keep')




module.exports = {





    // getBoardByBoardId: {
    //     path: '/boards/:boardId',
    //     reqType: 'get',
    //     method(req, res, next){
    //       let action = 'Find Lists By BoardId'
    //       Lists.find({boardId: req.params.boardId})
    //         .then(lists => {
    //           res.send(handleResponse(action, lists))
    //         }).catch(error => {
    //           return next(handleResponse(action, null, error))
    //         })
    //     }
    //   },
    getKeepsByVaultId: {
        path: '/vaults/:vaultId/keeps',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Keeps By VaultId'
            Keeps.find({ vaultId: req.params.vaultId })
                .then(keeps => {
                    res.send(handleResponse(action, keeps))
                }).catch(error => {
                    console.log(error)
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getTasksByListId: {
        path: '/boards/:boardId/lists/:listId/tasks',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Tasks By ListId'
            Tasks.find({ listId: req.params.listId })
                .then(tasks => {
                    res.send(handleResponse(action, tasks))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getCommentsByTaskId: {
        path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Comments By TaskId'
            Comments.find({ taskId: req.params.taskId })
                .then(comments => {
                    res.send(handleResponse(action, comments))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    }





}





function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}