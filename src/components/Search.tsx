import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/Search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  styleForm: string;
}

function Search({ styleForm }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirigir a la ruta con el valor del campo de entrada
    navigate(`/all_items/${inputValue}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Form className={`d-flex form ${styleForm}`} onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Busca tu recurso ..."
        value={inputValue}
        onChange={handleChange}
        className="me-2 form-control"
        aria-label="Buscar recursos"
        id="keyword"
      />

      <Button
        style={{ minWidth: "100px" }}
        type="submit"
        variant="outline-success">
        <i className="bx bx-search-alt-2"></i> Buscar
      </Button>
    </Form>
  );
}

export default Search;
