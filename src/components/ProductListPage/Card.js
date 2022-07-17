import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { set_productid } from '../../redux/productid';
import { set_imglink } from '../../redux/imglink';
import { set_modal } from '../../redux/modal';
// import { set_detailes } from '../../redux/detail_data';
import {increment_count} from '../../redux/counter';
import { setDefaultAttributes } from '../../utilities/handleAttributes';
import { ReactComponent as CircleIcon } from '../icons/circle.svg';
import styled, { keyframes } from "styled-components";





class Card extends Component {
     constructor(props) {
         super(props);
        }
    
    setShopCartLocalStorage() {
        if (this.props.attributes === undefined) {
            return null
        }
        // const attributes = setDefaultAttributes(this.props.attributes)
        const Object = {
            
            name: this.props.name,
            id: this.props.item_key,
            brand: this.props.brand,
            prices: this.props.prices,
            attributes: setDefaultAttributes(this.props.attributes),
            photo: this.props.photo,
            items_count: 1,      
            
        }
        
        if (Object.name === undefined) {
            return null
        }
        let counter=1;
        let get = [];            
        get = JSON.parse(sessionStorage.getItem('shopping_cart')) || [];
        counter= JSON.parse(sessionStorage.getItem('counter')) || 1;
        let flag = false;
        console.log(flag)
        if (get.length===0) {
            // get.push(Object);
            get.push(Object)
            
        } else {  
            get.map(element => {
          
            if (JSON.stringify(element.attributes)===JSON.stringify(Object?.attributes) && element.id===Object?.id)
             {return {...element, items_count: element.items_count +=1}, flag=true, counter +=1}
          
               
            })
            
                return !flag? (get.push(Object), counter+=1)  : null, 
                sessionStorage.setItem('shopping_cart', JSON.stringify(get)),
                sessionStorage.setItem('counter', JSON.stringify(counter));
        }      
                        
            return   sessionStorage.setItem('shopping_cart', JSON.stringify(get)),
                    sessionStorage.setItem('counter', JSON.stringify(counter));
                    
    
    }
    
    saveToLocalStorage() {
        
        const Object = {
            fid: this.props.fid,
            name: this.props.name,
            id: this.props.item_key,
            brand: this.props.brand,
            prices: this.props.prices,
            attributes: this.props.attributes,
            photo: this.props.photo,
            items_count: 1,
            choices: {},
            instock: this.props.inStock

                 
        }
           
        const serialisedState = JSON.stringify(Object);
        
        return sessionStorage.setItem("detailes", serialisedState);
                
        
        
        
    }


   
    render() {
        // console.log(this.props.fid)
        const data = this.props.prices[this.props.index];
        // const index = this.props.index;
        if (this.props.prices === undefined) {
              return null;
        }
        

        return (
            <>
                
            
                <CardContainer>
                    <Link to="/pdp" className="router_links">
                        <BannerOutofStock onClick={() => {
                            this.props.set_productid(this.props.fid);
                    this.props.set_imglink(this.props.photo[0]);
                            this.saveToLocalStorage();               
                    }}instock={this.props.instock}>
                            <Text>OUT OF STOCK</Text>
                        </BannerOutofStock>
                    </Link>

                <CardMain instock={ this.props.instock }>
                    
                        
                    <CircleContainer onClick={() => {this.setShopCartLocalStorage(); this.props.increment_count() }}>
                                <CircleIcon />
                            </CircleContainer>
                
                    {/* <Modal show = {this.state.show} handleClose = {this.hideModal}/> */}
                    <Image >
                     <Link to="/pdp" className="router_links">       
                        <Photo  onClick={() => {
                    this.props.set_productid(this.props.fid);
                    this.props.set_imglink(this.props.photo[0]);
                        this.saveToLocalStorage();
                        
                    
                }}alt="product_img" src={this.props.photo[0]}/>
                                
                            
                        </Link>
                    </Image>
                    
                    <CardTitle>
                            {this.props.brand}    {this.props.name}
                    </CardTitle>
                    <CardPrice>
                         {data.currency.symbol}{data.amount}
                    </CardPrice>
                    
                </CardMain>
            </CardContainer>           
        </>
        )
       
    
    }
  
}

const CardContainer = styled.div`
margin-right: 40px;
    margin-top: 10px;
    margin-bottom: 60px;
    width: 387px;
    height: 445px;
display: flex;
position: relative;
&:hover {
        transition: 0.3s;
        filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.23));
    }

`;
const CardMain = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    width: 386px;
    height: 444px;
    background: #ffffff;
    text-decoration: none;
   
    &:hover {
        transition: 0.3s;
        filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.23));
    }
`;
const BannerOutofStock = styled.div`
    display: ${props=>props.instock? 'none' : 'flex' };
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #ffffff;
    opacity: 0.5; 
    height: 444px;
    width: 386px;
    /* align-items: center; */
    justify-content: center;
    z-index: 2;
`;

const Text = styled.div`
    display: ${props=>props.instock? 'none' : 'flex'};
    position: absolute;
    /* top: 50%;
    left: 50%; */
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    color: #1D1F22;
    /* #8D8F9A */
    opacity: 1;
    z-index: 2;
    margin-top: 40%;
    /* align-items: center; */
    /* justify-content: center; */
`;
const CircleContainer = styled.div`
display: none;
position: absolute;
right: 31px;
bottom: 85px;
z-index: 2;
width: 52px;
height: 52px;
${CardMain}:hover & {
    display: block;
    transition: 0.4s;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.15));
}
&:hover{
    cursor: pointer;
}
&:active{
    transform: scale(0.94);
    filter: drop-shadow(0px 1px 2px rgba(29, 31, 34, 0.15));
}
`;


const Image = styled.div`
/* height: 330px;
width: 354px; */
position: relative;
top: 16px;
left: 16px;


`;

const Fade = keyframes`
  
    from {
        opacity: .4
    }

    to {
        opacity: 1
    }

`;

const Photo = styled.img`
    position: relative;
    width: 354px;
    height: 330px;
    object-fit: contain;
    align-self: stretch;
    animation: ${Fade} 0.3s ease-in forwards;
    transition: all ease-in-out 0.5s;

    &:hover{
        transform: scale(1.08);
    }
    
`;

const CardTitle = styled.div`
    position: relative;
    margin-top: 24px;
    margin-left: 16px;
    text-decoration: none;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    
    align-items: center;
    color: #1D1F22;;

`;

const CardPrice = styled.div`
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 160%;
margin-top: 5px;
margin-left: 16px;
color: #1D1F22;
`;
const mapStateToProps = state => {
    return {
        index: state.currencyid.value,
        
    }
}

const mapDispatchToProps = { set_productid, set_imglink, set_modal, increment_count};
export default connect(mapStateToProps, mapDispatchToProps )(Card)