import axios from "axios";

axios.post('https://flex-chat-backend.onrender.com/api/auth/signup', {
  email: 'test@example.com',
  password: 'testpassword',
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });