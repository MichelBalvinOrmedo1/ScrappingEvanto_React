import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/Search.css";

interface SearchProps {
  withForm: string;
}

function Search({ withForm }: SearchProps) {
  return (
    <Form className={`d-flex form ${withForm}`}>
      <Form.Control
        type="search"
        placeholder="Busca tu recurso ..."
        className="me-2 form-control"
        aria-label="Search"
      />
      <Button type="submit" variant="outline-success" className="">
        <i className="bi bi-search"></i> Buscar
      </Button>
    </Form>
  );
}

export default Search;
