import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button} from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import ExpensesService from '../services/ExpensesService'
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
  const inputNode = (inputType === 'number') ? <InputNumber /> :(inputType==='date')?<Input type='date'/>: <Input />;
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
              message: `Privaloma įvesti ${title} !`,
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

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      amount: '',
      date: '',
      category: '',
      name: '',
      comment: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };



  const onDelete=(record) => {
    ExpensesService.deleteExpense(record.id).then((response)=>{
      const newData = expenses.filter(obj => obj.id !==  record.id);
      setExpenses(newData);
    }).catch(error => {
      console.log(error)
    })
  }


  const getAllExpenses = () => { 
    ExpensesService.getAllExpenses().then((response) => {
      setExpenses(response.data);
    }).catch(error => {
      console.log(error);
    })
  }


  const initialTutorialState = {
    id: null,
    amount: "",
    date1: "",
    category: "",
    name:"",
    comment: "",
  };

  const [item, setItem] = useState(initialTutorialState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };



  var regExp = /[a-zA-Z]/g;


  const saveItem = () => {
    if(item.amount === "" ||   !regExp.test(item.category) || !regExp.test(item.name) || !regExp.test(item.comment)) {
      Swal.fire({
        icon: 'error',
        title: 'Klaida!',
        text: 'Nepalykit tuscius laukus!',
      })
    } else if(item.amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Klaida",
        text: "Suma negali but neigiama arba nuli!"
      }) 
     } else {
    var data = {
      amount: item.amount,
      date1: item.date,
      category: item.category,
      name: item.name,
      comment: item.comment
    };
    ExpensesService.createExpense(data)
      .then(response => {
        setItem({
          amount: response.data.amount,
          date1: response.data.date,
          category: response.data.category,
          name: response.data.name,
          comment: response.data.comment,
        }); 
        getAllExpenses();
      })
      .catch(e => {
        console.log(e);
      });
  };
}

  const content = (
  
    <div style={{textAlign: "left"}} >
   <input style={{margin: "10px", borderRadius: '4px'}} type="number" 
    placeholder="Suma"
    name="amount"
    value={item.amount}
    onChange= {handleInputChange}
    />

     <input style={{margin: "10px", borderRadius: '4px'}} type="date"
    placeholder="Data"
    name="date"
    value={item.date}
    onChange= {handleInputChange}
    />

   <input style={{margin: "10px", borderRadius: '4px'}} type="text"
    placeholder="Kategorija"
    name="category"
    value={item.category}
    onChange= {handleInputChange}
    />

<input style={{margin: "10px", borderRadius: '4px'}} type="text"
    placeholder="Pavadinimas"
    name="name"
    value={item.name}
    onChange= {handleInputChange}
    />

<input style={{margin: "10px", borderRadius: '4px'}} type="text"
    placeholder="Komentaras"
    name="comment"
    value={item.comment}
    onChange= {handleInputChange}
    />
    <div>
   <Button style={{marginBottom: "30px", marginLeft: "10px"}} type="primary" onClick={saveItem}>Pridėti išlaidas</Button>
   </div>
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
        const obj = newData.find(expense => expense.id === id);
        setExpenses(newData);
        ExpensesService.updateExpense(id, obj).then((response) => {
        }).catch(error => { 
          console.log(error);
        }); 
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
      width: '15%',
      editable: true,
    },
    {
      title: 'Data',
      dataIndex: 'date1',
      width: '15%',
      editable: true,
    },
    {
      title: 'Kategorija',
      dataIndex: 'category',
      width: '15%',
      editable: true,
    },
    {
      title: 'Pavadinimas',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Komentaras',
      dataIndex: 'comment',
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
        inputType: col.dataIndex === 'amount' ? 'number' : (col.dataIndex === 'date1') ?'date' :'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
<Form form={form}>
{content} 
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