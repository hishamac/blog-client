import axios from "axios";

export const Axios = () =>
  axios.create({
    baseURL: "https://blog-server-bay.vercel.app",
  });

export default Axios();
