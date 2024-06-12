"use client";


import { notFound } from "next/navigation";
import useSWR from "swr";
import ListPermissionPostPageView from "./list-permission-post-page-view";
import { PermissionPostForCard, getAllPermissionPost } from "../../api/services/permissionPostService";

async function getListPermissionPost(): Promise<Array<PermissionPostForCard> | undefined> {
  try {
    return await getAllPermissionPost();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listPermissionPost] = await Promise.all([getListPermissionPost()]);
  return { listPermissionPost };
};

export default function PermissionPostListPageDateFetcher() {
  const { data, error, isLoading } = useSWR(
    "getPermissionPostListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListPermissionPostPageView
      listPermissionPost={data.listPermissionPost ?? []}
    />
  );
}
