import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Table } from "./components/Table";
import { Pagination } from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectAllUserCheckStatus, setSelectAllUserCheckStatus] = useState(false);
  const [copySearchData, setCopySearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const addUserSelectEditFalse = response.data.map((item) => {
        item.selected = false;
        item.edit = false;
        return item;
      });
      setData(addUserSelectEditFalse);
      setCopySearchData(addUserSelectEditFalse);
    };

    fetchData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPosts = data.slice(indexOfFirstUser, indexOfLastUser);
  const checkEveryUser = currentPosts.every((item) => item.selected === true);

  const selectAllUser = (e) => {
    if (e.target.checked) {
      for (let i = indexOfFirstUser; i < indexOfLastUser; i++) {
        data[i].selected = true;
      }

      setData([...data]);
      setSelectAllUserCheckStatus(true);
    } else {
      for (let i = indexOfFirstUser; i < indexOfLastUser; i++) {
        data[i].selected = false;
      }

      setData([...data]);
      setSelectAllUserCheckStatus(false);
    }
  };

  const deleteSelectedUser = () => {
    let deletedData = data.filter((item) => item.selected !== true);
    setData([...deletedData]);
  };

  useEffect(() => {
    if (checkEveryUser) {
      setSelectAllUserCheckStatus(true);
    } else {
      setSelectAllUserCheckStatus(false);
    }
  }, [currentPage, data, checkEveryUser]);

  const searchUser = (searchText) => {
    //Jump to first page for search
    setCurrentPage(1);

    if (searchText !== "") {
      let result = copySearchData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchText)
        )
      );
      setData([...result]);
    } else {
      setData([...copySearchData]);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <input
          className="search-box"
          placeholder="Search by name, email or role"
          onChange={(e) => searchUser(e.target.value.toLowerCase())}
        />
        <Table
          currentPosts={currentPosts}
          data={data}
          setData={setData}
          indexOfFirstUser={indexOfFirstUser}
          selectAllUser={selectAllUser}
          selectAllUserCheckStatus={selectAllUserCheckStatus}
        />
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={data.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          deleteSelectedUser={deleteSelectedUser}
        />
      </div>
    </div>
  );
}

export default App;
