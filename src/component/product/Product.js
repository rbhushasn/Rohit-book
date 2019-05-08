import React, {Component} from 'react';
import {fetchAllProducts,updateProducts, deleteProduct,addNewProduct} from '../../actions/index';
import{bookDetails} from'../../actions/productdetails';
import {updateEdit} from '../../actions/edit/edit.index';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import BookDetails from './productDetails';


class Product extends Component{

    constructor(props){
        super(props);
        this.state ={
            products : [],
            show : false,
            obj : {}
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose (){
        this.setState({show : false});
    }
    handleShow(product){
        this.setState({show : true,obj:product});
    }
    
    onDetails(product) {
        this.handleShow(product);
    };

    onEdit(product) {
        this.props.onEdit(product);
    };
    
    onDelete(product) {
        this.props.onDelete(product);
    };
      
    componentDidMount(){
        this.props.fetchProducts();
    }

    render(){
        const productsArr = this.props.products; 
        
        return(
          <div className="row mt-3">
            
                  { productsArr.length > 0 ?  productsArr.map((product,index) => {
                      return(
                        <div className="col-md-4 py-3">
                            <div class="card">
                                <div class="card-header">
                                    {product.book_id}{". "}{product.title}
                                </div>

                                <div class="card-body">                            
                                    <p class="card-text">{product.description}</p>
                                    <h9 class="card-title">By:{product.author}</h9>

                                    <button
                                        onClick={this.onDetails.bind(this,product)}
                                        className={'btn btn-primary btn-sm float-right'}
                                        type={'button'}>
                                            {'Details'}
                                    </button> 
            
                                    <button
                                        onClick={this.onDelete.bind(this, product)}
                                        className={'btn btn-danger btn-sm float-right'}
                                        type={'button'}>
                                            {'Remove'}
                                    </button>
                
                                    <button
                                        onClick={this.onEdit.bind(this, product)}
                                        type={'button'}
                                        className={'btn btn-dark btn-sm float-right'}>
                                            {'Edit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        )
                    })
                    : ''
                } 
            

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product</Modal.Title>
                </Modal.Header>

                {this.state.obj !=null ? <Modal.Body>{this.state.obj.author} {this.state.obj.title} {this.state.obj.description}</Modal.Body> : 'No data'}
                
                <Modal.Footer>
                    <button variant="secondary" onClick={this.handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>)
    }
}

export default connect((state)=> {
    return {
        products : state.productReducer.products
    };
},

{
    fetchProducts:fetchAllProducts,
    updateProduct:updateProducts,
    onAdd: addNewProduct,
    onEdit: updateEdit,
    onDelete:deleteProduct,
    onDetails:bookDetails
  }
)(Product);
