import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Popover } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import ExpensesService from '../services/ExpensesService'


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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
              message: `Please Input ${title}!`,
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
  const [expenses, setExpenses] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(()=>getAllExpenses(),[]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      Suma: '',
      Data: '',
      Kategorija: '',
      Pavadinimas: '',
      Komentaras: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };



  const onDelete=(record) => {
    ExpensesService.deleteExpense(record.id).then((response)=>{
      const newData = expenses.filter(obj => obj.id !==  record.id);
      console.log(newData);
      setExpenses(newData);
    }).catch(error => {
      console.log(error)
    })
  }


  const getAllExpenses = () => { 
    ExpensesService.getAllExpenses().then((response) => {
      console.log(response.data);
      setExpenses(response.data);
    }).catch(error => {
      console.log(error);
    })
  }


  const initialTutorialState = {
    id: null,
    amount: "",
    date: "",
    category: "",
    name:"",
    comment: "",
  };
  const [item, setItem] = useState(initialTutorialState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };
  const saveItem = () => {
    var data = {
      amount: item.amount,
      date: item.date,
      category: item.category,
      name: item.name,
      comment: item.comment
    };
    ExpensesService.createExpense(data)
      .then(response => {
        setItem({
          amount: response.data.amount,
          date: response.data.date,
          category: response.data.category,
          name: response.data.name,
          comment: response.data.comment,
        }); 
        getAllExpenses();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  

  const content = (
    <div>
   <Input type="number"
    placeholder="Suma"
    name="amount"
    value={item.amount}
    onChange= {handleInputChange}
    />

     <Input type="date"
    placeholder="Data"
    name="date"
    value={item.date}
    onChange= {handleInputChange}
    />

   <Input type="text"
    placeholder="Kategorija"
    name="category"
    value={item.category}
    onChange= {handleInputChange}
    />

<Input type="text"
    placeholder="Pavadinimas"
    name="name"
    value={item.name}
    onChange= {handleInputChange}
    />

<Input type="text"
    placeholder="Komentaras"
    name="comment"
    value={item.comment}
    onChange= {handleInputChange}
    />


   <Button type="primary" onClick={saveItem}>Išsaugoti</Button>
  
    </div>
    
  );

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...expenses];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setExpenses(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setExpenses(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Suma',
      dataIndex: 'amount',
      width: '25%',
      editable: true,
    },
    {
      title: 'Data',
      dataIndex: 'date',
      width: '15%',
      editable: true,
    },
    {
      title: 'Kategorija',
      dataIndex: 'category',
      width: '40%',
      editable: true,
    },
    {
      title: 'Pavadinimas',
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    {
      title: 'Komentaras',
      dataIndex: 'comment',
      width: '40%',
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
            <Popconfirm title="Keisti?" onConfirm={cancel}>
              <a>Atšaukti</a>
            </Popconfirm>
          </span>
          
        ) : (
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
        inputType: col.dataIndex === 'Data' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
<Form form={form} component={false}>
<div>
<Popover content={content} title="Title">
    <Button type="primary">Prideti Išlaidas</Button>
  </Popover>
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={expenses}
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