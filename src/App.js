import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import { Modals } from './components/Modal/Modal'

export const App = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)

  const reqests = () => {
    axios.get('http://localhost:3000/block').then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    reqests()
  }, [])
  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: data.id,
      render: (text) => <p>{text}</p>
    },
    {
      title: '',
      dataIndex: 'id',
      key: data.id,
      render: (id) => <Button type="primary" danger disabled={data.length >= 15} onClick={() => {
        axios.delete(`http://localhost:3000/block/${id}`).then((res) => {
          reqests()
        })
      }}>
 <DeleteOutlined />
        Удалить
      </Button>
    }
  ]

  const handlestate = (item) => {
    setOpen(item)
  }

  return (
    <div className='p-5'>

      <Button type="primary" disabled={data.length >= 15} onClick={() => setOpen(true)}>
      <PlusOutlined />
        Добавить поле
      </Button>
      <Table columns={columns} dataSource={data} />
    <Modals states={handlestate} changestates={open} req={reqests}/>
    </div>
  )
}
