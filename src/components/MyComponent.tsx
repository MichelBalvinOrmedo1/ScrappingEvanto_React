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
  const { keyword } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/all_items?keyword=${keyword}`);
        if (response.ok) {
          const jsonRes = await response.json();
          setJsonData(jsonRes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
