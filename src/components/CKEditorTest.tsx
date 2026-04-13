"use client";

import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CKEditorTest = () => {
  return (
    <div>
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
        onReady={(editor: any) => {
          console.log("Editor is ready to use!", editor);
        }}
      />
    </div>
  );
};

export default CKEditorTest;
