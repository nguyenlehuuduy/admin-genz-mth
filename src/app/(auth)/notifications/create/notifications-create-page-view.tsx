"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";

import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { AccountSearchForCard, searchAccount } from "@/src/app/api/services/accountService";
import { postNotification } from "@/src/app/api/services/notificationService";
import { objectToQueryParams } from "@/src/app/ulti/ulti";
import { TypeNotificationForCard } from "@/src/app/api/services/typeNotificationService";

type FormikType = {
  account: Array<AccountSearchForCard>;
  postId: string;
  postShareId: string;
  commentId: string;
  reactionId: string;
  followerId: string;
  messageNotifications: string;
  typeNotificationId: string;

};

type Errorkeys = 'account' | 'postId' | 'postShareId' | 'commentId' | 'reactionId' | 'followerId' | 'messageNotifications' | 'typeNotificationId';

type PropsComponent = {
  listTypeNotification: Array<TypeNotificationForCard>
}

export default function CreateNotificationPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [accountFilter, setAccountFilter] = useState<Array<AccountSearchForCard>>(
    []
  );
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      account: [],
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
        account?: string;
        messageNotifications?: string;
        typeNotificationId?: string;
      } = {};
      if (!data.account?.length) {
        errors.account = 'chưa chọn thông báo đến cho tài khoản';
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
        accountId: data.account.map(item => item.id),
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
          router.replace("/notifications")
        }
      })
      setLoading(false);
    }
  });

  const onSearchAccount = async (key: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      const query = {
        keyword: key.query
      }
      searchAccount(objectToQueryParams(query)).then((rs) => {
        if (rs) {
          setAccountFilter(rs)
        }
      }).catch((e) => {
        console.error(e)
      });
    }, 800)
  };

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
        <label htmlFor="accountId">chọn tài khoản thông báo tới</label>
        <AutoComplete
          id="autocomplete"
          value={formik.values.account}
          onChange={(e) => formik.setFieldValue("account", e.target.value)}
          suggestions={accountFilter}
          completeMethod={(e) => onSearchAccount(e)}
          field="full_name"
          multiple
          showEmptyMessage
        />
        <div>{errorFormMessage('account', handleErrorValidate('account'))}</div>
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
        <Dropdown
          options={props.listTypeNotification}
          value={formik.values.typeNotificationId}
          onChange={(e) => formik.setFieldValue("typeNotificationId", e.value)}
          optionLabel="type_name"
          optionValue="id"
        />
        <div>{errorFormMessage('typeNotificationId', handleErrorValidate('typeNotificationId'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}
