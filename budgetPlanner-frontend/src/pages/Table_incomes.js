import React, { useState, useEffect } from 'react';
import IncomesService from '../services/IncomesService'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Popover } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
 




// for (let i = 0; i < 100; i++) {
//   originData.push({ 
//    id: i.toString(),
//     Suma: `Edrward ${i}`,
//     Data: 32,
//     Kategorija: `London Park no. ${i}`,
//     Pavadinimas: `London Park no. ${i}`,
//     Komentaras: `London Park no. ${i}`,
//   });
// }



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
  const [incomes, setIncomes] = useState([]);
  const [editingKey, setEditingKey] = useState('');


  useEffect(()=>getAllIncome(),[]);
  





 
    //Runs on every render

  

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      Suma: '',
      Data: '',
      Kategorija: '',
      Pavadinimas: '',
      Komentaras: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  






const onDelete=(record) => {
  IncomesService.deleteIncome(record.id).then((respone) => {
    const newData = incomes.filter(obj => obj.id !==  record.id);
    console.log(newData);
    setIncomes(newData);
  }).catch(error => {
    console.log(error)
  })
 
}

const getAllIncome = () => { 
  IncomesService.getAllIncomes().then((response) => {
    console.log(response.data);
    setIncomes(response.data);
  }).catch(error => {
    console.log(error);
  })
}
  ///////////////////////////////////////////////////////////////////


  const initialTutorialState = {
    id: null,
    amount: "",
    date: "",
    description: "",
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
      description: item.description
    };
    IncomesService.createIncome(data)
      .then(response => {
        setItem({
          amount: response.data.amount,
          date: response.data.date,
          description: response.data.description,
        }); 
        getAllIncome();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };













    /////////////////////////////////////////////////////////////////////



// const AddItem = (e) => {
//   e.preventDefault();
//   const item = {amount,date,description}
//   incomes.push(item);
//   setIncomes(incomes);
// }



  const content = (
    <div>
   <Input type="text"
    placeholder="Suma"
    name="amount"
    value={item.amount}
    onChange= {handleInputChange}
    />

     <Input type="text"
    placeholder="Data"
    name="date"
    value={item.date}
    onChange= {handleInputChange}
    />

   <Input type="text"
    placeholder="Komentaras"
    name="description"
    value={item.description}
    onChange= {handleInputChange}
    />


   <Button type="primary" onClick={saveItem}>Submit</Button>
   {/* <Button type="primary" onClick={getAllIncome}>Submit</Button> */}
  
    </div>
    
  );


  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...incomes];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setIncomes(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setIncomes(newData);
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
      dataIndex: 'timeStamp',
      width: '15%',
      editable: true,
    },
    {
      title: 'Komentaras',
      dataIndex: 'description',
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
    <Button type="primary">Prideti Pajamos</Button>
  </Popover>
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={incomes}
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
