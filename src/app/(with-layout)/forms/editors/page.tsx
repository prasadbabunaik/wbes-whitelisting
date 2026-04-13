"use client";
import React from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
  Form,
  Container,
} from "reactstrap";
import UiContent from "@/components/Common/UiContent";

import dynamic from "next/dynamic";
// Remove the CKEditorProps import
const CKEditor = dynamic<any>(
  () => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor),
  { ssr: false }
);
// Import ClassicEditor statically
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import BreadCrumb from "@/components/Common/BreadCrumb";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

// Define minimal editor interface
interface Editor {
  getData(): string;
}

const FormEditor = () => {
  const { quillRef } = useQuill();

  document.title =
    "Editors | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Editors" pageTitle="Forms" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0">Ckeditor Classic Editor</h4>
                </CardHeader>
                <CardBody>
                  <Form method="post">
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        licenseKey: "GPL",
                        removePlugins: [
                          "CloudServices",
                          "EasyImage",
                          "CKBox",
                          "CKBoxUploadAdapter",
                          "CKBoxUtils",
                        ],
                      }}
                      data="<p>Hello from CKEditor 5!</p>"
                      onReady={(editor: Editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      // onChange={(event, editor) => {
                      //   const data = editor.getData();
                      // }}
                    />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col lg={12}>
              <div className="justify-content-between d-flex align-items-center mb-3">
                <h5 className="mb-0 pb-1 text-decoration-underline">
                  Quilljs Editor
                </h5>
              </div>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Snow Editor</h4>
                </CardHeader>
                <CardBody>
                  <div className="snow-editor" style={{ height: 300 }}>
                    <div ref={quillRef} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormEditor;
