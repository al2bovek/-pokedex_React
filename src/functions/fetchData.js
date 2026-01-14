 
  
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    
    const getData = async () => {
    try {
      const response = await fetch('url');
      if (!response.ok) throw new Error(`Error Status: ${response.status}`);
      const results = await response.json();
      setData(results);
    } catch (error) {
      setError(error.message);
    }
  };

//   url -> http://localhost:3000/endpoint