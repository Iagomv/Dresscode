import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Gallery = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetch('/content/gallery.json')
      .then((res) => res.json())
      .then((data) => setContent(data))
  }, [])

  if (!content) return <div className="text-center mt-5">Cargando galería...</div>

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">{content.title}</h1>
      <Row>
        {content.images.map((image, idx) => (
          <Col key={idx} sm={6} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={image.src} alt={image.alt} />
              <Card.Body>
                <Card.Text className="text-center">{image.alt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Gallery
