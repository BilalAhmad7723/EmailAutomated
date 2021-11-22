import { React, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import "antd/dist/antd.css";
import "../MailTemplate/editor.css";
import { SendOutlined } from "@ant-design/icons";
import { message } from 'antd';
import { useState } from "react";
import axios from "axios";

export default function MailEditor() {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState({});
  const [fileD, setfileD] = useState("");
  const editorRef = useRef(null);
  const ref = useRef();
  const changeHandler = (event) => {   
    event.target.files[0] && setIsFilePicked(true);
    if (isFilePicked) return;
    else fileread(event.target.files[0]);
  };

  const fileread = (file) => {
    var reader = new FileReader();
    var textFile = /text.*/;
    let filedata = "";
    if (file.type.match(textFile) ) {
      reader.onload = function (event) {
        filedata = event.target.result;
        setfileD(filedata);
      };
    } else {
      filedata =
        "It doesn't seem to be a text file!";
        message.error(filedata);
    }
    reader.readAsText(file);
  };

  const log = () => {
    let data = FinalData();
    axios
    .post("http://localhost:5050/email/emailSending", data)
    .then((res) => {
      console.log(res.data);
      Notifymsg(res.data.message);
      ref.current.value = "";
      editorRef.current.setContent("");
      setfileD("");
    });
  };

  const Notifymsg = (msg) => {
    message.success(msg);
  };
  const Notifyerrormsg = (msg) => {
    message.error(msg);
  };

  const FinalData = () => {
    let finalD = [];
    let text_data = editorRef.current.getContent();
    if(text_data !== ""){
      let mailFromFile = fileD.split(",");
      mailFromFile.forEach((element) => {
        let rad = RandomFunc(0, data.data.length - 1);
        finalD.push({
          id: element.replace(/(\r\n|\n|\r)/gm, ""),
          subject: data.data[rad].subject,
          mail: text_data,
        });
      });
      return finalD;
    }
    else{
      Notifyerrormsg("Please Write Some Maill in Text Area!!")
    }
  };

  function RandomFunc(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


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
  return (
    <Container fluid>
      <section>
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
                ref={ref}
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
                  menubar: "file edit insert view format table tools",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | searchreplace  ",
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
                  onClick={log}
                >
                  <SendOutlined style={{ verticalAlign: 0 }} /> Send
                </Button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
}
