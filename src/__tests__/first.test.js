const request = require('supertest')
const createServer = require("../server");
const UserService = require("../service/user.service")
// const app = createServer();
// let payl ={
//     name: "ts",
//     email: "test@gmail.com",
//     password: "123"
// }


describe("user", ()=> {
    describe("user registration", ()=> {
        it("it should return user payload", async()=>{
            const createUserMock = jest
                .spyOn(UserService, "createUser")
                .mockReturnValueOnce(payl)
            
            const {statusCode, body} = await supertest(app)
                .post("/user/create")
                .send(payl)

            expect(statusCode).toBe(200)
        })
    })
})

describe('sum function', () => {
    it('sums up two integers', () => {
      expect(1+2).toEqual(3);
    });
  });