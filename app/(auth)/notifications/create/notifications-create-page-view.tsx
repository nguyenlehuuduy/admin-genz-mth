"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";

import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postNotification } from "@/app/api/services/notificationService";

type PropsComponent = {

}

type FormikType = {
    accountId: string;
    postId: string;
    postShareId: string;
    commentId: string;
    reactionId: string;
    followerId: string;
    messageNotifications: string;
    typeNotificationId: string;

};

type Errorkeys = 'accountId' | 'postId'|'postShareId'|'commentId'|'reactionId'|'followerId'|'messageNotifications'|'typeNotificationId';

export default function CreateNotificationPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
        accountId: '',
        messageNotifications: '',
        postId: '',
        postShareId: '',
        commentId: '',
        reactionId: '',
        followerId: '',
        typeNotificationId: '',

    },
    validate: (data: FormikType) => {
      const errors: {
        accountId?: string;
        messageNotifications?: string;
        typeNotificationId?: string;
      } = {};
      if (!data.accountId) {
        errors.accountId = 'chưa nhập ID account';
      }
      if (!data.messageNotifications) {
        errors.messageNotifications = 'chưa nhập mô tả thông báo này';
      }
      if (!data.typeNotificationId) {
        errors.typeNotificationId = 'chưa nhập id loại quyền này';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postNotification({
          accountId: data.accountId,
          messageNotifications: data.messageNotifications,
          postId: data.postId,
          postShareId: data.postShareId,
          commentId: data.commentId,
          reactionId: data.reactionId,
          followerId: data.followerId,
          typeNotificationId: data.typeNotificationId,
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới một thông báo thành công");
          router.push("/notifications")
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
      <h5>Tạo thông báo (Notification)</h5>
      <div className="field">
        <label htmlFor="accountId">ID account</label>
        <InputText
          className={`${handleErrorValidate('accountId') && 'p-invalid'}`}
          id="accountId" type="text"
          value={formik.values.accountId}
          onChange={(e) => formik.setFieldValue("accountId", e.target.value)} />
        <div>{errorFormMessage('accountId', handleErrorValidate('accountId'))}</div>
      </div>
      <div className="field">
        <label htmlFor="messageNotifications">Mô tả</label>
        <InputText
          className={`${handleErrorValidate('messageNotifications') && 'p-invalid'}`}
          id="messageNotifications" type="text"
          value={formik.values.messageNotifications}
          onChange={(e) => formik.setFieldValue("messageNotifications", e.target.value)} />
        <div>{errorFormMessage('messageNotifications', handleErrorValidate('messageNotifications'))}</div>
      </div>
      <div className="field">
        <label htmlFor="typeNotificationId">ID loại thông báo</label>
        <InputText
          className={`${handleErrorValidate('typeNotificationId') && 'p-invalid'}`}
          id="typeNotificationId" type="text"
          value={formik.values.typeNotificationId}
          onChange={(e) => formik.setFieldValue("typeNotificationId", e.target.value)} />
        <div>{errorFormMessage('typeNotificationId', handleErrorValidate('typeNotificationId'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}
