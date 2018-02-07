//NEED TO MAKE CUSTOM ROUTES FOR LISTS/TASKS/COMMENTS


let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

module.exports = {
  userVaults: {
    path: '/uservaults',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Vaults'
      Vaults.find({creatorId: req.session.uid})
        .then(vaults => {
          res.send(handleResponse(action, vaults))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userKeeps: {
    path: '/userkeeps',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Vaults'
      Keeps.find({creatorId: req.session.uid})
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  // sharedBoards: {
  //   path: '/sharedBoards',
  //   reqType: 'get',
  //   method(req, res, next){
  //     Boards.find({collaborators: { $in: req.session.uid}})
  //       .then(boards => {
  //         res.send(handleResponse(action, boards))
  //       }).catch(error => {
  //         return next(handleResponse(action, null, error))
  //       })
  //   }
  // }
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