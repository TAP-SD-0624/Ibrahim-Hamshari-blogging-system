const app = require('../dist/server').default;
const supertest = require('supertest');
const request = supertest(app);

test('Gets all of the users', async () => {
  const res = await request.get('/api/user');
  expect(res.status).toBe(200);
  expect(res.body.data).toEqual(expect.any(Array));
});


test('Gets user details', async () => {
  const newUser = {
    nickname: "JestTestDetails",
    username: "MyNameDetails",
    password: "password"
  }
  const resPost = await request.post('/api/user').send(newUser);
  const res = await request.get(`/api/user/${resPost.body.data}`);
  await request.delete(`/api/user/${resPost.body.data}`)
  expect(res.status).toBe(200);
  expect(res.body.data.id).toBe(resPost.body.data);

});



test('Add a user', async () => {
  const newUser = {
    nickname: "JestTest",
    username: "MyName",
    password: "password"
  }
  const res = await request.post('/api/user').send(newUser);

  await request.delete(`/api/user/${res.body.data}`);
  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
});



test('delete a user', async () => {
  const newUser = {
    nickname: "JestTest1",
    username: "MyName1",
    password: "password1"
  }
  const resPost = await request.post('/api/user').send(newUser);
  const res = await request.delete(`/api/user/${resPost.body.data}`)
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
});
