import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import { set_detailes } from '../../redux/detail_data';
import { setDefaultAttributes} from '../../utilities/handleAttributes'
import styled, { css} from "styled-components";

class Attributes extends Component {
    constructor(props) {
        super(props);
        
    }
      
    setAttributes = (propname, value, data) => {
       
        const newData = data.map(obj => {
            if (obj.name === `${propname}`) {
                return { ...obj, id: value };
            }
                return obj;                
        });
        
        const storage = { ...this.props?.data, attributes: newData } 
      
        this.props.set_detailes(storage);
    }
    
    
    
    
    
    render() {
        const data = setDefaultAttributes(this.props?.data?.attributes)
        return (<AttributesContainer>
            {data?.map((element, i) => {
                if (element.type === "swatch") {
                        
                    return (<SwatchContainer key={i}>
                        <SwatchName>{element.name}</SwatchName>
                        <SwatchElement>{element.items.map((e, i) => {
                            return (
                                <AttributesSwatch id={element.id} value={e.value}
                                    key={i}
                                    name={element.name}
                                    onClick={() => this.setAttributes(element.name, e.value, data)}
                                    style={{ background: `${e.value}` }} >
                                </AttributesSwatch>)
                        })}</SwatchElement>

                                                  
                    </SwatchContainer >);
                } else {
                   
                    
                    return (<SwatchContainer key={i}>

                        <SwatchName>{element.name}</SwatchName>
                        <SwatchElement>{element.items.map((e, i) => {
                                
                            
                            return (<AttributesText id={element.id} value={e.value}
                                key={i}
                                name={element.name}
                                onClick={() => this.setAttributes(element.name, e.value, data)
                                }>
                                {e.value}
                            </AttributesText>)
                        })}</SwatchElement>
                    </SwatchContainer >);
                    
                }
            
                }
            )
            }</AttributesContainer>)

    }   
    
}

const AttributesContainer = styled.div`
display: flex;
flex-direction: column;

`;

const SwatchContainer = styled.div`
display: flex;
flex-direction: column;

margin-bottom: 20px;
`;
const SwatchName = styled.div`
font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 18px;
color: #1D1F22;

`;
const SwatchElement = styled.ul`
cursor: pointer;
list-style: none;
display: flex;
flex-direction: row;
padding: 5px;
margin-top: 8px;
margin-left: 0px;
gap:5px;
align-items: center;
justify-content: space-around;
`;
const AttributesSwatch = styled.div`
    display: flex;
    height: 31px;
    width: 31px;
    margin-right: 5px;
    border: #1D1F22 0.5px solid;
    ${props => props.id === props.value && css`
        border: #ffffff 3px solid;
        outline: 1px solid #5ECE7B;
    `}
`;
const AttributesText = styled.div`
  /* box-sizing: border-box; */
    display: flex;
    width: 63px;
    height: 45px;
    border: 1px solid #1D1F22;
    margin-right: 10px;
    
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.05em;
     color: #1D1F22;
     ${props => props.id === props.value && css`
        background-color: #1D1F22;
        color: white;     
     `}
`;


const mapStateToProps = state => {
    return { data: state.detailes.value }
  
};
const mapDispatchToProps = { set_detailes };
export default connect(mapStateToProps, mapDispatchToProps)(Attributes)