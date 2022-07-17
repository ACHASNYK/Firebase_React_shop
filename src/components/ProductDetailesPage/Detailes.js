import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {increment_count, decrement_count} from '../../redux/counter';
// import { set_imglink } from '../../redux/imglink';
// import parse from 'html-react-parser';
import Attributes from "./Attributes";
// import { setShopCartLocalStorage } from "./setLocalStorage";
import {setDefaultAttributes} from '../../utilities/handleAttributes';
import styled from "styled-components";
import { Interweave } from 'interweave';


class Detailes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
        
    }

   
    
    
    setShopCartLocalStorage() {
        const data = this.props.data
    if (data.attributes === undefined) {
            return null
        }
        
        // const attributes = setDefaultAttributes(data.product.attributes);
        
        const Object = {
            
            name: data.name,
            id: data.id,
            brand: data.brand,
            prices: data.prices,
            attributes: setDefaultAttributes(data.attributes),
            photo: data.gallery,
            items_count: 1,
            
            
            
        }
        if (Object.name === undefined) {
            
            return null
        }
        let counter=0;
        let get = [];            
        get = JSON.parse(sessionStorage.getItem('shopping_cart')) || [];
        counter= JSON.parse(sessionStorage.getItem('counter')) || 0;
        let flag = false;
        console.log(flag)
        if (get.length===0) {
            
            return get.push(Object), increment_count(), counter += 1,
                sessionStorage.setItem('shopping_cart', JSON.stringify(get)),
                sessionStorage.setItem('counter', JSON.stringify(counter));
        } else {  
            get.map(element => {
          
            if (JSON.stringify(element.attributes)===JSON.stringify(Object?.attributes) && element.id===Object?.id)
             {return {...element, items_count: element.items_count +=1}, flag=true, counter +=1, increment_count()}
            // else   {console.log(element)  }
               
            })
            
                if (!flag) {get.push(Object); counter+=1; increment_count()} else 
                {sessionStorage.setItem('shopping_cart', JSON.stringify(get));
                sessionStorage.setItem('counter', JSON.stringify(counter))}
        }      
                        
               {sessionStorage.setItem('shopping_cart', JSON.stringify(get));
               sessionStorage.setItem('counter', JSON.stringify(counter))}
    
    }
       
        
        
    

       
    render() {
        
        const data = this.props.data;
        if (data=== undefined) {
        return null    
         } 
        return (

            <DetailesContainer>
                <ProductBrand>
                   {data.brand}
                </ProductBrand>
                <ProductName>
                    {data.name}
                </ProductName>
                <AttributesContainer>
                    <Attributes />
                </AttributesContainer>
                <ProductPriceContainer>
                    <PriceName>
                        Price
                    </PriceName>
                    <PriceAmount>
                        {data.prices[this.props.index].currency.symbol}
                        {data.prices[this.props.index].amount}
                    </PriceAmount>
                </ProductPriceContainer>
                <ButtonContainer>
                    <ButtonToCart onClick={() =>
                    { this.setShopCartLocalStorage(); this.props.increment_count() }} >
                      ADD TO CART
                    </ButtonToCart>
                    <ButtonDisabled instock={data.inStock}>
                            OUT OF STOCK
                        </ButtonDisabled>
                </ButtonContainer>    
                 
                    <Link to="/" className="router_links">
                        <ButtonToReturn >CONTINUE SHOPPING</ButtonToReturn>
                    </Link>
                
                <ProductDescription>
                         <Interweave content={data.description}/>            
                </ProductDescription>
            </DetailesContainer>
        )
    }

}

const DetailesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 292px;
    
`;

const ProductBrand = styled.div`
    display: flex;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    color: #1D1F22;
`;

const ProductName = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 27px;
color: #1D1F22;
margin-top: 16px;
`;

const AttributesContainer = styled.div`
display: flex;
margin-top: 43px;

`;

const ProductPriceContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 30px;
`;
const PriceName = styled.div`
font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 18px;
color: #1D1F22;
`;

const PriceAmount = styled.div`
display: flex;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 18px;
color: #1D1F22;
margin-top: 10px;
`;
const ButtonContainer = styled.div`
margin-top: 20px;
position: relative;
height: 52px;
width: 100%;
`;

const ButtonToCart = styled.div`

display: flex;
position: relative;

height: 52px;
width: 100%;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 120%;
text-transform: uppercase;
color: #ffffff;
cursor: pointer;
background-color: #5ECE7B;
&:hover {transition: 0.2s;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.15));
};

&:active {
    transform: scale(0.96);
    filter: drop-shadow(0px 1px 2px rgba(29, 31, 34, 0.15));
}
align-items: center;
justify-content: center;
`;

const ButtonDisabled = styled.div`
display: flex;
position: absolute;
top: 0;
left: 0;
height: 52px;
width: 100%;
display: ${props => props.instock ? 'none' : 'flex'};
background-color: #ffffff;
opacity: 0.8;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 160%;
color: rgba(29, 31, 34, 1);
align-items: center;
justify-content: center;
    z-index: 3;
`;

const ButtonToReturn = styled.div`
margin-top: 30px;
display: flex;
position: relative;
height: 52px;
width: 100%;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 120%;
text-transform: uppercase;
border: 1px solid #1D1F22;
align-items: center;
justify-content: center;
background-color : #ffffff ;
&:hover {
        transition: 0.2s;
        filter: drop-shadow(0px 4px 35px rgba(29, 31, 34, 0.15));
        
    }

&:active {
    transform: scale(0.98);
    filter: drop-shadow(0px 1px 2px rgba(29, 31, 34, 0.15));
}
`;

const ProductDescription = styled.div`
margin-top: 30px;
display: flex;
position: relative;
width: fit-content;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 159.96%;
color: #1D1F22;
`;


const mapStateToProps = state => {
    return {
        data: state.detailes.value,
        index: state.currencyid.value,
    }
};
const mapDispatchToProps = {increment_count};

export default connect(mapStateToProps, mapDispatchToProps)(Detailes)