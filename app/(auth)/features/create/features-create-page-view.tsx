"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postFeature} from "@/app/api/services/featuresService";

type PropsComponent = {

}

type FormikType = {
    name: string;
    thumbnailFileName: string;
    url: string;
};

type Errorkeys = 'name' | 'thumbnailFileName' | 'url';

export default function CreateFeaturesPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
        name: '',
        thumbnailFileName: '',
        url: ''
    },
    validate: (data: FormikType) => {
      const errors: {
        name?: string;
        thumbnailFileName?: string;
        url?:string;
      } = {};
      if (!data.name) {
        errors.name = 'Chưa nhập tên tính năng';
      }
      if (!data.thumbnailFileName) {
        errors.thumbnailFileName = 'Chưa nhập tên của thumbnail file';
      }
      if (!data.url) {
        errors.url = 'Chưa nhập đường dẫn';
      }
      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postFeature({
        name: data.name,
        thumbnailFileName: data.thumbnailFileName,
        url: data.url,
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới một quyền thành công");
          router.replace("/features")
        }
      })
      setLoading(false);
    }
  });


  const handleErrorValidate = (key: Errorkeys) => {
    return !!(formik.touched[key] && formik.errors[key]);
  };

  const errorFormMessage = (key: Errorkeys, condition?: boolean, className?: string, style?: React.CSSProperties) => {
    return <div>{condition &&
      <Message
        severity="error"
        text={String(formik.errors[key])}
        className={className}
        style={style} />}</div>;
  };

  return (<div className="card p-fluid">
    <LoadingBlockUI visible={loading} />
    <form onSubmit={formik.handleSubmit}>
      <h5>Tạo tính năng mới </h5>
      <div className="field">
        <label htmlFor="nameRole">Tên tính năng</label>
        <InputText
          className={`${handleErrorValidate('name') && 'p-invalid'}`}
          id="name" type="text"
          value={formik.values.name}
          onChange={(e) => formik.setFieldValue("name", e.target.value)} />
        <div>{errorFormMessage('name', handleErrorValidate('name'))}</div>
      </div>
      <div className="field">
        <label htmlFor="desRole">Tên thumbnail file</label>
        <InputText
          className={`${handleErrorValidate('thumbnailFileName') && 'p-invalid'}`}
          id="desThFn" type="text"
          value={formik.values.thumbnailFileName}
          onChange={(e) => formik.setFieldValue("thumbnailFileName", e.target.value)} />
        <div>{errorFormMessage('thumbnailFileName', handleErrorValidate('thumbnailFileName'))}</div>
      </div>
      <div className="field">
        <label htmlFor="desRole">Đường dẫn</label>
        <InputText
          className={`${handleErrorValidate('url') && 'p-invalid'}`}
          id="url" type="text"
          value={formik.values.url}
          onChange={(e) => formik.setFieldValue("url", e.target.value)} />
        <div>{errorFormMessage('url', handleErrorValidate('url'))}</div>
      </div>
      <Button label="Tạo" severity="success" type="submit" />
    </form>
  </div>)
}