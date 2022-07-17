import React, { Component } from "react";
import { Link } from "react-router-dom";
import BigCartItemsList from "./BigCartItemsList";
// import CartItemsList from './CartItemsList'
import {increment_count, decrement_count} from '../../redux/counter';
import { connect } from 'react-redux';
import { totalAmount } from '../../utilities/countershandler';
import styled from "styled-components";



class ShopCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            
        }
    }

    
    displayItemsList = () => {
        const data = this.state.data;

        if (data===undefined) {
            return ("Loading...")
        }
        return data?.map((e, i) => {
            return (<BigCartItemsList
                key={i}
                id={e.id}
                brand={e.brand}
                name={e.name}
                prices={e.prices}
                attributes={e.attributes}
                choices={e.choices}
                photo={e.photo}
                count={e.items_count}
                data={data }
                incrementItemsCount = {this.incrementItemsCount}
                decrementItemsCount = {this.decrementItemsCount}
            />)
        }    
                

        )
        

    }

    incrementItemsCount= (e) => {
        console.log(e)
        let data = this.state.data;
        let counter = JSON.parse(sessionStorage.getItem('counter'));
        data?.map(item => {
            if (item.id === e) {
                   sessionStorage.setItem('counter', JSON.stringify(counter +=1) );
                return {...item, items_count: item.items_count+=1};
            }
          console.log("increment", data)   
        })
        return sessionStorage.setItem('shopping_cart', JSON.stringify(data)), console.log(data), this.props.increment_count();
    }

    decrementItemsCount = (e) => {
        console.log(e)
        let data = this.state.data;
        let counter = JSON.parse(sessionStorage.getItem('counter'));
        data?.map(item => {
            if(item.id=== e && item.items_count>=2) {
                sessionStorage.setItem('counter', JSON.stringify(counter-=1));
                return {...item, items_count: item.items_count-=1 };
            }
            else if(item.id===e && item.items_count===1){
                sessionStorage.setItem('counter', JSON.stringify(counter-=1));
                data.splice(data.indexOf(item), 1);
                console.log("erase". data)
            }
            console.log("decrement", data)
        })  
      return  sessionStorage.setItem('shopping_cart', JSON.stringify(data)), console.log(data), this.props.decrement_count();
     
    }
    
    handleOrder() {
        sessionStorage.setItem('shopping_cart',JSON.stringify([]));
        sessionStorage.setItem('counter', JSON.stringify(0));
        this.props.increment_count();
        alert('Thank you to purchase with us!');
    }
    componentDidUpdate(prevProps) {
        if (this.props.counter !== prevProps.counter) {
            this.setState({data: JSON.parse(sessionStorage.getItem("shopping_cart" || []))})
        }
    }

    componentDidMount() {
        this.setState({data: JSON.parse(sessionStorage.getItem("shopping_cart" || []))})
    }
    render() {
        
        const { amount, symbol } = totalAmount(this.state.data, this.props.index);
        const counter = JSON.parse(sessionStorage.getItem('counter'))
            
        
        return (
        
        <BigCartContainer>
            <BigCartTitle>CART</BigCartTitle>
            <BigCartItemsListContainer>
                <BigItem>
                    {this.displayItemsList()}
                </BigItem>
            </BigCartItemsListContainer>
              <BigCartTotalAmountBox>
                    <AmountBox>
                            <AmountTax>
                                <TaxLabel>Tax 21%:</TaxLabel><TaxValue>{(amount/100*21).toFixed(2) }</TaxValue>
                            </AmountTax>
                            <ItemsQuantity>
                                <QuantityLabel>Quantity: </QuantityLabel>
                                <QuantityCounter>{counter}</QuantityCounter>
                            </ItemsQuantity>
                            <Total>
                                <TotalLabel>Total:</TotalLabel>
                                <TotalAmount>{symbol} {amount}</TotalAmount>
                            </Total>

                    </AmountBox>
                            
                    <ButtonToOrder onClick={()=>{this.handleOrder()}}>ORDER</ButtonToOrder>
                    <Link to="/" className="router_links">
                        <ButtonToReturn>CONTINUE SHOPPING</ButtonToReturn>
                    </Link>
                </BigCartTotalAmountBox>
                
            </BigCartContainer>
        )

    }
}

const BigCartContainer = styled.div`
display: flex;
flex-direction: column;
width: 90%;
height: 44vw;
margin-top: 80px;
margin-left: 100px;
margin-right: 100px;

`;
const BigCartTitle = styled.div`
    
    top: 80px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    color: #1D1F22;

`;
const BigCartItemsListContainer = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
height: 27vw;
width: 100%;
overflow-y: auto;

`;

const BigItem = styled.div`
max-height: 336px;
display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;

`;

const BigCartTotalAmountBox = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

width: 280px;
height: auto;

position: absolute;
bottom: 4%;
`;

const AmountBox = styled.div`
display: flex;
position: relative;
margin-left: 0;
width: 100%;
flex-direction: column;
gap: 10px;
align-items: flex-start;
`;
const AmountTax = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
align-items: flex-start;
`;
const TaxLabel = styled.div`
font-family: 'Raleway';
font-style: normal;
width: 100px;
font-weight: 400;
font-size: 24px;
line-height: 28px;
color: #1D1F22;
text-align: left;
`;
const TaxValue = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #1D1F22;
`;
const ItemsQuantity = styled.div`
display: flex;
flex-direction: row;
gap: 10px;

align-items: flex-start;
`;
const QuantityLabel = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 24px;
width: 100px;
line-height: 28px;
color: #1D1F22;
text-align: left;
`;
const QuantityCounter = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #1D1F22;
`;
const Total = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
align-items: flex-start;
`;
const TotalLabel = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 28px;
width: 100px;
color: #1D1F22;
text-align: left;
`;
const TotalAmount = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #1D1F22;
`;

const ButtonToOrder = styled.div`
display: flex;
position: relative;
margin-top: 20px;
height: 43px;
width: 100%;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 14px;
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
const ButtonToReturn = styled.div`

margin-top: 10px;
display: flex;
position: relative;
height: 43px;
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
        filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.15));
        cursor: pointer;
        /* 168, 172, 176, 0.23 */
    }

&:active {
    transform: scale(0.98);
    filter: drop-shadow(0px 1px 2px rgba(29, 31, 34, 0.15));
}
`;


const mapStateToProps = (state) => {
    return {
        counter: state.counter.value,
        index : state.currencyid.value
        
    }
    
};

const mapDispatchToProps = {increment_count, decrement_count};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)
