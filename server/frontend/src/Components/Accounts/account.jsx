import { React, useState, useEffect } from "react";
import http from "../../apiConfig";
import { connect,useDispatch} from 'react-redux';
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
import { CheckCircleTwoTone , CloseCircleTwoTone  } from "@ant-design/icons";
import { Empty,Spin,Select } from "antd";
import { Popconfirm, message, Badge } from "antd";
import { SetEmail } from "../../Store/action/action";

function Account() {
  const { Option } = Select;
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [add_user, setuser] = useState("");
    const [data, setData] = useState({});
    const [seldata, setseldata] = useState({});
    const [finaldata, setfinaldata] = useState();
    const {control, register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      if(data.email && data.password && data.user)
      {
        if(data.status === "true") 
        {
         dispatch(SetEmail(data));
         let logincredetials = localStorage.getItem('Login') ? JSON.parse(localStorage.getItem('Login')) : '';
        if(logincredetials !== undefined || logincredetials !== null)
        {
          localStorage.removeItem('Login');
          localStorage.setItem('Login', JSON.stringify(data));
        } 
        else localStorage.setItem('Login', JSON.stringify(data));
       } 
       else {
        localStorage.removeItem('Login');
       }
        onUpdate(data);
        setModalShow(false);
      }
     else {
       if(data.email === "")  data.email = seldata.email;
       if(data.password === "" )  data.password = seldata.password;
       if(data.status === "true") 
       {
        dispatch(SetEmail(data));
        let logincredetials = localStorage.getItem('Login') ? JSON.parse(localStorage.getItem('Login')) : '';
        if(logincredetials !== undefined || logincredetials !== null)
        {
          localStorage.removeItem('Login');
          localStorage.setItem('Login', JSON.stringify(data));
        } 
        else localStorage.setItem('Login', JSON.stringify(data));
       } 
       else {
        localStorage.removeItem('Login');
       }
       onUpdate(data);
       setModalShow(false);
     }
    };
  
    const onUpdate = (data) => {
        http.put('/account/update-account/' + seldata._id, data)
        .then((res) => {
          console.log('Account updated' + res);         
          getData();
          accountfilter(add_user);
          // refreshPage();
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
    // const Notifyerrormsg = (msg) => {
    //   message.error(msg);
    // };
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
              <Row>
              <Col lg={12} sm={12} className="mb-3">
                  <select {...register("status")}>
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                  </select>
                </Col>
              </Row>
              <Row>
              <Col lg={12} sm={12} className="mb-3">
              <select defaultValue="Select user" style={{ width: 175 }}  {...register("user")} >
                  <option value="Arsalan">Arsalan</option>
                  <option value="Salman">Salman</option>
                </select>
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
    function selectuser(value) {
      setuser(value);
    }
    function accountfilter(value) {
      setuser(value);
     let arr = [];
     data.data.forEach(element => {
       if(value !== "All") {
       if(element.user === value)
       {
         arr.push(element);
       }
       setfinaldata(arr);
      }
      else {
        arr.push(element);
        setfinaldata(arr);
      } 
     });
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
    const AddAccount = (event) => {
      event.preventDefault();
      const accountD = {
        email: email,
        password: pass,
        user:add_user,
        status: false,
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
               <Form onSubmit={AddAccount}>
                 <Row>
                   <Col lg={4} sm={12} className="mb-3">
                     <Form.Control
                       placeholder="Email Address."
                       type="email"
                       value={email}
                       onChange={(e) => setemail(e.target.value)}
                     />
                   </Col>
                   <Col lg={4} sm={12} className="mb-3">
                     <Form.Control
                       placeholder="Password."
                       type="text"
                       value={pass}
                       onChange={(e) => setpass(e.target.value)}
                     />
                   </Col>
                   <Col lg={2} sm={12}>
                  <Select defaultValue="Select user" style={{ width: 175 }} onChange={selectuser} >
                  <Option value="Arsalan">Arsalan</Option>
                  <Option value="Salman">Salman</Option>
                </Select>
                  </Col>
                   <Col lg={2} sm={12}  className="mx-auto">
                     <Button variant="primary" type="submit" style={{width: `150px`, borderRadius: `30px`}}>
                       Add
                     </Button>
                   </Col>
                 </Row>
               </Form>
             </Row>
             <Row>
             <h3>Filter:</h3>
             <Select defaultValue="Select user" style={{ width: 250,paddingRight: `0px` }}  onChange={accountfilter}>
                 <Option value="All">All</Option>
                  <Option value="Arsalan">Arsalan</Option>
                  <Option value="Salman">Salman</Option>
                </Select>
             </Row>
           </section>
           <section>
             {finaldata ? (
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
                     <th>Status</th>
                     <th>Account</th>
                     <th>Password</th>
                     <th>User</th>
                     <th>Edit</th>
                     <th>Delete</th>
                   </tr>
                 </thead>
                 <tbody>
                   {finaldata.map(function (item, i) {
                     return (
                       <tr key={i}>
                         <td>{i+1}</td>
                         <td >{item.status === false ? <CloseCircleTwoTone twoToneColor="#eb2f96"  /> : <CheckCircleTwoTone twoToneColor="#52c41a" />}</td>
                         <td>{item.email}</td>
                         <td>{item.password}</td>
                         <td>{item.user}</td>
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
                   control={control}
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
export default connect("","")(Account);
