import React, { useState, useEffect} from 'react';
import CategoryService from '../services/CategoryService'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button} from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
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

const onDelete=(record) => {
  CategoryService.deleteCategory(record.id).then((respone) => {
    const newData = categories.filter(obj => obj.id !==  record.id);
    setCategories(newData);
  }).catch(error => {
    console.log(error)
  })
 
}

const getAllCategories = () => { 
  CategoryService.getAllCategories().then((response) => {
    setCategories(response.data);
  }).catch(error => {
    console.log(error);
  })
}



  const initialTutorialState = {
    id: null,
    name: "",
  };

  const [item, setItem] = useState(initialTutorialState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };


  var regExp = /[a-zA-Z]/g;

  const saveItem = () => {
    if(item.amount === "" || !regExp.test(item.description)) {
      Swal.fire({
        icon: 'error',
        title: 'Klaida!',
        text: 'Nepalikite tuščių laukų!',
      })
    } else if(item.amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Klaida",
        text: "Suma negali but neigiama arba nulis!"
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
   <input style={{margin: "10px", borderRadius: '4px'}}  type="number"
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


  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...categories];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const obj = newData.find(category => category.id === id);
        setCategories(newData);
        CategoryService.updateCategory(id,obj).then((response) => {
        }).catch(error => { 
          console.log(error);
        }); 
         setEditingKey('');
        
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
            <Popconfirm title="Norite atšaukti?" onConfirm={cancel}>
              <a>Atšaukti</a>
            </Popconfirm>
          </span>
          
        ) : 
        (
          <div>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Keisti
          </Typography.Link>
          <DeleteOutlined
          onClick={() => {
            onDelete(record);
          }}
          style={{ color: "red", marginLeft: 12 }}
        />
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
