import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export const Table = ({currentPosts, data, setData, indexOfFirstUser, selectAllUser, selectAllUserCheckStatus}) => {
  const [editSelected, setEditSelected] = useState(false);
  const [updateUser, setUpdateUser] = useState({})
  
  const deleteUser = (index) => {
    setData((prevState) => (
        prevState.filter((_, i) => i !== index)
    ))
  }

  const editSelectedUserTrue = (index) => {
    data[index].edit = true;
    setData([...data]);
    setEditSelected(true);
  }

  const editSelectedUserFalse = (index) => {
    data[index].edit = false;
    setData([...data]);
    setEditSelected(false);
  }

  const handleUpdateUser = (e) => {
    let value = e.target.value;
    let name = e.target.name
    setUpdateUser((prevstate) => ({
        ...prevstate,
        [name]: value
    }))
  }

  const submitUpdateUser = (index) => {
      if(updateUser.name){
        data[index].name = updateUser.name;
      }

      if(updateUser.email){
        data[index].email = updateUser.email;
      }

      if(updateUser.role){
        data[index].role = updateUser.role;
      }

      data[index].edit = false;
      setData([...data]);
      setEditSelected(false);
  }

  const singleUserSelect = (e, index) => {
      if(e.target.checked){
        data[index].selected = true;
        setData([...data]);
      } else{
        data[index].selected = false;
        setData([...data]);
      }
  }

  return (
    <>
    <table>
        <thead>
            <tr>
                <th><input type="checkbox" onChange={(e) => selectAllUser(e)} checked={selectAllUserCheckStatus}/></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
            {data.length === 0 && 
                <tr>
                    <td colSpan="5">
                        <p style={{textAlign: 'center', padding: '5rem 0', fontWeight: 'bold'}}>No Users Found</p>
                    </td>
                </tr>
            }
            {currentPosts.map((item, index) => (
            <tr key={item.id}>
                <td><input type="checkbox" onChange={(e) => singleUserSelect(e, indexOfFirstUser+index)} checked={item.selected}/></td>
                <td>
                    {item.edit
                        ? <input type="text" name="name" defaultValue={item.name} onChange={(e) => handleUpdateUser(e)}/>
                        : (item.name)
                    }
                </td>
                <td>
                    {item.edit
                        ? <input type="email" name="email" defaultValue={item.email} onChange={(e) => handleUpdateUser(e)}/>
                        : (item.email)
                    }
                </td>
                <td>
                    {item.edit
                        ? <input type="text" name="role" defaultValue={item.role} onChange={(e) => handleUpdateUser(e)}/>
                        : (item.role)
                    }
                </td>
                <td>
                    {item.edit
                    ? 
                    <>
                        <button className='actionButton saveButton'>
                            <FontAwesomeIcon icon={faCheckCircle} onClick={() => submitUpdateUser(indexOfFirstUser+index)}/>
                        </button>
                        <button className='actionButton deleteButton' onClick={() => editSelectedUserFalse(indexOfFirstUser+index)}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </>
                    :
                    <>
                        <button className='actionButton' disabled={editSelected ? true : false} style={editSelected ? {cursor:'not-allowed'} : {}} onClick={() => editSelectedUserTrue(indexOfFirstUser+index)}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </button>
                        <button className='actionButton deleteButton' onClick={() => deleteUser(indexOfFirstUser+index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </>
                    }
                </td>
            </tr>
            ))}
        </tbody>
    </table>
  </>
  )
}
