import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Modal, Button, Input, message } from 'antd'

import './modal.css'

export const Modals = ({ states, changestates, req }) => {
  const [numbers, setNumbers] = useState(Number)
  const [messageApi, contextHolder] = message.useMessage()

  return <Modal
  title="Добавить поле"
  footer={null}
  centered
  open={changestates}

  onCancel={() => states(false)}
>
<div className='modal_container'>
<Input placeholder="Basic usage" type="number" onChange={(e) => setNumbers(Number(e.target.value))} />
<Button disabled={numbers <= 0} type='primary' onClick={() => {
  axios.post('http://localhost:3000/block', { number: numbers }).then(() => {
    req()
    messageApi.success('Поле успешно добавлено')
  }).catch(() => {
    messageApi.error('Произошла ошибка')
  })
}}>Добавить поле</Button>
</div>
 {contextHolder}
</Modal>
}

Modals.propTypes = {
  states: PropTypes.func.isRequired,
  changestates: PropTypes.bool.isRequired,
  req: PropTypes.func.isRequired
}
