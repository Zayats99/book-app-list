import { FC, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { useApi } from "../service/hooks/useApi";
import { IBook } from "./Dashboard";

export const AddBook: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDataById, createData, updateData } = useApi(BASE_URL);

  const initialData = {
    title: "",
    author: "",
    category: "",
    isbm: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [isShowMessage, setIsShowMessage] = useState(false);

  const [errors, setErrors] = useState({
    title: false,
    author: false,
    category: false,
    isbm: false,
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (id) {
      getDataById(id).then((res) => setFormData(res));
    } else {
      setFormData(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isShowMessage) {
      setTimeout(() => {
        setIsShowMessage(false);
      }, 1500);
    }
  }, [isShowMessage]);

  useEffect(() => {
    // console.log(errors)
    setIsValid(Object.values(errors).every((item) =>{
    console.log(item)
      return item === false
    } ));
  }, [errors]);

  const handleChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: false });
  };

  const handleCreateNewBook = () => {
    createData<Omit<IBook, "id">>(formData).then(() => {
      setFormData(initialData);
      setIsShowMessage(true);
    });
  };

  const handleUpdateBook = (id: string) => {
    updateData<Omit<IBook, "id">>(id, formData).then(() =>
      setIsShowMessage(true)
    );
  };

  const validate = () => {
    Object.entries(formData).forEach((item) => {
      if (item[1].length === 0) {
        setErrors((prev) => ({ ...prev, [item[0]]: true }));
      }
    });
  };
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    validate();
    console.log(isValid)
if(isValid) {
  id ? handleUpdateBook(id) : handleCreateNewBook();
} 
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Book title</Form.Label>
              <Form.Control
                isInvalid={errors.title}
                name="title"
                type="text"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                isInvalid={errors.author}
                name="author"
                type="text"
                placeholder="Enter the author of the book"
                value={formData.author}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                isInvalid={errors.category}
                value={formData.category}
                name="category"
                onChange={handleChange}
              >
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                isInvalid={errors.isbm}
                name="isbm"
                type="text"
                placeholder="International Standard Book Number"
                value={formData.isbm}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          {isShowMessage && (
            <Alert variant="success">This is a alert—check it out!</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};
