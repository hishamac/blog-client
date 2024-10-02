import { useNavigate } from "react-router-dom";

const navigate = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};

export default navigate;