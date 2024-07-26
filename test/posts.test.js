const app = require('../dist/server').default;
const supertest = require('supertest');
const request = supertest(app);

test('Gets all of the posts', async () => {
  const res = await request.get('/api/post');
  expect(res.status).toBe(200);
  expect(res.body.data).toEqual(expect.any(Array));
});


test('Gets post details', async () => {
  const newUser = {
    nickname: "JestTestDetails",
    username: "MyNameDetails",
    password: "password"
  }
  const resUser = await request.post('/api/user').send(newUser);

  const newPost = {
    title: "JestPost11",
    body: "Testing11",
    userId: resUser.body.data
  }
  const resPost = await request.post('/api/post').send(newPost);
  const res = await request.get(`/api/post/${resPost.body.data}`);
  await request.delete(`/api/post/${resPost.body.data}`);
  await request.delete(`/api/user/${resUser.body.data}`);
  expect(res.status).toBe(200);
  expect(res.body.data.id).toBe(resPost.body.data);
});



test('Add a post', async () => {
  const newUser = {
    nickname: "JestTestDetails123",
    username: "MyNameDetails123",
    password: "password"
  }
  const resUser = await request.post('/api/user').send(newUser);

  const newPost = {
    title: "JestPost11",
    body: "Testing11",
    userId: resUser.body.data
  }
  const res = await request.post('/api/post').send(newPost);

  await request.delete(`/api/post/${res.body.data}`);
  await request.delete(`/api/user/${resUser.body.data}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
});



test('delete a post', async () => {
  const newUser = {
    nickname: "JestTestDetails111",
    username: "MyNameDetails111",
    password: "password"
  }
  const resUser = await request.post('/api/user').send(newUser);

  const newPost = {
    title: "JestPost11",
    body: "Testing11",
    userId: resUser.body.data
  }
  const resPost = await request.post('/api/post').send(newPost);

  const res = await request.delete(`/api/post/${resPost.body.data}`);
  await request.delete(`/api/user/${resUser.body.data}`);
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
});
