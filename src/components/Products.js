import axios from "axios";
import React, { Component } from "react";
import "./Products.scss";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
export default class Products extends Component {
  state = {
    counter: 0,
    products: [],
    addModal: false,
    updateModal: false,
    updateProduct: {},
    updateProductId: -1,
    deletemodal: false,
    deleteProduct: {},
    deleteProductId: -1,
  };

  componentDidMount() {
    this.getData();
  }
  toggle = () => {
    this.setState({
      deletemodal: !this.state.deletemodal,
    });
  };
  toggleUpdate = () => {
    this.setState({
      updateModal: !this.state.updateModal,
    });
  };
  toggleAdd = () => {
    this.setState({
      addModal: !this.state.addModal,
    });
  };
  getData = () => {
    axios
      .get("https://65b220b49bfb12f6eafcecf7.mockapi.io/products")
      .then((res) => {
        this.setState({
          products: [...res.data],
        });
      });
  };

  handleAdd = () => {
    this.setState({
      addModal: !this.state.addModal,
    });
  };

  addProduct=(e)=>{
    e.preventDefault();
    let newProduct = {
      pName: e.target.pName.value,
      pAdjective: e.target.pAdjective.value,
      pImage: e.target.pImage.value,
      pInfo: e.target.pInfo.value,
    };
    axios
      .post(
        `https://65b220b49bfb12f6eafcecf7.mockapi.io/products/`,
        newProduct
      )
      .then((res) => {
        this.getData();
        this.toggleAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpdate = (id) => {
    this.setState({
      updateModal: !this.state.updateModal,
      updateProductId: id,
    });
    axios
      .get("https://65b220b49bfb12f6eafcecf7.mockapi.io/products/" + id)
      .then((res) => {
        this.setState({
          updateProduct: { ...res.data },
        });
      });
  };

  updateSelectedProduct = (e) => {
    e.preventDefault();
    let updatedProduct = {
      pName: e.target.pName.value,
      pAdjective: e.target.pAdjective.value,
      pImage: e.target.pImage.value,
      pInfo: e.target.pInfo.value,
    };
    axios
      .put(
        `https://65b220b49bfb12f6eafcecf7.mockapi.io/products/${this.state.updateProductId}`,
        updatedProduct
      )
      .then((res) => {
        this.getData();
        this.toggleUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    this.setState({
      deletemodal: !this.state.deletemodal,
      deleteProductId: id,
    });
    axios
      .get("https://65b220b49bfb12f6eafcecf7.mockapi.io/products/" + id)
      .then((res) => {
        this.setState({
          deleteProduct: { ...res.data },
        });
      });
  };

  deleteSelectedProduct = (id) => {
    axios
      .delete(`https://65b220b49bfb12f6eafcecf7.mockapi.io/products/${id}`)
      .then((res) => {
        this.getData();
        this.toggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      products,
      deletemodal,
      deleteProduct,
      deleteProductId,
      updateProduct,
      updateModal,
      addModal,
    } = this.state;
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-8">
            <h1>Products</h1>
          </div>
          <div className="col-4 button">
            <button onClick={this.handleAdd} className="btn btn-primary">
              Add new product
            </button>
          </div>
        </div>
        <div className="row my-5">
          {products
            ? products.map((item) => (
                <div className="col-xl-4 my-2" key={item.id}>
                  <div className="card mb-3 h-100">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.pImage}
                          class="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.pName}</h5>
                          <p className="card-text">{item.pInfo}</p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              {item.pAdjective}
                            </small>
                          </p>
                        </div>
                        <div className="buttons d-flex justify-content-end align-items-lg-baseline">
                          <button
                            className="btn btn-danger me-2"
                            onClick={() => this.handleDelete(item.id)}
                          >
                            delete
                          </button>
                          <button
                            onClick={() => this.handleUpdate(item.id)}
                            className="btn btn-warning me-2"
                          >
                            edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <Modal isOpen={deletemodal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Are you sure to delete?
          </ModalHeader>
          <ModalBody>
            <div className="row my-5">
              {deleteProduct && (
                <div className="col-xl-12" key={deleteProduct.id}>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={deleteProduct.pImage}
                          class="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{deleteProduct.pName}</h5>
                          <p className="card-text">{deleteProduct.pInfo}</p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              {deleteProduct.pAdjective}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={this.toggle} className="btn btn-secondary">
              No
            </button>
            <button
              onClick={() => this.deleteSelectedProduct(deleteProductId)}
              className="btn btn-danger"
            >
              Yes
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={updateModal} toggle={this.toggleUpdate}>
          <ModalHeader toggle={this.toggleUpdate}>
            Are you sure to delete?
          </ModalHeader>
          <ModalBody>
            <div className="col-xl-12">
              <form onSubmit={this.updateSelectedProduct} ref={this.myForm}>
                <div className="card">
                  <div className="card-header text-center bg-warning text-dark">
                    <h1>Product Form</h1>
                  </div>
                  <div className="card-body">
                    <label htmlFor="pName">Product Name</label>
                    <input
                      value={updateProduct?.pName}
                      onChange={(e) => {
                        this.setState({
                          updateProduct: {
                            ...updateProduct,
                            pName: e.target.value,
                          },
                        });
                      }}
                      required={true}
                      className="form-control"
                      name="pName"
                      type="text"
                    />

                    <br />
                    <label htmlFor="pAdjective">Product condition</label>
                    <input
                      value={updateProduct.pAdjective}
                      onChange={(e) => {
                        this.setState({
                          updateProduct: {
                            ...updateProduct,
                            pAdjective: e.target.value,
                          },
                        });
                      }}
                      required={true}
                      className="form-control"
                      name="pAdjective"
                      type="text"
                    />
                    <br />
                    <label htmlFor="pImage">Product image source</label>
                    <input
                      value={updateProduct.pImage}
                      onChange={(e) => {
                        this.setState({
                          updateProduct: {
                            ...updateProduct,
                            pImage: e.target.value,
                          },
                        });
                      }}
                      required={true}
                      className="form-control"
                      name="pImage"
                      type="text"
                    />
                    <br />
                    <label htmlFor="pInfo">Product info</label>
                    <textarea
                      name="pInfo"
                      rows="7"
                      cols="40"
                      value={updateProduct.pInfo}
                      onChange={(e) => {
                        this.setState({
                          updateProduct: {
                            ...updateProduct,
                            pInfo: e.target.value,
                          },
                        });
                      }}
                    ></textarea>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={this.toggleUpdate}
                      className="btn btn-secondary me-2"
                    >
                      No
                    </button>
                    <button type="sumbit" className="btn btn-warning">
                      Yes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>

        <Modal isOpen={addModal} toggle={this.toggleAdd}>
          <ModalHeader toggle={this.toggleAdd}>
            Are you sure to add?
          </ModalHeader>
          <ModalBody>
            <div className="col-xl-12">
              <form onSubmit={this.addProduct}>
                <div className="card">
                  <div className="card-header text-center bg-primary text-white">
                    <h1>Product Form</h1>
                  </div>
                  <div className="card-body">
                    <label htmlFor="pName">Product Name</label>
                    <input
                      required={true}
                      className="form-control"
                      name="pName"
                      type="text"
                    />

                    <br />
                    <label htmlFor="pAdjective">Product condition</label>
                    <input
                      required={true}
                      className="form-control"
                      name="pAdjective"
                      type="text"
                    />
                    <br />
                    <label htmlFor="pImage">Product image source</label>
                    <input
                      required={true}
                      className="form-control"
                      name="pImage"
                      type="text"
                    />
                    <br />
                    <label htmlFor="pInfo">Product info</label>
                    <textarea name="pInfo" rows="7" cols="40"></textarea>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={this.toggleAdd}
                      className="btn btn-secondary me-2"
                    >
                      No
                    </button>
                    <button type="sumbit" className="btn btn-primary">
                      Yes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
