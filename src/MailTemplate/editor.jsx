import { React, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import "antd/dist/antd.css";
import "../MailTemplate/editor.css";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function MailEditor() {
  const [selectedFile, setSelectedFile] = useState();
  //const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
    //	setIsSelected(true);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      let text_data = editorRef.current.getContent();
      console.log(text_data);
    }
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
                >
                  <SendOutlined style={{ verticalAlign: 0 }} onClick={log} />{" "}
                  Send
                </Button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
}
