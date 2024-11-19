import axios from "axios";

axios.post('http://localhost:6969/api/auth/signup', {
  email: 'test@example.com',
  password: 'testpassword',
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });