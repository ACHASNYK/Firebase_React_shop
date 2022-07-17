import React, { Component } from "react";
import { connect } from "react-redux";
import { set_currencyid } from "../../redux/currency";
// import { client } from '../../App';
import { currency } from '../../queries/query';
import styled from 'styled-components';
import { projFirestore } from '../../firebase/config';



class CurrSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            DataIsLoaded: false,
            value: '',
            isOpen: false,
            
        }
        this.itemRef = React.createRef();
        
    }
    
    handleCLickOutside = () => {
        
        if (this.itemRef.current&&!this.itemRef.current.contains(window.event.target)) {
            this.setState({
                isOpen:false
            }) 
        }        
    }
    
    handleClick(value, id) {
        this.setState({
            value: value,
            isOpen: false
        });
        this.props.set_currencyid(id)
    }

        
    componentDidMount() {        
        projFirestore.collection('currencies').get()
            .then(shot => {
                if (shot.empty) {
                    return "error"
                }
                let result = shot.docs[0].data();
                this.setState({
                    data: result.data,
                    DataIsLoaded: true
                });
                       
        });
    document.addEventListener("click", this.handleCLickOutside, true);
    }
    
    componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }
    
    
    render() {
        
        const { data, DataIsLoaded } = this.state;
        if (!DataIsLoaded) {
            return null;
            }
        return (
            <DropdownContainer ref={this.itemRef}>
              <HeaderContainer>
                <DropDownHeader onClick={()=>this.setState({isOpen: true}) } 
                >{this.state.value || data?.currencies[0]?.symbol}</DropDownHeader>
                    <HeaderSymbol onClick={()=>this.setState({isOpen: true})} isopen={ this.state.isOpen}>{Symbol}</HeaderSymbol>
                </HeaderContainer>
                {this.state.isOpen && (<DropDownListContainer>
                    <DropDownList>
                    {data.currencies.map((item, i) => {
                            return (
                                <ListItem   key={i} tabIndex={0} onClick={() => this.handleClick(item.symbol, i)} >{item.symbol}   {item.label}</ListItem>
                            )
                        })}
                    </DropDownList>
                </DropDownListContainer>)}
                
                
            </DropdownContainer>
        )
    }
}
const DropdownContainer = styled.div`
width: 4em;
&:hover{
    cursor: pointer;
}

`;
const HeaderContainer = styled.div`
width: 3em;
display: flex;
flex-direction: row;
justify-content: center;
`;
const HeaderSymbol = styled.div`
padding-top: 5px;
transform: ${props=> props.isopen? "matrix(1, 0, 0, -1, 0, 0)" : "none" };
`
const DropDownHeader = styled.div`

  padding: 0.2em 0.6em 0.4em 1em;
  text-align: center;
  width: 3em;
  font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
  background: #ffffff;
  `;

const DropDownListContainer = styled.div`
position:absolute;
top: 65px;
width: 8em;
z-index: 11;
filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
background: #ffffff;
&:hover{
    cursor: pointer;
}
`;
const DropDownList = styled.ul`
  padding: 0;
  margin-top: 0em;
  box-sizing: border-box;
  color: #1D1F22;
  font-size: 1rem;
  font-weight: 500;
  z-index: 11;
  &:first-child {
    padding-top: 1em;
  }
  &:hover{
    cursor: pointer;
  }
  `;
const ListItem = styled.li`
    list-style: none;
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    background: #ffffff;
    z-index: 12;
  &:hover{
    background: #EEEEEE;
  } 
  
  `; 
const Symbol = <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 3.5L4 0.5L7 3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/> */
</svg>
const mapDispatchToProps = { set_currencyid };
export default connect(null, mapDispatchToProps)(CurrSelector)