import { React, useState } from "react";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import "../Subject/subject.css";
import { Popconfirm, message } from "antd";
function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}
function EditModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control placeholder="Subject" value="Leave" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Subject() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Container className="mt-3">
      <section className="mb-5">
        <Form>
          <Row>
            <Col>
              <Form.Control placeholder="Subject" />
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </section>
      <section>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Leave</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setModalShow(true)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button variant="outline-danger" size="sm">
                    Delete
                  </Button>
                </Popconfirm>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>New App Introducion</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setModalShow(true)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button variant="outline-danger" size="sm">
                    Delete
                  </Button>
                </Popconfirm>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setModalShow(true)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button variant="outline-danger" size="sm">
                    Delete
                  </Button>
                </Popconfirm>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Free Trial</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setModalShow(true)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button variant="outline-danger" size="sm">
                    Delete
                  </Button>
                </Popconfirm>
              </td>
            </tr>
          </tbody>
        </Table>
      </section>
      <EditModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default Subject;
