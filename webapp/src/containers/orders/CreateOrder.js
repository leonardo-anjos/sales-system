import { DatePicker, Form, Input, Modal } from "antd";
import React, { PureComponent } from "react";
import { api } from "../../services/api";

const FormItem = Form.Item;

export const CreateOrder = Form.create()(
  class extends PureComponent {
    state = {
      persons: []
    };

    componentDidMount() {
      this.getAllCustomers();
    }

    getAllCustomers = async () => {
      const response = await api.get("/customers");

      const formattedCustomers = response.data.map(c => {
        return {
          value: c.id,
          label: c.name
        }  
      })

      this.setState({
        persons: formattedCustomers,
      });
    };

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
          title="Pedido"
          onCancel={onCancel}
          cancelText="Cancelar"
          onOk={onCreate}
          okText="Salvar"
        >
          <FormItem {...formItemLayout} label={<span>Cod. Cliente</span>}>
            {getFieldDecorator("customerId", {
              rules: [
                {
                  required: true,
                  message: "Por favor, selecione um cliente!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Selecione um cliente" />)}
          </FormItem>

          <FormItem {...formItemLayout} label={<span>Descrição</span>}>
            {getFieldDecorator("description", {})(<Input placeholder="Descrição do pedido" />)}
          </FormItem>

          <FormItem {...formItemLayout} label={<span>Data do Pedido</span>}>
            {getFieldDecorator("createdAt", {})(<DatePicker placeholder="Selecione a data do pedido" style={{ width: 275 }} />)}
          </FormItem>
        </Modal>
      );
    }
  }
); // form
