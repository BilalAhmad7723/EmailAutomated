import { React, useState, useEffect } from "react";
import http from "../../apiConfig";
import { useForm } from "react-hook-form";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { Empty,Spin } from "antd";
import { Popconfirm, message, Badge } from "antd";

function Subject() {
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [subject, setsubject] = useState("");
  const [subjectno, setsubjectno] = useState("");
  const [data, setData] = useState({});
  const [seldata, setseldata] = useState({});
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if(data.subject && data.subjectid )
    {
      onUpdate(data);
      setModalShow(false);
    }
   else {
    setModalShow(false);
    Notifyerrormsg("Please Enter Data To Update!!!");
   }
  };

  const onUpdate = (data) => {
      http.put('/api/update-subject/' + seldata._id, data)
      .then((res) => {
        console.log('Subject updated' + res)
        getData();
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setloading(true);
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/api";
    http.get(endpoint, { headers })
      .then((response) => {
        setloading(false);
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
  const Notifyerrormsg = (msg) => {
    message.error(msg);
  };
  function EditModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="EditModalTitle"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Badge.Ribbon text={seldata.subjectid + ":" + seldata.subject}>
          <Modal.Header>
            <Modal.Title id="EditModal">Subject</Modal.Title>
          </Modal.Header>
        </Badge.Ribbon>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col lg={12} sm={12} className="mb-3">
                <Form.Control
                  placeholder="Subject No."
                  type="Number"
                  {...register("subjectid")}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} className="mb-3">
                <Form.Control placeholder="Subject"  {...register("subject")} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Update</Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
  function confirm(e) {
    http
      .delete("/api/delete-subject/" + e._id)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    message.success("Delete Successfulyy!!!");
  }

  function cancel(e) {
    message.error("Subject not Deleted!");
  }
  const AddSubject = (event) => {
    event.preventDefault();
    const subjectObject = {
      subjectid: subjectno,
      subject: subject,
    };
    http
      .post("/api/create-subject", subjectObject)
      .then((res) => {
        console.log(res.data);
      });
    setsubject(" ");
    setsubjectno(" ");
    refreshPage();
  };
  const TStyle = {
    textAlign: `center`, 
    verticalAlign: `middle`,
    cursor:`pointer`
    }
  return (
    <Container fluid>
       <Spin spinning={loading}  tip="Loading Subjects..." size="large">
      <section>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <section className="mb-5">
            <Row>
              <h3>Subject:</h3>
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
                style={TStyle}
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
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Popconfirm
                            title="Are you sure to delete this Subject?"
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
                      </tr>
                    );
                  })}
                </tbody>
                <EditModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </Table>
            ) : (
              <Empty />
            )}
          </section>
        </div>
      </section>
      </Spin>
    </Container>
  );
}

export default Subject;
