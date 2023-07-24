import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/Cards.css"; // Import the CSS file with custom styles

interface Author {
  author: string;
  authorUrl: string;
}

interface Description {
  description: string;
  descriptionUrl: string;
}

interface Image {
  src: string;
}

interface UserData {
  title: string;
  url: string;
  data: {
    authors: Author[];
    descriptions: Description[];
    images: Image[];
  };
}

interface CardsProps {
  Datos: UserData[];
}

function Cards({ Datos }: CardsProps) {
  return (
    <div className="fondo2">
      <Container fluid>
        {/* Apply the custom class directly */}
        {Datos.map((item, index) => (
          <div key={index}>
            <h2 className="card__title">{item.title}</h2>
            <Row className="mt-2 card-container">
              {item.data.images.map((img, i) => (
                <Col key={i} sm={10} className="mb-4">
                  <Card className="card">
                    {/* Apply the custom class directly */}
                    <Card.Img
                      variant="top"
                      src={img.src}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Link
                        href={item.data.descriptions[i]?.descriptionUrl}>
                        <Card.Text className="card__description">
                          {item.data.descriptions[i]?.description}
                        </Card.Text>
                      </Card.Link>
                      <Card.Link href={item.data.authors[i].authorUrl}>
                        <Card.Subtitle className="mb-2 text-muted">
                          Por {item.data.authors[i]?.author}
                        </Card.Subtitle>
                      </Card.Link>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Link
                        className="button"
                        style={{ float: "right" }}
                        href="#">
                        <Card.Img
                          src="https://assets.elements.envato.com/apps/storefront/IconDownload-310761ef0d7e43a839a4.svg"
                          style={{
                            width: "2rem",
                            height: "2rem",
                            objectFit: "cover",
                          }}
                        />
                      </Card.Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Cards;
