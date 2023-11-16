import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Drawer, Popconfirm } from "antd";
import { format } from "date-fns";
import {
  checkEventDrawer,
  checkNotesDrawer,
  getSelectedEvent,
} from "src/store/slices/agendaSlice/selector";
import NotesDrawer from "../NotesDrawer";
import { DeleteEventsApi } from "src/store/slices/agendaSlice/apis";
import DeleteButton from "src/components/buttons/DeleteButton";
import EditButton from "src/components/buttons/EditButton";
import {
  closeEventDrawer,
  setSelectedEvent,
  showNotesDrawer,
  showSalesDrawer,
} from "src/store/slices/agendaSlice";
import { toast } from "react-toastify";
import UserList from "../UserList";

const SalesCallDetailsDrawer = () => {
  const dispatch = useDispatch();
  const isEventDrawer = useSelector(checkEventDrawer);
  const isNotesDrawer = useSelector(checkNotesDrawer);
  const selectedEvent = useSelector(getSelectedEvent);

  const handleNotesDrawer = () => {
    dispatch(showNotesDrawer());
  };

  const handleConfirmDelete = (record) => {
    try {
      dispatch(DeleteEventsApi(record?._id));
      dispatch(closeEventDrawer());
      toast.success("Record Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const onClose = () => {
    dispatch(closeEventDrawer());
    dispatch(setSelectedEvent(null));
  };

  const handleUpdate = () => {
    dispatch(showSalesDrawer());
  };

  return (
    <div className="mb-1">
      <Drawer
        title="Call information"
        placement="right"
        closable={true}
        onClose={onClose}
        open={isEventDrawer}
        width={selectedEvent?.notes ? "70%" : "50%"}
        extra={
          <div className="d-flex w-100 gap-1 justify-content-end mb-1">
            <EditButton onClick={handleUpdate} />
            <Popconfirm
              title="Are you sure to delete this Call?"
              onConfirm={() => handleConfirmDelete(selectedEvent)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteButton>Delete</DeleteButton>
            </Popconfirm>
          </div>
        }
      >
        {selectedEvent?.start && selectedEvent?.end && (
          <div className="mb-1"  >
            <div style={{ display: "flex", justifyContent: 'space-between', gap: "20px", marginBottom: '20px' }}>
              <Button type="primary" onClick={handleNotesDrawer}>
                {selectedEvent?.notes ? "Update Notes" : "Add Notes"}
              </Button>

              <div className="d-flex justify-content-center align-items-center gap-2">
                <span>Assign To</span>
                <UserList selectedEvent={selectedEvent} />
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
              <p>
                <strong> Date:</strong> {format(new Date(selectedEvent?.start), "dd-MM-yyyy")}
              </p>
              <p>
                <strong> Time:</strong> {format(new Date(selectedEvent?.start), "p")} -{" "}
                {format(new Date(selectedEvent?.end), "p")}
              </p>
            </div>
          </div>
        )}

        {selectedEvent && selectedEvent?.start && selectedEvent?.end && (
          <div className="d-flex  gap-2">
            <Card className="w-100 shadow m-3 ">
              <table className="table">
                <tbody>
                  <tr>
                    <th className="fw-bold">Company Name :</th>
                    <td>{selectedEvent?.apply?.companyName}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call With :</th>
                    <td>{selectedEvent?.callWith}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Job Title :</th>
                    <td>{selectedEvent?.apply?.positionToApply}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call Duration :</th>
                    <td>{selectedEvent?.callDuration} seconds</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Number of Guests :</th>
                    <td>{selectedEvent?.numOfGuests}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call Type :</th>
                    <td>{selectedEvent?.callType}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call Mode :</th>
                    <td>{selectedEvent?.callMode}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Apply Platform :</th>
                    <td>{selectedEvent?.apply?.platform}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call Platform :</th>
                    <td>{selectedEvent?.callPlatform}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Mail Link :</th>
                    <td>
                      <a href={selectedEvent?.mailLink}>Mail</a>
                    </td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call Link :</th>
                    <td>
                      <a href={selectedEvent?.callLink}>Call</a>
                    </td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Apply Link :</th>
                    <td>
                      <a href={selectedEvent?.apply?.link}>Apply Link</a>
                    </td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Company Information :</th>
                    <td>{selectedEvent?.companyInformation}</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {selectedEvent?.notes &&
              selectedEvent?.notes !== null &&
              selectedEvent?.notes !== "" && (
                <Card className="w-100" title="Notes" style={{ maxHeight: "500px", overflow: "auto" }}>
                  <div dangerouslySetInnerHTML={{ __html: selectedEvent?.notes }} />
                </Card>
              )}
          </div>
        )}

        {selectedEvent && selectedEvent?.start && selectedEvent?.end && (
          <div className="w-100  text-end">
            <div className="mb-1">
              <span className="fw-bold">Profile:</span>
              <span className="m-3">{selectedEvent?.apply?.profile?.name}</span>
            </div>
            <div className="mb-1">
              <span className="fw-bold">Created By:</span>
              <span className="m-3">
                {selectedEvent?.createdBy?.first_name} {selectedEvent?.createdBy?.last_name}
              </span>
            </div>
            <div className="mb-1 ">
              <span className="fw-bold">Created Date:</span>
              <span className="m-3">
                {selectedEvent?.createdAt ? new Date(selectedEvent?.createdAt).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
        )}
      </Drawer>

      <NotesDrawer
        isDrawerOpen={isNotesDrawer}
        handleDrawerClose={handleNotesDrawer}
      />
    </div>
  );
};

export default SalesCallDetailsDrawer;
