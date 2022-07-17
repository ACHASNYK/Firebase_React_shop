import React, {Component} from "react";
import Card from "./Card";
// import { client } from "../../App";
import { connect } from "react-redux";
// import { allProducts } from "../../queries/query";
import Title from './Title';
import styled from "styled-components";
import { projFirestore } from '../../firebase/config';


class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            DataIsLoaded: false,
        }
    }              
    
       
     
    
    componentDidMount() {
        // const query_variable = {
            // "input": {
            // "title": `${this.props.cat_name? this.props.cat_name : this.loadFromLocalStorage()? this.loadFromLocalStorage(): this.props.initial_cat_name}`
            // }
        // }
        
        let query_name = this.props.cat_name ? this.props.cat_name : this.loadFromLocalStorage() ? this.loadFromLocalStorage() : this.props.initial? this.props.initial: 'product';
            if (query_name === 'all') {
                query_name = 'product'
            }
            console.log(query_name)
    
        // client.query({ query: allProducts, variables: query_variable })
        //     .then(result => {
        //     this.setState({
        //         data: result.data,
        //         DataIsLoaded: true
        //     })
                
        // });
        projFirestore.collection(query_name).get().then((shot) => {
            if (shot.empty) {
                return 'error'
            }
            let result = [];
            
            shot.docs.map(doc => result.push({...doc.data(), fid: doc.id }));
            this.setState({
                data: result,
                DataIsLoaded: true
            });
        })
        
    }
    
    
    loadFromLocalStorage() {
    try {
        const serialisedState = sessionStorage.getItem("category");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
        } catch (e) {
            console.warn(e);
        return undefined;
        }
    }
    
    
    displayList() {
        
        try{
            const { data, DataIsLoaded } = this.state;
            
            if (!DataIsLoaded) {
                return (<div>Loading...</div>)
            } else {
               
                return data.map((items, i) => {
                    return (<div className="card_list" key={i}><Card
                        fid={items.fid }
                        item_key={items.id}
                        photo={items.gallery}
                        name={items.name}
                        brand={items.brand}
                        attributes={items.attributes}
                        prices={items.prices}
                        instock={items.inStock}
                    /></div>); 
                })
            }
        }
        catch (e) { console.log(e) }
    }
    
    
    render() {
         
      return (
        <> 
            <Title name={this.props.cat_name} initial_name={this.props.initial_cat_name } />
              <PLP>   
                <CardList>
                    <List>
                        {this.displayList() }
                    </List>
                </CardList>
              </PLP>
        </>
      );
    }
  
}

const PLP = styled.div`
    margin-top: 20px;
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow-y: auto;
    max-height: 750px;

`;

const CardList = styled.div`
    position: relative;
    display: inline-flex;
    list-style: none;
    text-decoration: none;
    margin-top: 250px;
    margin-left: 60px;
    

`;
const List = styled.ul`
    list-style-type: none;
    margin-left: 0;
    margin-right: 40px;
    margin-bottom: 100px;

`;

const mapStateToProps = state => {
    if (!state) {
        return (console.log("error"))
    }else{
        return {
            cat_name: state.category.value,
            index: state.currencyid.value,
            initial: state.swatchid.value
            
        }
    }
};

export default connect(mapStateToProps, null)(Main);