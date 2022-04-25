import React, { useState, useEffect } from 'react';
import IncomesService from '../services/IncomesService'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Popover } from 'antd';
 



const originData = [
  {
    Suma: "Edward",
    Data: 44,
    Komentaras: "cats",
  }, 
  {
    Suma: "Sam",
    Data: 50,
    Komentaras: "fly",
  }
];

// for (let i = 0; i < 100; i++) {
//   originData.push({ 
//    key: i.toString(),
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
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const [incomes, setIncomes] = useState([]);

  useEffect(()=>getAllIncome(),[]);

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


  const[items , setItems] = useState([]) 
const[Suma, setSuma] = useState();
const[Data, setDate] = useState();
const[komentaras, setKomentara] = useState();

const something = (e) => {
  console.log(komentaras);
}


const getAllIncome = () => {
  IncomesService.getAllIncomes().then((response) => {
    console.log(response.data);
    setIncomes(response.data);
  }).catch(error => {
    console.log(error);
  })
}




const AddItem = (e) => {
    e.preventDefault();

    const item = {Suma,Data,komentaras}
    console.log(item);
    originData.push(item);
    setData(originData);
    console.log(originData);
}

  const content = (
    <div>
   <Input type="text"
    placeholder="Suma"
    name="Suma"
    value={Suma}
    onChange= {(e) => setSuma(e.target.value)}
    />

     <Input type="text"
    placeholder="Data"
    name="Data"
    value={Data}
    onChange= {(e) => setDate(e.target.value)}
    />

   <Input type="text"
    placeholder="Komentaras"
    name="komentaras"
    value={komentaras}
    onChange= {(e) => setKomentara(e.target.value)}
    />


   <Button type="primary" onClick={(e) => AddItem(e)}>Submit</Button>
   <Button type="primary" onClick={getAllIncome}>Submit</Button>
  
    </div>
  );

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Suma',
      dataIndex: 'Suma',
      width: '25%',
      editable: true,
    },
    {
      title: 'Data',
      dataIndex: 'amount',
      width: '15%',
      editable: true,
    },
    {
      title: 'Komentaras',
      dataIndex: 'timeStamp',
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
              onClick={() => save(record.key)}
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Keisti
          </Typography.Link>
          
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
