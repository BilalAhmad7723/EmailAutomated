import { React, useState, useEffect } from "react";
import http from "../apiConfig";
import { useForm } from "react-hook-form";
import Switch from "react-switch";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { CheckCircleTwoTone , CloseCircleTwoTone  } from "@ant-design/icons";
import { Empty,Spin } from "antd";
import { Popconfirm, message, Badge } from "antd";

function Account() {
    const [loading, setloading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checked, setChecked] = useState(false);
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [data, setData] = useState({});
    const [seldata, setseldata] = useState({});
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
      if(data.email && data.password )
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
        http.put('/account/update-account/' + seldata._id, data)
        .then((res) => {
          console.log('Account updated' + res)
          refreshPage();
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
      const endpoint = "/account/get-account";
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
          <Badge.Ribbon text={seldata.email + ":" + seldata.password}>
            <Modal.Header>
              <Modal.Title id="EditModal">Account Detail</Modal.Title>
            </Modal.Header>
          </Badge.Ribbon>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <Row>
                <Col lg={12} sm={12} className="mb-3">
                  <Form.Control
                    placeholder="Email Address."
                    type="text"
                    {...register("email")}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={12} className="mb-3">
                  <Form.Control placeholder="Password."  {...register("password")} />
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
        .delete("/account/delete-account/" + e._id)
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
      const accountD = {
        email: email,
        password: pass,
        status: 'false',
      };
      console.log(accountD)
      http
        .post("/account/add-account", accountD)
        .then((res) => {
          console.log(res.data);
        });
      setpass(" ");
      setemail(" ");
      refreshPage();
    };

    const TStyle = {
    textAlign: `center`, 
    verticalAlign: `middle`,
    cursor:`pointer`
    }


    const handleChange = nextChecked => {
      setChecked(nextChecked);
    };
  
    return (
        <Container fluid>
        <Spin spinning={loading}  tip="Loading Accounts..." size="large">
       <section>
         <div
           className="site-layout-background"
           style={{ padding: 24, minHeight: 360 }}
         >
           <section className="mb-5">
             <Row>
               <h3>Accounts:</h3>
             </Row>
             <Row>
               <Form onSubmit={AddSubject}>
                 <Row>
                   <Col lg={5} sm={12} className="mb-3">
                     <Form.Control
                       placeholder="Enter Email Address."
                       type="email"
                       value={email}
                       onChange={(e) => setemail(e.target.value)}
                     />
                   </Col>
                   <Col lg={5} sm={12} className="mb-3">
                     <Form.Control
                       placeholder="Enter Password."
                       type="text"
                       value={pass}
                       onChange={(e) => setpass(e.target.value)}
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
                     <th>Status</th>
                     <th>Account</th>
                     <th>Password</th>
                     <th>Set</th>
                     <th>Edit</th>
                     <th>Delete</th>
                   </tr>
                 </thead>
                 <tbody>
                   {data.data.map(function (item, i) {
                     return (
                       <tr key={i}>
                         <td >{item.status === 'false' ? <CloseCircleTwoTone twoToneColor="#eb2f96"  /> : <CheckCircleTwoTone twoToneColor="#52c41a" />}</td>
                         <td>{item.email}</td>
                         <td>{item.password}</td>
                         <td>
                         <Switch onChange={handleChange} checked={checked} height={20} width={48} className="react-switch" />
                         </td>
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
                             title="Are you sure to delete this Account?"
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
    )
}

export default Account
