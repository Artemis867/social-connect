import React, {useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import UpdateStatusField from "./UpdateStatusField";
import StatusData from "./Status.interface";

function StatusList({statusList, onUpdateStatus, onDeleteStatus} : {statusList: StatusData[], onUpdateStatus: Function, onDeleteStatus: Function}) {

  const onProcessStatus = (statusId: number, updatedStatus: string) => {
    onUpdateStatus(statusId, updatedStatus);
  }

  const onProcessDeleteStatus = (statusId: number) => {
    onDeleteStatus(statusId);
  }

  useEffect(() => {
    console.log('[TRACK] statusList');
    console.log(statusList);
  }, [statusList]);

  return(
    <>
      { statusList && statusList.map((status: StatusData) => 
      (
        <Card className="m-2 p-2" key={status.statusId}>
          <UpdateStatusField id={status._id} status={status} onProcessStatus={onProcessStatus} onProcessDeleteStatus={onProcessDeleteStatus}/>
        </Card>
      ))}
    </>
  )
}

export default StatusList;