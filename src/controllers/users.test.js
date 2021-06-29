const USERS_URL = 'https://seedyfiuba-back-users.herokuapp.com/api';

/** Mock Axios */
const axios = require('axios');
jest.mock('axios');

const { me, getUser, post, updateMyProfile } = require('./users');
const { ApiError } = require('../errors/ApiError');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('/me successful response', async () => {
  const req = {
    id: 1
  }
  const resObj = {
    data: {
      status: 'success',
      data: {
        "id": "uhasj31asidasdicaw",
        "firstname": "Marcelo",
        "lastname": "Lopez",
        "email": "mlopez@gmail.com",
        "birthdate": "1990-03-04",
        "signindate": "2020-11-10T16:49:52.214Z"
      }
    }
  };

  axios.get.mockReturnValue(resObj);

  const res = mockResponse();

  await me(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/getUser successful response', async () => {
  const req = {
    id: 1,
    params: { id: 'userid2' }
  }
  const resObj = {
    data: {
      status: 'success',
      data: {
        "id": "uhasj31asidasdicaw",
        "firstname": "Marcelo",
        "lastname": "Lopez",
        "email": "mlopez@gmail.com",
        "birthdate": "1990-03-04",
        "signindate": "2020-11-10T16:49:52.214Z"
      }
    }
  };

  axios.get.mockReturnValue(resObj);

  const res = mockResponse();
  await getUser(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/post successful response', async () => { 
  const resObj = {
    data: {
      status: 'success',
      data: {
        "firstname": "Marcelo",
        "lastname": "Lopez",
        "email": "mlopez@gmail.com",
        "birthdate": "1990-03-04",
      }
    }
  };

  const req = {
    id: 1,
    body: {}
  }
  axios.post.mockReturnValue(resObj);

  const res = mockResponse();

  await post(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/post unsuccessful response 400 error code', async () => { 
  const req = {
    id: 1,
    body: {}
  }

  axios.post.mockReturnValue(new Error({
    response:{
      data: {
        status: "error",
        error: "mock-error"
      },
      status: 400
    }
  }));

  const res = mockResponse();

  try{
    await post(req, res);
  } catch (err) {
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400);
  }
});

test('/updateMyProfile successful response', async () => { 
  
  const req = {
    id: 1,
    body: {
      "firstname": "Omar",
      "lastname": "Garcia"
    }
  }
  
  const resObj = {
    data: {
      status: 'success',
      data: {
        ...req.body,
        "email": "mlopez@gmail.com",
        "birthdate": "1990-03-04",
      }
    }
  };

  axios.patch.mockReturnValue(resObj);

  const res = mockResponse();

  await updateMyProfile(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/updateMyProfile unsuccessful response 400 error code', async () => { 
  const req = {
    id: 1,
    body: {
      "firstname": "Omar",
      "lastname": "Garcia",
      "erroneo": "error"
    }
  }
  
  axios.patch.mockReturnValue(new Error({
    response:{
      data: {
        status: "error",
        error: "mock-error"
      },
      status: 400
    }
  }));

  const res = mockResponse();

  try{
    await updateMyProfile(req, res);
  } catch (err) {
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400);
  }
});