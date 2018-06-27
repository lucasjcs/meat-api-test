import 'jest'
import * as request from 'supertest'


let address: string = (<any>global).address

test('Testando a listagem de restaurantes pelo metodo get', () => {
  return request(address)
         .get('/restaurants')
         .then(response=>{
           expect(response.status).toBe(200)
           expect(response.body.items).toBeInstanceOf(Array)
         })
         .catch(fail)
})

test('Testando exception ao dar get em uma url invalida', () => {
  return request(address)
         .get('/restaurants/xxx')
         .then(response => {
           expect(response.status).toBe(404)
         })
         .catch(fail)
})

test('Testando a criação de um restaurante pelo metodo post', () => {
  return request(address)
            .post('/restaurants')
            .send({
              name: 'Happy Burguer',
              menu: [{name: "Happy Bacon", price: 12}]
            })
            .then(response=>{
              expect(response.status).toBe(200)
              expect(response.body._id).toBeDefined()
              expect(response.body.name).toBe('Happy Burguer')
              expect(response.body.menu).toBeInstanceOf(Array)
              expect(response.body.menu).toHaveLength(1)
              expect(response.body.menu[0]).toMatchObject({name: "Happy Bacon", price: 12})
            })
            .catch(fail)
})
