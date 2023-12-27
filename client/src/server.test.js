const { postDataToServer } = require('./serverUtils');

test('posts data to server and receives a response', async () => {
  const data = { name: 'Test Name', email: 'test@example.com' /* other data */ };
  const response = await postDataToServer(data);
  expect(response).toEqual('Success'); // or any other expected response from the server
});