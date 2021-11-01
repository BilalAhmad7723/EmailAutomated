import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Result, Button } from "antd";

export default function SuccessPage() {

    const Middle = {
        padding: `13em 0`
      };
  return (
    <Container fluid>
        <div style={Middle}>
        <Result
        status="success"
        title="Successfully Send!"
        subTitle="Great Sol."
        extra={[
          <Button type="primary" key="console">
            Go Logout
          </Button>,
          <Button key="Back">Back Again</Button>,
        ]}
      />
        </div>
    
    </Container>
  );
}
