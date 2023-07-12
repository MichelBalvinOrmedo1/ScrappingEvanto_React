import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  email: string;
  // ...
}

function All_Items() {
  const [jsonData, setJsonData] = useState<UserData | null>(null);
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/all_items?keyword=${keyword}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes: UserData) => setJsonData(jsonRes))
      .catch((error) => console.error(error));
  }, [keyword]);

  const handleGoBack = () => {
    navigate(-2); // Navegar hacia atrás en la historia
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      {jsonData ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default All_Items;
