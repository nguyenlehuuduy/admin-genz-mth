"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { TypeMessageForCard, getAllTypeMessage } from "../../api/services/typeMessageService";
import ListTypeMessagePageView from "./list-type-message-page-view";


async function getListTypeMessage(): Promise<Array<TypeMessageForCard> | undefined> {
  try {
    return await getAllTypeMessage();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listTypemessage] = await Promise.all([getListTypeMessage()]);
  return { listTypemessage };
};

export default function TypeMessageListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getTypeMessageListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListTypeMessagePageView
      listTypemessage={data.listTypemessage ?? []}
    />
  );
}
