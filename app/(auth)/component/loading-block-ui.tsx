import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

export default function LoadingBlockUI(props: { visible: boolean }) {
    return (
        props.visible ? <BlockUI blocked={true} fullScreen template={<ProgressSpinner />} /> : <></>
    );
}
