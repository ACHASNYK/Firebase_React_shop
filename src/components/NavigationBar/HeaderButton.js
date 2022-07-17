import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { set_category } from '../../redux/category'; 
import styled, { keyframes } from "styled-components";



class HeaderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      this.setState({
        index: this.props.index
      })
    }
  }

   handleClick(e) {
     this.setState({
       index: e
     });
    
   }
  saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    sessionStorage.setItem("category", serialisedState);
  } catch (e) {
    console.warn(e);
  }
  }

  
  
    render() {
      return (
        <Link to="/" className="router_links">
          <Button link={this.props.name} onClick={(e) => {
            this.props.set_category(this.props.name);
            this.saveToLocalStorage(this.props.name);
            this.handleClick(this.props.name);
            console.log('render'+ this.state.index)
          }}>
            <Label index={this.state.index} name={ this.props.name}>{this.props.name} </Label>
            <Bottomline index={this.state.index} name={ this.props.name}></Bottomline>
          </Button>
           
        </Link>  
      );
    }
}

const Button = styled.div`
    position: relative;
    margin-bottom: -20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 3em;
    margin-left: 16px;
    text-decoration: none;
    padding: 6px;
    width: auto;
 
`;
const Label = styled.p`
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 120%;
text-align: center;
text-transform: uppercase;
&:hover {
      color: #5ECE7B;
      transition: 0.2s;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.15))
    };
color: ${props => props.name === props.index ? '#5ECE7B' : '#1D1F22'};
`;
const bot_line = keyframes`
from {
  width: 0%;
}
to {
  width: 100%
}

`;
const Bottomline = styled.div`
display: ${props => props.name === props.index ? 'block' : 'none'};
width: 60px;
margin-top: 20px;
border-bottom: 2px #5ECE7B solid;
animation: ${bot_line} 0.3s ease-in-out 1 forwards;
`;
const mapStateToProps = state => {
  return { index: state.category.value }
}

const mapDispatchToProps = { set_category };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderButton);