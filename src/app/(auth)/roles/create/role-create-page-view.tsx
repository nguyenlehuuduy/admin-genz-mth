"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { postRole } from "@/app/api/services/roleService";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";

type PropsComponent = {

}

type FormikType = {
  nameRole: string;
  descriptionRole: string;
};

type Errorkeys = 'nameRole' | 'descriptionRole';

export default function CreateRolePageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      nameRole: '',
      descriptionRole: ''
    },
    validate: (data: FormikType) => {
      const errors: {
        nameRole?: string;
        descriptionRole?: string;
      } = {};
      if (!data.nameRole) {
        errors.nameRole = 'chưa nhập tên quyền';
      }
      if (!data.descriptionRole) {
        errors.descriptionRole = 'chưa nhập mô tả quyền này';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postRole({
        descriptionRole: data.descriptionRole,
        nameRole: data.nameRole
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới một quyền thành công");
          router.replace("/roles")
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
      <h5>Tạo quyền (Role)</h5>
      <div className="field">
        <label htmlFor="nameRole">Tên role</label>
        <InputText
          className={`${handleErrorValidate('nameRole') && 'p-invalid'}`}
          id="nameRole" type="text"
          value={formik.values.nameRole}
          onChange={(e) => formik.setFieldValue("nameRole", e.target.value)} />
        <div>{errorFormMessage('nameRole', handleErrorValidate('nameRole'))}</div>
      </div>
      <div className="field">
        <label htmlFor="desRole">Mô tả</label>
        <InputText
          className={`${handleErrorValidate('descriptionRole') && 'p-invalid'}`}
          id="desRole" type="text"
          value={formik.values.descriptionRole}
          onChange={(e) => formik.setFieldValue("descriptionRole", e.target.value)} />
        <div>{errorFormMessage('descriptionRole', handleErrorValidate('descriptionRole'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}