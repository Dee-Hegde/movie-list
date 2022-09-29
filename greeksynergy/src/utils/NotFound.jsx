import React from "react";
import { Result, Row } from "antd";

const NotFound = (props) => {
  const { subTitle = "Sorry, the page you visited does not exist." } = props;

  return (
    <Row className="fh" justify="center" align="middle">
      <Result status="404" title="404" subTitle={subTitle} />
    </Row>
  );
};

export default React.memo(NotFound);
