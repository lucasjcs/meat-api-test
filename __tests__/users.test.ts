import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address

test('test listando usuarios pelo metodo get', ()=>{
  return request(address)
     .get('/users')
     .then(response=>{
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)
     }).catch(fail)
})

test('testando cadastro de usuario pelo metodo post', ()=>{
  return request(address)
     .post('/users')
     .send({
       name: 'lucasjcs',
       email: 'lucasjcs@email.com',
       password: '123456',
       cpf: '962.116.531-82'
     })
     .then(response=>{
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined()
        expect(response.body.name).toBe('lucasjcs')
        expect(response.body.email).toBe('lucasjcs@email.com')
        expect(response.body.cpf).toBe('962.116.531-82')
        expect(response.body.password).toBeUndefined()
     }).catch(fail)
})


test('testando get em url inválida', ()=>{
  return request(address)
     .get('/users/xxx')
     .then(response=>{
      expect(response.status).toBe(404)
     }).catch(fail)
})

test('testando busca de usuario por id', ()=>{
  return request(address)
            .post('/users')
            .send({
              name: 'lucasjcs',
              email: 'lucasjcs@gmail.com',
              password: '123456',
              cpf: '482.326.154-27'
            }).then(response => request(address)
                     .get(`/users/${response.body._id}`))
              .then(response=>{
                       expect(response.status).toBe(200)
                       expect(response.body.name).toBe('lucasjcs')
                       expect(response.body.email).toBe('lucasjcs@gmail.com')
                       expect(response.body.cpf).toBe('482.326.154-27')
                       expect(response.body.password).toBeUndefined()
           }).catch(fail)
})

test('testando deleção de usuario em url invalida', ()=>{
  return request(address)
          .delete(`/users/xxx`)
          .then(response=>{
                expect(response.status).toBe(404)
           }).catch(fail)
})


test('testando deleção de usuario pelo metodo delete', ()=>{
    return request(address)
              .post('/users')
              .send({
                name: 'usuario 3',
                email: 'user3@gmail.com',
                password: '123456',
                cpf: '187.638.581-26'
              }).then(response => request(address)
                       .delete(`/users/${response.body._id}`))
                .then(response=>{
                  expect(response.status).toBe(204)
             }).catch(fail)
  
  })

test('testando a atualização de um usuário num caminho não existente com o metodo patch', ()=>{
  return request(address)
          .patch(`/users/xxxx`)
          .then(response=>{
                expect(response.status).toBe(404)
           }).catch(fail)
})

  

