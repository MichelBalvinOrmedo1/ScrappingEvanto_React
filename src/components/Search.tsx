import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/Search.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect } from "react";

interface SearchProps {
  styleForm: string;
}

function Search({ styleForm }: SearchProps) {
  useEffect(() => {
    console.log("hola");
  }, []);
  return (
    <Form className={`d-flex form ${styleForm}`}>
      <Form.Control
        type="search"
        placeholder="Busca tu recurso ..."
        className="me-2 form-control "
        aria-label="Search"
        id="keyword"
      />

      <Button
        style={{ minWidth: "100px" }}
        type="submit"
        variant="outline-success">
        <i className="bx bx-search-alt-2"></i>Buscar
      </Button>
    </Form>
  );
}

export default Search;
