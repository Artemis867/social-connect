
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Row, Col, Card } from "react-bootstrap";
import StatusInput from "../compoents/profile/StatusInput";
import StatusList from "../compoents/profile/StatusList";
import axios from "axios";
import StatusData from "../compoents/profile/Status.interface";
import { useDispatch } from "react-redux";
import { showToast } from "../actions";


function Profile() {
  const [statusList, setStatusList] = useState<StatusData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('initial call');

    // dispatch(
    //   showToast({
    //     content: 'test'
    //   })
    // );

    let isMounted = true;
    const fetchStatusList = async () => {
      if(!isMounted) return;
      const res = await axios.get("http://localhost:4000/status/all");
      if(isMounted) setStatusList(res.data);
    };
    
    fetchStatusList();
    return () => {
      isMounted = false;
    }
  }, []);

  const onSetStatus = async (statusDescription: string) => {
    const token = localStorage.getItem('token');
    const statusId = Math.floor(Math.random() * 100);

    const result = axios.post("http://localhost:4000/status",{statusId,statusContent: statusDescription}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const submittedData = {
      statusId,
      statusContent: statusDescription,
    };

    setStatusList([
      submittedData,
      ...statusList,
    ]);
  }

  // UPDATING RAW STATE
  const onUpdateStatus = (statusId: number, updatedStatusDescription: string | null) => {
    const statusListCopy = [...statusList];
    const found = statusListCopy
    .find(statusData => statusData.statusId == statusId)
    
    if(found) found.statusContent = updatedStatusDescription;
    setStatusList(statusListCopy);

    dispatch(
      showToast({
        content: "status updated successfully."
      })
    );

  }

  const onDeleteStatus = (statusId: number) => {
    const statusListCopy = [...statusList];
    const deletedStatus = statusListCopy.filter(status => status.statusId != statusId);
    setStatusList(deletedStatus);
    dispatch(
      showToast({
        content: "status has already been deleted."
      })
    );
  }

  return (
    <>
      <Container fluid="lg" style={{
        padding: "20px"
      }}>
        <Row>
          <Col lg="4">
            <Card>picture</Card>
          </Col>
          <Col lg="8">
            <Container fluid="lg">
              <StatusInput
                onSetStatus={onSetStatus}/>
              <StatusList
                onUpdateStatus={onUpdateStatus}
                onDeleteStatus={onDeleteStatus}
                statusList={statusList}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Profile;
