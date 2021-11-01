import { React, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import SuccessPage from "../MailTemplate/success";
import ErrorPage from "../MailTemplate/error";
import { Layout, Menu } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "../MailTemplate/editor.css";

import {
  DesktopOutlined,
  PieChartOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Content, Footer, Sider } = Layout;

export default function MailEditor() {
  const [Collapse, setCollapse] = useState({
    collapsed: true,
  });
  const [selectedFile, setSelectedFile] = useState();
  //const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
    //	setIsSelected(true);
  };
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapse({ collapsed });
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      let text_data = editorRef.current.getContent();
      console.log(text_data);
    }
  };
  const { collapsed } = Collapse;
  return (
    <Container fluid>
      <section>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Dashboard <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Email <Link to="/Email" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: "5px 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <section>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      AttachFile:
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={changeHandler}
                    />
                  </div>
                </section>
                <section>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Email:
                    </label>
                    <Editor
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue=""
                      apiKey="211cd8ujzjbfa61ki3rmmxtl6qmj5sshibpsct3d2xj5iwdu"
                      init={{
                        height: 400,
                        max_width: 150,
                        menubar: true,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | searchreplace |help ",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-grid gap-2 col-4 mx-auto">
                      <Button
                        variant="primary"
                        className="form-control btn btn-primary submit px-3"
                        type="submit"
                        style={{ borderRadius: `10px` }}
                      >
                        <SendOutlined
                          style={{ verticalAlign: 0 }}
                          onClick={log}
                        />{" "}
                        Send
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
              <Switch>
                <Route path="/success" component={SuccessPage} />
                <Route path="/error" component={ErrorPage} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>Company Name</Footer>
          </Layout>
        </Layout>
      </section>
    </Container>
  );
}
