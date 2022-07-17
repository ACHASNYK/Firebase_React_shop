import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { set_modal } from '../../redux/modal';
import CartItemsList from "./CartItemsList";
import styled, {css } from "styled-components";
import { increment_count, decrement_count } from '../../redux/counter';
import { totalAmount } from '../../utilities/countershandler';


class ModalDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            counter: 0,
            dataIsloaded: false,
        }
        this.itemRef = React.createRef();
    }
    
    incrementItemsCount = (e) => {
        
        let data = this.state.data;
        let counter = JSON.parse(sessionStorage.getItem('counter'));
        data?.map(item => {
            if (item.id === e) {
                sessionStorage.setItem('counter', JSON.stringify(counter += 1));
                return { ...item, items_count: item.items_count += 1 };
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
            if (item.id === e && item.items_count >= 2) {
                sessionStorage.setItem('counter', JSON.stringify(counter -= 1));
                return { ...item, items_count: item.items_count -= 1 };
            }
            else if (item.id === e && item.items_count === 1) {
                sessionStorage.setItem('counter', JSON.stringify(counter -= 1));
                data.splice(data.indexOf(item), 1);
                console.log("erase".data)
            }
            console.log("decrement", data)
        })
        return sessionStorage.setItem('shopping_cart', JSON.stringify(data)), console.log(data), this.props.decrement_count();
    }

    displayItemsList() {
        const { data, dataIsloaded } = this.state;
        try {
            if (data === undefined || !dataIsloaded) {
                return (<div>Loading...</div>)
            }
            return data?.map((e, i) => {
            
                return (<CartItemsList
                    key={i}
                    id={e.id}
                    brand={e.brand}
                    name={e.name}
                    prices={e.prices}
                    attributes={e.attributes}
                    choices={e.choices}
                    photo={e.photo}
                    items={e.items_count}
                    incrementItemsCount={this.incrementItemsCount}
                    decrementItemsCount={this.decrementItemsCount}
                />)
            })
        } catch (e) { console.log(e)}
    }

    handleCLickOutside = () => {
        
        if (this.itemRef.current&&!this.itemRef.current.contains(window.event.target)) {
            this.props.set_modal(false);
        }        
    }

    

    componentDidUpdate(prevProps) {
        if (this.props.counter !== prevProps.counter) {
            this.setState({
                counter: this.props.counter,
            })
        }

    }
        
    componentDidMount() {
            
        this.setState({
            data: JSON.parse(sessionStorage.getItem('shopping_cart')) || [],
            counter: sessionStorage.getItem('counter') || 0,
            dataIsloaded: true,
        });
        
        document.addEventListener("click", this.handleCLickOutside, true); console.log('rendered');
    }

    componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
    }
    
    render() {
        const { amount, symbol } = totalAmount(this.state.data, this.props.index);
        return (

            <ModalDisplayFrame ref={this.itemRef} modal={this.props.modal }>
                    <ModalTitle>My Bag, {this.state.counter}  items</ModalTitle>
                    <ModalItemsList>
                        {this.displayItemsList()}
                    </ModalItemsList>
                    <ModalTotalPrice>
                        <PriceLabel>
                                Total
                        </PriceLabel>
                        <PriceAmount>
                            {symbol}  { amount }
                        </PriceAmount>

                    </ModalTotalPrice>
                    <ModalButtonGroup>                        
                        <Link to="/shopcart" className="router_links_cart">
                            <ButtonToBag onClick={() => { this.props.set_modal(false) }}>VIEW BAG</ButtonToBag>
                        </Link>
                        <ButtonCheckOut onClick={() => { this.props.set_modal(false); alert('Thank you for your shopping!' ) }}>CHECK OUT</ButtonCheckOut>
                    </ModalButtonGroup>
                </ModalDisplayFrame>
        )
    }

}
const ModalDisplayFrame = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    margin-top: 40px;
    right: 60px;
    height: 677px;
    width: 325px;
    z-index: 5;
`;

const ModalTitle = styled.div`
font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    text-align: right;
    color: #1D1F22;
    margin-bottom: 30px;
`;

const ModalItemsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 296px;
    max-height: 420px;
    gap: 40px;
    padding-left: 12px;
    padding-right: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-right: 2px;
     ::-webkit-scrollbar {  
     width: 8px;  
    }; 
    ::-webkit-scrollbar-track { 
    background-color: transparent; 
    border-radius: 100px;
    };

    ::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 100px; 
    };
    &:hover{
        ::-webkit-scrollbar-track { 
    background-color: #e4e4e4;
        }
    };
    scrollbar-gutter: stable;
     
`;

const ModalTotalPrice = styled.div`
    margin-top: 30px;
    display: flex;
    height: 28px;
    width: 100%;
    justify-content: space-between;
`;

const PriceLabel = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #1D1F22;
    margin-left: 16px;
`;

const PriceAmount = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    color: #1D1F22;
    margin-right: 16px;
`;

const ModalButtonGroup = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    gap:12px;
`;
const ButtonToBag = styled.div`
    cursor: pointer;
    width: 140px;
    height: 43px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #1D1F22;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    background-color:#ffffff;
    text-transform: uppercase;
    color: #1D1F22;
    text-transform: uppercase;
&:hover {
        transition: 0.2s;
        filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.15));
        
    };

&:active {
    transform: scale(0.96);
    filter: drop-shadow(0px 1px 2px rgba(29, 31, 34, 0.15));
};
`;

const ButtonCheckOut = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 140px;
    height: 43px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #ffffff;
    text-transform: uppercase;
    background: #5ECE7B;
&:hover {
        transition: 0.2s;
        filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.15));
        
    };

&:active {
    transform: scale(0.96);
    filter: drop-shadow(0px 1px 2px rgba(29, 31, 34, 0.15));
};

`;

const mapStateToProps = state => {
    return {
        modal: state.modal.value,
        index: state.currencyid.value,
        counter: state.counter.value
    }
};
const mapDispatchToProps = { set_modal, increment_count, decrement_count };
    
export default connect(mapStateToProps, mapDispatchToProps)(ModalDisplay)