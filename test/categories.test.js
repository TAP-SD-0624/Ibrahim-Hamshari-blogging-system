const app = require('../dist/server').default;
const supertest = require('supertest');
const request = supertest(app);

test('Gets all of the categories', async () => {
  const res = await request.get('/api/category');
  expect(res.status).toBe(200);
  expect(res.body.data).toEqual(expect.any(Array));
});



test('Add a category', async () => {
  const newCategory = {
    name:"JestTest"
  }
  const res = await request.post('/api/category').send(newCategory);

  await request.delete(`/api/category/${res.body.data}`);
  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
});


