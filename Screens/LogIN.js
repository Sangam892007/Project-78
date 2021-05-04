import react from 'react'
import {View, Text, TouchableOpacity, TextInput, Modal, Alert, ScrollView,} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import React from 'react'

export default class LogIN extends React.Component{
    constructor(){
        super()
        this.state = {
            UserID:'',
            Password:'',
            FirstName:'',
            LastName:'',
            PhoneNo:'',
            Address:'',
            ConfirmPassword:''
        }
    }
    ModalScreenPopUp = ()=>{
        return(
            <Modal animationType = "fade"
            transparent = {true}
            visible = {this.state.isModalVisible}>
                <View style = {{
                    flex:1,
                    borderRadius:25,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:"black",
                    marginLeft:30,
                    marginTop:80,
                    marginBottom:80,
                    marginRight:30,
                }}>
                    <ScrollView style = {{width:"100%"}}>
                        <Text style = {{color:"yellow",marginLeft:60,fontWeight:"bold",fontSize:30}}>
                            REGISTER HERE
                        </Text>
                        <View style = {{flex:0.7}}>
                        <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} 
                        placeholderTextColor='yellow' placeholder = {"First Name"} onChangeText = {Text=>{
                            this.setState({
                                firstName:Text
                            })
                        }}>
                        </TextInput>
                         <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} 
                         placeholderTextColor='yellow' placeholder = {"Last Name"} onChangeText = {Text=>{
                            this.setState({
                                lastName:Text
                            })
                        }}>   
                        </TextInput>
                         <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} 
                         placeholderTextColor='yellow' placeholder = {"Address"} onChangeText = {Text=>{
                            this.setState({
                                address:Text
                            })
                        }}>   
                        </TextInput>
                         <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} 
                         placeholderTextColor='yellow' placeholder = {"Phone NO."} onChangeText = {Text=>{
                            this.setState({
                                phoneNo:Text
                            })
                        }}>   
                        </TextInput>
                         <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} 
                         placeholderTextColor='yellow' keyboardType = {'email-address'} placeholder = {"Email ID"} onChangeText = {Text=>{
                            this.setState({
                                EmailID:Text
                            })
                        }}> 
                        </TextInput>  
                        <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} secureTextEntry = {true} 
                         placeholderTextColor='yellow' placeholder = {"Password"} onChangeText = {Text=>{
                            this.setState({
                                Password:Text
                            })
                        }}>   
                        </TextInput>
                         <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:20,marginBottom:10}} secureTextEntry = {true} 
                         placeholderTextColor='yellow' placeholder = {"Confirm password"} onChangeText = {Text=>{
                            this.setState({
                                confirmPassword:Text
                            })
                        }}>   
                        </TextInput>
                        </View>
                        <View style = {{flex:0.3,flexDirection:"row"}}>
                            <TouchableOpacity style = {{width:100,height:30,backgroundColor:"black",marginTop:10,justifyContent:"center",alignItems:"center",}} 
                            onPress = {()=>{
                                this.SignUp();
                            }}>
                                <Text style = {{color:"yellow",marginLeft:30}}>
                                    REGISTER
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style = {{width:100,height:30,backgroundColor:"black",marginTop:10,justifyContent:"center",alignItems:"center",marginLeft:80,marginTop:-25,marginLeft:190}} onPress = {()=>{
                                this.setState({
                                    isModalVisible:false
                                })
                            }}>
                                <Text style = {{color:"yellow"}}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    Login = async()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.UserID, this.state.Password)
        .then(()=>{
            return alert("Successfully Loged IN")
        })
        .catch((error)=>{
            var errorCode = error.code ;
            var errorMsg = error.message;
            return alert(errorMsg)
        })
    }
    componentDidMount(){
        this.Login()
        this.SignUp()
    }
    SignUp = async()=>{
        if (this.state.Password !== this.state.confirmPassword){
            alert('Please Enter the Correct Password');
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(this.state.EmailID,this.state.Password)
            .then(()=>{
                db.collection('USERS').add({
                    First_Name:this.state.firstName,
                    Last_Name:this.state.lastName,
                    Address:this.state.address,
                    Phone_No:this.state.phoneNo,
                    Email_ID:this.state.EmailID,
                })
                return(Alert.alert("You have succesfully created an account",'',[{
                    text:"OK",
                    onPress:()=>{
                        this.setState({
                            isModalVisible:false
                        })
                    }
                }]))
            })
            .catch(error=>{
                alert(error.code);
            })
        }
    }
    render(){
        return(
            <View style = {{flex:1,justifyContent:"center",backgroundColor:"black"}}>
                <Text style = {{color:"yellow",justifyContent:"center",alignItems:"center",textAlign:"center",alignSelf:"center",fontSize:60,width:"100%",borderWidth:4,borderRadius:3,borderColor:"yellow"}}>
                    WELCOME TO BARTER-SYSTEM APP
                </Text>
                <View style = {{justifyContent:"center",alignItems:"center",}}>
                    {this.ModalScreenPopUp()}
                </View>
                <View style = {{flex:0.9}}>
                    <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:200,marginBottom:10}}
                     placeholder = {"Enter Your Email address"} placeholderTextColor = "yellow" keyboardType = {'email-address'}
                    onChangeText = {(text)=>{
                        this.setState({
                            UserID:text,
                        })
                    }}/>
                    <TextInput style = {{alignItems:"center",alignSelf:"center",fontSize:30,color:"yellow",borderWidth:3,borderColor:"yellow",width:500,height:50,padding:10,marginTop:10,marginBottom:10}} 
                    placeholder = {"Enter Your Password"} placeholderTextColor = "yellow" secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            Password:text,
                        })
                    }}/>
                    <TouchableOpacity style = {{backgroundColor:"yellow",width:100,height:35,alignItems:"center",alignSelf:"center",justifyContent:"center",fontSize:20,borderRadius:10}} 
                    onPress = {()=>{
                        this.Login()
                    }}>
                        <Text>
                            Log IN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginTop:20,backgroundColor:"yellow",width:100,height:35,alignItems:"center",alignSelf:"center",justifyContent:"center",fontSize:20,borderRadius:10}} 
                    onPress = {()=>{
                        this.ModalScreenPopUp()
                        
                    }}>
                        <Text>
                           Sign UP?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}