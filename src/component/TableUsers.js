import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/userService";
import ReactPaginate from "react-paginate";
import Modals from "./Modals";
import { Button } from "react-bootstrap";
import ModalsEdit from "./ModalsEdit";
const TableUsers = (props) => {
  const [showEditModals, setshowEditModals] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, settotalUsers] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [dataUsers, setDataUsers] = useState({});
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      // console.log(res);
      settotalUsers(res.total);
      settotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };
  console.log(listUsers);

  const handlePageClick = (event) => {
    console.log(">>>check event", event);
    getUsers(event.selected + 1);
  };
  const handleUpdateUsers = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUsers = (user) => {
    setshowEditModals(true);
    setDataUsers(user);
  };
  const handleClose = () => setshowEditModals(false);

  return (
    <>
      <div className=" d-flex align-items-center justify-content-between my-3">
        <b>List Users:</b>
        <Modals handleUpdateUsers={handleUpdateUsers} />
      </div>{" "}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <Button
                      variant="warning mx-3"
                      onClick={() => handleEditUsers(item)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalsEdit
        show={showEditModals}
        handleClose={handleClose}
        dataUsers={dataUsers}
      />
    </>
  );
};
export default TableUsers;
