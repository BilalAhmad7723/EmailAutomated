import { React, useState, useEffect } from "react";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { Empty } from "antd";
import { Popconfirm, message,Badge } from "antd";
import axios from "axios";


function Subject() {
  const [modalShow, setModalShow] = useState(false);
  const [subject, setsubject] = useState("");
  const [subjectno, setsubjectno] = useState("");
  const [data, setData] = useState({});
  const [seldata, setseldata] = useState({});
  const [UpdateSub, setUpdateSub] = useState("")
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const headers = { "Content-Type": "application/json" };
    const endpoint = "http://localhost:5050/api";
    axios
      .get(endpoint, { headers })
      .then((response) => {
        setData({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const refreshPage = () => {
    window.location.reload(false);
  };
  const update = (props) => {
   props.onHide();
  }
  function EditModal(props) {
    return (
      
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Badge.Ribbon text={seldata.subject}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Subject</Modal.Title>
        </Modal.Header>
        </Badge.Ribbon>
        <Modal.Body>
        <Form.Control placeholder="Subject" value={UpdateSub} onChange={(e) => setUpdateSub(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => update(props)}>Update</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      
    );
  }
  function confirm(e) {
    axios
      .delete("http://localhost:5050/api/delete-subject/" + e._id)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    message.success("Delete Successfulyy!!!");
  }

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }
  const AddSubject = (event) => {
    event.preventDefault();
    const subjectObject = {
      subjectid: subjectno,
      subject: subject,
    };
    axios
      .post("http://localhost:5050/api/create-subject", subjectObject)
      .then((res) => {
        console.log(res.data);
      });
    setsubject(" ");
    setsubjectno(" ");
    refreshPage();
  };

  return (
    <Container fluid>
      <section>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <section className="mb-5">
            <Row>
              <h3>Add Subject:</h3>
            </Row>
            <Row>
              <Form onSubmit={AddSubject}>
                <Row>
                  <Col lg={5} sm={12} className="mb-3">
                    <Form.Control
                      placeholder="Subject No."
                      type="Number"
                      value={subjectno}
                      onChange={(e) => setsubjectno(e.target.value)}
                    />
                  </Col>
                  <Col lg={5} sm={12} className="mb-3">
                    <Form.Control
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setsubject(e.target.value)}
                    />
                  </Col>
                  <Col lg={2} sm={12}>
                    <Button variant="primary" type="submit">
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </section>
          <section>
            {data.data ? (
              <Table
                striped
                table-success="true"
                bordered
                hover
                size="sm"
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map(function (item, i) {
                    return (
                      <tr key={i}>
                        <td>{item.subjectid}</td>
                        <td>{item.subject}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                              setModalShow(true);
                              setseldata(item);
                            } }
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirm(item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button variant="outline-danger" size="sm">
                              Delete
                            </Button>
                          </Popconfirm>
                        </td>
                        <EditModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Empty />
            )}
          </section>
        </div>
      </section>
    </Container>
  );
}

export default Subject;
