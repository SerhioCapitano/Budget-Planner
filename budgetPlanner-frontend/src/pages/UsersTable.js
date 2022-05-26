import React, { useState, useEffect} from 'react';
import UserService from '../services/UserService'
import { Table, Input, Popconfirm, Form, Typography, Button} from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import { Link, useNavigate, Redirect  } from "react-router-dom";
import { Row, Col, Space} from "antd";
 

const EditableCell = ({
  
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  
  const inputNode = (inputType === 'text') ? <Input /> :(inputType==='text')?<Input type='text'/>: <Input />;



  return (

    
    
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Privaloma įvesti ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const EditableTable = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState('');


  useEffect(()=>getAllUsers(),[]);

  
  let getAdmin =  users.find(obj => {
    return obj.username === "admin";
  })




  
 
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    
    form.setFieldsValue({
      username: '',
      email: '',
      password: '',
      ...record,
    });
    setEditingKey(record.id);


  };

  const cancel = () => {
    setEditingKey('');
  };

  const onDelete=(record) => {
    if(record.username == "admin") {
        console.log(getAdmin);
    } else {
    UserService.deleteUsers(record.username).then((response)=>{
    
      const newData = users.filter(obj => obj.id !==  record.id);
      setUsers(newData);
    }).catch(error => {
      console.log(error)
    })
  }
}


const getAllUsers = () => { 
  UserService.getAllUsers().then((response) => {
    setUsers(response.data);
  }).catch(error => {
    console.log(error);
  })
}



  const initialTutorialState = {
    id: null,
    username: "",
  email: "",
    password: "",
  };

  const [item, setItem] = useState(initialTutorialState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };


  var regExp = /[a-zA-Z]/g;

  const saveItem = () => {
    if(item.username === "" ) {
      Swal.fire({
        icon: 'error',
        title: 'Klaida!',
        text: 'Nepalikite tuščių laukų!',
      })
    }  else {
    var data = {
      username: item.username,
      email: item.email,
      password: item.password
    };
   UserService.createUsers(data)
      .then(response => {
        setItem({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
        }); 
        getAllUsers();
        setItem(initialTutorialState);

      })
      .catch(e => {
        console.log(e);
      });
  };
  }

  const navigate = useNavigate();

  const switchBack=()=>{
    navigate("/profile");
  }


  
  const content = (
    <div style={{textAlign: "left"}}>
   <input style={{margin: "10px", borderRadius: '4px'}}  type="text"
    placeholder="Vartotojo vardas"
    name="username"
    value={item.username}
    onChange= {handleInputChange}
    />

     <input style={{margin: "10px", borderRadius: '4px'}}  type="email"
    placeholder="El. paštas"
    name="email"
    value={item.email}
    onChange= {handleInputChange}
    />

   <input style={{margin: "10px", borderRadius: '4px'}} type="password"
    placeholder="Slaptažodis"
    name="password"
    value={item.password}
    // minLength="4"
    onChange= {handleInputChange}
    />


<div>
   <Button style={{marginBottom: "30px", marginLeft: "10px"}} type="primary" onClick={saveItem}>Pridėti vartotoją</Button>
   {/* <Button type="primary" onClick={getAllUser}>Submit</Button> */}
   </div>
    </div>
    
  );


  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...users]; 
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const obj = newData.find(user => user.id === id);
        setUsers(newData);
        UserService.updateUsers(item.username, obj).then((response) => {
          console.log(obj);
          console.log(obj.username);
        }).catch(error => { 
          console.log(error);
          console.log(obj);
          console.log(obj.username);
        }); 
          setEditingKey('');
      } else {
        newData.push(row);
        setUsers(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Vartotojo vardas',
      dataIndex: 'username',
      width: '20%',
      editable: true,
    },
    {
      title: 'El. paštas',
      dataIndex: 'email',
      width: '20%',
      editable: true,
    },
    // {
    //   title: 'Slaptažodis',
    //   dataIndex: 'password',
    //   width: '40%',
    //   editable: true,
    // },
    
    {
      title: 'Veiksmas',
      dataIndex: 'Veiksmas',
      render: (_, record) => {
        const editable = isEditing(record); 
        
        return editable   ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Saugoti
            </Typography.Link>
            <Popconfirm title="Norite atšaukti?" onConfirm={cancel}
              okText="Yes"
              cancelText="No">
              <a>Atšaukti</a>
            </Popconfirm>
          </span>
          
        ) : (
          <div>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Keisti
              </Typography.Link>
              <Popconfirm title="Norite istrinti" onConfirm={() => { onDelete(record) }} onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <a href="#">
              <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
                />
              </a>
            </Popconfirm>
        </div>
         ); 
     },
     
   },
   
  ];
 const mergedColumns = columns.map((col) => {
   if (!col.editable) {
       return col;
     } 
    return {
      
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'username' ? 'text' : (col.dataIndex === 'email') ?'email' :'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (

            
             
              
                

<Form form={form} >
<Row  align="center" gutter={[24, 0]}>

<Col
              span={24}
              md={23}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <a align='end' href="/profile" onClick={switchBack} >Grįžti</a>
               </Col>
          </Row>

{content} 
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={users}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        
      />
     
    </Form>

    
    
  );
};

export default () => <EditableTable />;
