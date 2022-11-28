import { Breadcrumb, Button, Divider, Icon, Input, message, Table } from "antd";
import React, { PureComponent } from "react";
import { Edit } from "../../components/edit";
import { Remove } from "../../components/remove";
import { api } from "../../services/api";
import { CreateCustomer } from "./CreateCustomer";

const Search = Input.Search;

export class ListCustomer extends PureComponent {
  state = {
    persons: [],
    searchText: null,
    visible: false,
    confirmLoading: false,
    filteredData: [],
    searchInput: "",
    loading: true,
    isEditing: false,
    currentPersonEdit: null,
    status: false,
    drawerPerson: []
  };

  render() {
    return (
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px"
        }}
      >
        {this.renderOptions()}
        {this.renderSearch()}
        {this.renderTable()}
      </div>
    );
  }

  componentDidMount() {
    this.getAllCustomers();
  }

  getAllCustomers = async () => {
    const response = await api.get("/customers");
    this.setState({
      persons: response.data,
      drawerPerson: response.data,
      loading: false
    });
  };

  renderOptions() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Clientes</Breadcrumb.Item>
        </Breadcrumb>

        <Button type="primary" onClick={this.showModal}>
          <Icon type="plus" /> Novo
        </Button>
        
        <CreateCustomer
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleSubmit}
        />
      </div>
    );
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    const { form } = this.formRef.props;
    form.resetFields();
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    const { isEditing } = this.state;
    const { form } = this.formRef.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (isEditing) {
        this.handleUpdate(values);
      } else {
        this.addPerson(values);
      }

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  renderSearch() {
    return <Search placeholder="Buscar" onChange={this.handleSearch} />;
  }

  handleSearch = event => {
    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
  };

  globalSearch = () => {
    const { searchInput, persons } = this.state;
    let filteredData = persons;

    filteredData = filteredData.filter(value => {
      return value.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    this.handleSetFilteredData(filteredData);
  };

  handleSetFilteredData = filteredData => {
    this.setState({ filteredData });
  };

  handleSetSearchInput = searchInput => {
    this.setState({ searchInput });
  };

  renderTable() {
    const { persons, filteredData, searchInput, loading } = this.state;
    const dataSource = searchInput.length ? filteredData : persons;

    const columns = [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Ações",
        key: "actions",
        render: (_, person) => (
          <span>
            <Edit onClick={() => this.handleEdit(person)} />
            <Divider type="vertical" />
            <Remove onClick={() => this.handleRemove(person)} />
          </span>
        )
      }
    ];

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        locale={{
          emptyText: "Nenhum registro encontrado"
        }}
      />
    );
  }

  addPerson = async values => {
    await api.post("/customers", values);
    message.success("Cliente adicionado com sucesso!");
    this.getAllCustomers();
  };

  handleEdit = async values => {
    this.setState({ isEditing: true });
    this.setState({ currentPersonEdit: values.id });
    this.showModal();

    const { form } = this.formRef.props;

    form.setFieldsValue({
      name: `${values.name || ""}`,
    });
  };

  handleRemove = async person => {
    await api.delete(`/customers/${person.id}`);
    message.success("Cliente removido com sucesso!");
    this.getAllCustomers();
  };

  handleUpdate = async person => {
    let { currentPersonEdit } = this.state;
    await api.put(`/customers/${currentPersonEdit}`, person);
    message.success("Cliente atualizado com sucesso!");
    this.getAllCustomers();
  };
}
