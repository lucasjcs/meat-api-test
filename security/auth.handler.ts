import * as restify from 'restify'
import {NotAuthorizedError} from 'restify-errors'
import {User} from '../users/users.model'

export const authenticate: restify.RequestHandler = (req, resp, next)=>{
  const {email, password} = req.body
  User.findByEmail(email, '+password') //1st
    .then(user=>{
      if(user && user.matches(password)){ //2nd
        //gerar o token
        //3rd
        
      } else {
        return next(new NotAuthorizedError('Invalid Credentials'))
      }
  }).catch(next)
}
