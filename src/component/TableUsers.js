import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/userService";
import ReactPaginate from "react-paginate";
import Modals from "./Modals";
import { Button } from "react-bootstrap";
import ModalsEdit from "./ModalsEdit";
import _, { debounce } from "lodash";
import ModalsConfirm from "./ModalsConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowUpLong,
  faFileImport,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
const TableUsers = (props) => {
  const [showEditModals, setshowEditModals] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, settotalUsers] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [dataUsers, setDataUsers] = useState({});
  const [dataDeleteUsers, setdataDeleteUsers] = useState({});
  const [showDelete, setshowDelete] = useState(false);
  const [sortBy, setsortBy] = useState("asc");
  const [sortField, setsortField] = useState("id");
  const [keyword, setKeyword] = useState("");
  const [dataExports, setdataExports] = useState([]);
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
  // console.log(listUsers);

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
  const handleCloseDelete = () => {
    setshowDelete(false);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    //su dung lodash de tro 2 dia chi bo nho
    //let cloneListUser = [...listUsers];
    //su dung toan tu 3 dau cham copy lai listUsers
    let index = listUsers.findIndex((item) => item.id === user.id);
    // index = lay listuser loc tung phan tu va moi phan tu phai tim duoc cai id ma cta edit
    cloneListUser[index].first_name = user.first_name;
    // lay phan tu muon cap nhap . first_name = user.first_name
    console.log("Before =", listUsers, "After =", cloneListUser);
    //JS luu cung 1 dia chi bo nho mac du co 2 bien khac nhau => su dung lodash => 2 thang nay kh lquan nhau
    console.log(">>index =", index);

    setListUsers(cloneListUser);
  };
  const handleConfirmDelete = (user) => {
    setshowDelete(true);
    setdataDeleteUsers(user);
    console.log(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = listUsers.filter((item) => item.id !== user.id);
    //cta se loc tat ca nhung phan tu va cta chi lay nhung cai thang ma co id khac no se bo di cai id cua cta
    setListUsers(cloneListUser);
  };

  const handleSortBy = (sortBy, sortField) => {
    setsortBy(sortBy);
    setsortField(sortField);

    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    //lodash sortby asc
    setListUsers(cloneListUser);
    console.log(">>>check sort", sortBy, sortField);
  };
  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      //success
      console.log(">>>Check term", term);

      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      //filter by lodash
      //chay tung phan tu, cai dieu kien de lap la no se check tung phan tu trong cai mang, check phan tu nao co email ma email day co bao gom includes, bao gom keyword muon seach thi lay thang do,ham includes cua 1 chuoi string
      setListUsers(cloneListUser);
      // console.log(">>>Check filter", cloneListUser);
    } else {
      getUsers(1);
    }
  }, 1000);
  const handleSearchButton = () => {
    console.log(">>>Check Click");
  };

  const getUsersExport = (event, done) => {
    let result = [];

    if (listUsers && listUsers.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      listUsers.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });

      setdataExports(result);
      done();
    }
  };
  const handleImportCsv = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only file text/csv");
        return;
      }

      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "Email" ||
                rawCSV[0][1] !== "First Name" ||
                rawCSV[0][2] !== "Last Name"
              ) {
                toast.error("Wrong format header on CSV file");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                console.log("Finished:", result);
                setListUsers(result);
              }
            } else {
              toast.error("Wrong format on CSV file");
            }
          } else {
            toast.error("No found data on CSV file");
          }
        },
      });
    }
  };
  return (
    <>
      <div className=" d-flex justify-content-between my-3">
        <b>List Users:</b>
        <div>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faFileExport} className="mx-1" />
            <label htmlFor="test">Import</label>
            <input
              id="test"
              type="file"
              hidden
              onChange={(e) => {
                handleImportCsv(e);
              }}
            />
          </button>
          <CSVLink
            data={dataExports}
            filename={"LIST USERS"}
            className="btn btn-warning mx-3"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <FontAwesomeIcon icon={faFileImport} className="mx-1" />
            Export{" "}
          </CSVLink>
          <Modals handleUpdateUsers={handleUpdateUsers} />
        </div>
      </div>{" "}
      <div className="col-4 my-2 ">
        <div className="d-flex">
          <input
            className="form-control"
            placeholder="Search by email"
            onChange={handleSearch}
          />{" "}
          <Button className="mx-2" onClick={handleSearchButton}>
            Search
          </Button>
        </div>
      </div>{" "}
      <Table striped bordered hover variant="light" className="text-center ">
        <thead>
          <tr>
            <th>
              ID{" "}
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faArrowDownLong}
                onClick={() => handleSortBy("desc", "id")}
              />
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faArrowUpLong}
                onClick={() => handleSortBy("asc", "id")}
              />{" "}
            </th>
            <th>Email</th>
            <th>
              First Name{" "}
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faArrowDownLong}
                onClick={() => handleSortBy("desc", "first_name")}
              />
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faArrowUpLong}
                onClick={() => handleSortBy("asc", "first_name")}
              />{" "}
            </th>
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
                    <Button
                      variant="danger"
                      onClick={() => handleConfirmDelete(item)}
                    >
                      Delete
                    </Button>
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
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalsConfirm
        show={showDelete}
        handleClose={handleCloseDelete}
        dataDeleteUsers={dataDeleteUsers}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
     
    </>
  );
};
export default TableUsers;
