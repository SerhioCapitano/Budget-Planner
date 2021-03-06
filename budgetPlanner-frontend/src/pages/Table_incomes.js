import React, { useState, useEffect } from 'react';
import IncomesService from '../services/IncomesService'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2'
import {EditOutlined } from "@ant-design/icons";

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

  const inputNode = (inputType === 'number') ? <InputNumber /> : (inputType === 'date') ? <Input type='date' /> : <Input />;

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
              message: `Iveskite ${title}!`,
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


  useEffect(() => getAllIncome(), []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {

    form.setFieldsValue({
      amount: '',
      date: '',
      description: '',
      ...record,
    });
    setEditingKey(record.id);


  };

  const cancel = () => {
    setEditingKey('');
  };

  const onDelete = (record) => {
    IncomesService.deleteIncome(record.id).then((respone) => {
      const newData = incomes.filter(obj => obj.id !== record.id);
      setIncomes(newData);
    }).catch(error => {
      console.log(error)
    })

  }

  const getAllIncome = () => {
    IncomesService.getAllIncomes().then((response) => {
      setIncomes(response.data);
    }).catch(error => {
      console.log(error);
    })
  }



  const initialTutorialState = {
    id: null,
    amount: "",
    timeStamp: "",
    description: "",
  };

  const [item, setItem] = useState(initialTutorialState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };


  var regExp = /[a-zA-Z]/g;

  const saveItem = () => {
    if (item.amount === "" || !regExp.test(item.description)) {
      Swal.fire({
        icon: 'error',
        title: 'Klaida!',
        text: 'Nepalikite tu????i?? lauk??!',
      })
    } else if (item.amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Klaida",
        text: "Suma negali but neigiama arba nulis!"
      })
    } else {
      var data = {
        amount: item.amount,
        timeStamp: item.date,
        description: item.description
      };
      IncomesService.createIncome(data)
        .then(response => {
          setItem({
            amount: response.data.amount,
            timeStamp: response.data.date,
            description: response.data.description,
          });
          getAllIncome();
          setItem(initialTutorialState)

        })
        .catch(e => {
          console.log(e);
        });
    };
  }



  const content = (
    <div style={{ textAlign: "left" }}>
      <input  style={{ margin: "10px", borderRadius: '4px',  }} type="number" 
        placeholder="Suma" 
        name="amount"
        value={item.amount}
        onChange={handleInputChange}
      />

      <input style={{ margin: "10px", borderRadius: '4px' }} type="date"
        placeholder="Data"
        name="date"
        value={item.date}
        onChange={handleInputChange}
      />

      <input style={{ margin: "10px", borderRadius: '4px' }} type="text"
        placeholder="Komentaras"
        name="description"
        value={item.description}
        minLength={4}
        onChange={handleInputChange}
      />


      {/* <div> */}
        <Button style={{ marginBottom: "30px", marginLeft: "10px" }} type="primary" onClick={saveItem}>Prid??ti pajamas</Button>
        {/* <Button type="primary" onClick={getAllIncome}>Submit</Button> */}
      {/* </div> */}
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
        const obj = newData.find(income => income.id === id);
        setIncomes(newData);
        IncomesService.updateIncome(id, obj).then((response) => {
        }).catch(error => {
          console.log(error);
        });
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
      width: '20%',
      editable: true,
    },
    {
      title: 'Data',
      dataIndex: 'timeStamp',
      width: '20%',
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

           <Popconfirm title="Norite at??aukti?" onConfirm={cancel}
              okText="Yes"
              cancelText="No">
              <a>At??aukti</a>
            </Popconfirm> 
          </span>

        ) :
          (
            <div>
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined/>
              </Typography.Link>

              <Popconfirm title="Norite istrinti?" onConfirm={() => { onDelete(record) }} onCancel={cancel}
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
        inputType: col.dataIndex === 'amount' ? 'number' : (col.dataIndex === 'timeStamp') ? 'date' : 'text',
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
