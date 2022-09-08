import axios from 'axios';

function createHttpClient(){
  console.log(import.meta.env.BASE_URL);
  if(import.meta.env.PROD){
    console.log('IN');
  }
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL;
  console.log(baseURL)
  const api = axios.create({
    baseURL: baseURL
  });
  api.interceptors.request.use(async (config) => {
    const { IdToken, user } = sessionStorage;
    if (IdToken)
    config.headers.authorization = `${IdToken}`;
    
    if (user){
      const usuario = JSON.parse(user)
      config.headers.user_id = `${usuario.id}`;
    }
  
    return config;
  });
  
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    
    (err) => Promise.reject(err)
  );
  return api;
}
const api = createHttpClient();
export default api;