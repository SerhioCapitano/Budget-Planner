import React, { useState, useEffect} from 'react';
import CategoryService from '../services/CategoryService'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button} from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import {EditOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2'
 

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
              message: `Įveskite ${title}!`,
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
  const [categories, setCategories] = useState([]);
  const [editingKey, setEditingKey] = useState('');


  useEffect(()=>getAllCategories(),[]);
 
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    
    form.setFieldsValue({
      name: '',
      ...record,
    });
    setEditingKey(record.id);


  };

  const cancel = () => {
    setEditingKey('');
  };


  
  
const onDelete=(category) => {
  CategoryService.deleteCategory(category.name).then((respone) => {
    const newData = categories.filter(obj => obj.name !==  category.name);
    setCategories(newData);
  }).catch(error => {
    console.log(error)
  })
 
}

const getAllCategories = () => { 
  CategoryService.getAllCategories().then((response) => {
    setCategories(response.data);
    console.log(response.data)
  }).catch(error => {
    console.log(error);
  })
}



  const initialTutorialState = {
    name: "",
  };

  const [item, setItem] = useState(initialTutorialState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };



  var regExp = /[a-zA-Z]/g;

  const saveItem = () => {
    if(!regExp.test(item.name)) {
      Swal.fire({
        icon: 'error',
        title: 'Klaida!',
        text: 'Nepalikite tuščių laukų!',
      })
    } else if(findInArray(item)) {
      Swal.fire({
        icon: "error",
        title: "Klaida",
        text: "Tokia kategorija jau yra!"
      })
    } else {
    var data = {
      name: item.name,
    };
    CategoryService.createCategory(data)
      .then(response => {
        setItem({
          name: response.data.name,
        }); 
        getAllCategories();

      })
      .catch(e => {
        console.log(e);
      });
  };
  }


  
  const content = (
    <div style={{textAlign: "left"}}>
   <input style={{margin: "10px", borderRadius: '4px'}}  type="text"
    placeholder="Kategorija"
    name="name"
    value={item.name}
    onChange= {handleInputChange}
    />

<div>
   <Button style={{marginBottom: "30px", marginLeft: "10px"}} type="primary" onClick={saveItem}>Pridėti kategorijas</Button>
   {/* <Button type="primary" onClick={getAllIncome}>Submit</Button> */}
   </div>
    </div>
    
  );

  function findInArray(row) {
     let flag = false;
     for(let i = 0; i < categories.length; i++) {
       if(categories[i].name === row.name) {
         flag = true;
       }
     }
     return flag;
    }


  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...categories];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const obj = newData.find(category => category.id === id);
        if(findInArray(row) == true) {
          Swal.fire({
            icon: "error",
            title: "Klaida",
            text: "Tokia kategorija jau yra!"
          })
        } else {
        setCategories(newData);
        CategoryService.updateCategory(id,obj).then((response) => {
        }).catch(error => { 
          console.log(error);
        }); 
         setEditingKey('');
        }
      } else {
        newData.push(row);
        setCategories(newData);
 
        setEditingKey('');
        
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Kategorija',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Veiksmas',
      dataIndex: 'Veiksmas',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
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

                <EditOutlined />
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
        inputType: col.dataIndex === 'name' ? 'text' : (col.dataIndex === 'text') ?'text' :'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
<Form form={form} >
{content} 
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={categories}
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
