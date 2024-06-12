"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ListRolePageView from "./list-role-page-view";
import { RoleForCard, getAllRole } from "../../api/services/roleService";

async function getListRole(): Promise<Array<RoleForCard> | undefined> {
  try {
    return await getAllRole();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listRole] = await Promise.all([getListRole()]);
  return { listRole };
};

export default function RoleListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getRoleListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListRolePageView
      listRole={data.listRole ?? []}
    />
  );
}
