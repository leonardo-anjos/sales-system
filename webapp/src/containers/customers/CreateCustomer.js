import React, { PureComponent } from "react";
import { Modal, Form, Input } from "antd";

const FormItem = Form.Item;

export const CreateCustomer = Form.create()(
  class extends PureComponent {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      };

      return (
        <Modal
          visible={visible}
          title="Cliente"
          onCancel={onCancel}
          cancelText="Cancelar"
          onOk={onCreate}
          okText="Salvar"
        >
          <FormItem {...formItemLayout} label={<span>Nome</span>}>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Por favor, insira um nome!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
        </Modal>
      );
    }
  }
); // form
