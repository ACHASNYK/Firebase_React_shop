import React, {Component} from "react";
// import { allCatQuery } from "../../queries/query";
import HeaderButton from './HeaderButton';
import CurrSelector from "./CurrSelector";
// import { client } from "../../App";
import Modal from "./Modal";
import {set_swatchid} from '../../redux/swatchid'
import CartDisplayButton from "./CartDisplayButton";
import styled from "styled-components";
import { ReactComponent as ShopLogo } from '../icons/shop.svg'
import { connect } from 'react-redux';
import {projFirestore } from '../../firebase/config'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataIsLoaded: false,
            data: {},
          };
    }

  componentDidMount() {

    projFirestore.collection('categories').get().then((snapshot) => { 
      if (snapshot.empty) {
        return <div>erorr</div>
      } else {
        console.log(snapshot.docs)
        let result = snapshot.docs[0].data();
        result && this.props.set_swatchid(result.categories[0]);
        result && this.setState({
          data: result.categories,
          DataIsLoaded: true,
        });
        
        // snapshot.docs.forEach(doc => result.push({ ...doc.data() }));
         

      };
    })

      //   client.query({ query: allCatQuery })
      // .then(result => {
      //   this.setState({
      //     data: result.data,
      //     DataIsLoaded: true,
      //     modal: this.props.modal
      //   }); set_swatchid(result.data.categories[0].name);
      // });
    }

    displayList(){
        const { data, DataIsLoaded } = this.state;
     
        if(!DataIsLoaded) {
            return(<div>Loading...</div>)
        } else {
          
          return data.map((items, i) => {
                        
            return ( <HeaderButton 
                    key={i}
                    name = {items}
                    link = {items}
                    />);
                
            })
      } 
    }
    
    
    
    render() {
      document.body.style.overflowY = "hidden";
      
     this.props.set_swatchid(this.state.data[0])
      return (
        <NavbarMain modal={ this.props.modal} >
         <ButtonGroup>            
                {this.displayList() }            
          </ButtonGroup>
          <ShopLogo/>
          <ActionGroup modal={this.props.modal }>
            <CurrSelector/>
            <CartDisplayButton />
          </ActionGroup>
          <Modal/>
        </NavbarMain>
      );
    }
  
}

const NavbarMain = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center ;
    z-index: 5;
    height: 80px;
    width: 100%;
    left: 0px;
    top: 0px;
    background: #FFFFFF;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  z-index: 5;
  padding-left: 100px;
`;


const ActionGroup = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: auto;
    margin-right: 8em;
    background: #ffffff;
    z-index: 5;
`;

const mapStateToProps = state => {
  
    
  if (!state) {
    return (console.log("error"))
  } else {
    return {
      modal: state.modal.value,
            
    }
    
  }
  
}
const mapDispatchToProps = {set_swatchid}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);