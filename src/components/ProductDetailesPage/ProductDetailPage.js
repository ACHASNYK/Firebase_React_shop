import React, { Component } from "react";
import { client } from "../../App";
import { connect } from "react-redux";
import { productById } from "../../queries/query"
import SmallImg from "./SmallImg";
import BigImg from "./BigImg";
import Detailes from "./Detailes";
import { set_detailes } from '../../redux/detail_data';
import { loadFromLocalStorage } from '../../utilities/loadFromLocalStorage'
import styled from "styled-components";
import { projFirestore } from '../../firebase/config';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: {},
            dataIsLoaded: false,
            object: {}
        }
         

    }        
    
    componentDidMount() {
        console.log('didmount')
    // const query_variable = {
            
        //     "productId": `${this.props.product_id? this.props.product_id : this.getID()}`

        // }
        let query_name = this.props.product_id ? this.props.product_id : this.getID();
        console.log(query_name);
        let category = this.props.category ? this.props.category : JSON.parse(sessionStorage.getItem('category')) ? this.props.initial : 'product';
        if (category === 'all') {
            category='product'
        }
        console.log(category);
        projFirestore.collection(category).doc(query_name).get()
            .then(shot => {
                let result = shot.data();
                console.log(result)
            this.setState({
                data: result,
                dataIsLoaded: true
            }); this.props.set_detailes(result); console.log(result)
          });
           
       
    }
    
    loadFromLocalStorage() {
        try {
        
        const serialisedState = sessionStorage.getItem("detailes");
            if (serialisedState === null) return undefined;
        const data = (JSON.parse(serialisedState))
            return data
        } catch (e) {
        console.warn(e);
        return undefined;
        }
    }

           
      displayImgList() {
          try {
              const { data, dataIsLoaded } = this.state;
              if (data === undefined || !dataIsLoaded) {
                  return (<div>Loading...</div>);
              } else {
                  return data.gallery.map((items, i) => {
                      return (<SmallImg key={i}
                                          
                          photo={items}
                       
                        
                      />);
                  });
              }
          } catch (e) { console.log(e) };    
                
    }

    
    getID() {
        const Object = loadFromLocalStorage();
        console.log(Object);
        return Object.fid;
    }
    


    render() {
        try {
            const { data, dataIsLoaded } = this.state;
            if (data===undefined||!dataIsLoaded) {
                return (<div>Loading...</div>);
            }
            return (
              
                <ImagesBlock>

                    <PhotoListContainer>
                        <PhotoList>
                            {this.displayImgList()}
                        </PhotoList>
                    </PhotoListContainer>
                    <BigImageContainer>
                        <BigImg img={this.props.photo} />
                    </BigImageContainer>
                    <DetailesContainer>
                   
                        <Detailes />
                    
                    </DetailesContainer>
                </ImagesBlock>
            )
        } catch (e) { console.log(e)}    
    }
}

const ImagesBlock = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 160px;
    max-height: 40vw;
    overflow-y: auto;
    scrollbar-gutter: stable;
`;
const PhotoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 9%;
    margin-left: 3%;
`;

const PhotoList = styled.ul`
list-style-type: none;
`;

const BigImageContainer = styled.div`
display: flex;
margin-right: 7%;
margin-left: 3%;
`;

const DetailesContainer = styled.div`
display: flex;
margin-left: 3%;
`;


const mapStateToProps = state => {
    
    if (!state) {
        return (console.log("error"))
    }else{
        return {
            product_id: state.productid.value,
            category: state.category.value,
            initial: state.swatchid.value
        }
    }
};
const mapDispatchToProps = { set_detailes };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
