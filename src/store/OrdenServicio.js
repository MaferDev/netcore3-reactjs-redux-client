import Axios from "axios"

export const actionState= {
    NEW_REQUEST :'NEW_REQUEST',
    RESPONSE_ERROR :'RESPONSE_ERROR',
    RESPONSE_SUCCESS :'RESPONSE_SUCCESS',
    RESPONSE_REGISTER_ATC :'RESPONSE_REGISTER_ATC',
    ADD_PAYMENT_METHOD :'ADD_PAYMENT_METHOD',        
    DELETE_PAYMENT_METHOD :'DELETE_PAYMENT_METHOD',        
    REGISTER_PAYMENT :'REGISTER_PAYMENT',
    ADD_FORM_TOKEN :'ADD_FORM_TOKEN',
    RESET_STATE :'RESET_STATE',
}
const initialState = {isTicketCreated:false}

const urlAPI = 'api/OrdenServicio/'
export const actionCreators={
    RegisterAtencion: dataRegistro => (dispatch)=>{
        dispatch({type:actionState.NEW_REQUEST})        
        Axios.post(urlAPI+"registrar",dataRegistro).then(res=>{        
          const data = {...res.data, status:res.status}
          dispatch({type:actionState.RESPONSE_REGISTER_ATC,data})

          const message=res.data.mensaje
          dispatch({type:actionState.RESPONSE_SUCCESS,message})

        }).catch(err=>{
          const message=err.message
          dispatch({type:actionState.RESPONSE_ERROR,message})
        })
    },
    LoadDataTiket: data => (dispatch)=>{
        dispatch({type:actionState.NEW_REQUEST})        
        Axios.post(urlAPI+"consultaTicket",data).then(res=>{  
          console.log(res)      
          const data = {...res.data, status:res.status}
          dispatch({type:actionState.RESPONSE_REGISTER_ATC,data})

          const message=res.data.mensaje
          dispatch({type:actionState.RESPONSE_SUCCESS,message})

        }).catch(err=>{
          const message=err.message
          dispatch({type:actionState.RESPONSE_ERROR,message})
        })
    },
    AddMethodPay:operacion=>(dispatch)=>{
      dispatch({type:actionState.NEW_REQUEST})
      if(operacion.metodoPago.metodo==='VISA'){
       /* let answerStore = localStorage.getItem('formToken')
        if(!answerStore){
          console.log('No existe')
*/
          Axios.post(urlAPI+"formpago",operacion.ordenServicio).then(res=>{           
              const {answer} = res.data
              localStorage.setItem('formToken', answer.formToken)
              dispatch({type:actionState.ADD_FORM_TOKEN,answer})
              dispatch({type:actionState.ADD_PAYMENT_METHOD,operacion})
              dispatch({type:actionState.RESPONSE_SUCCESS})       
          }).catch(err=>{
            const message="Lo sentimos error. Vuelva intentarlo o use otro medio de pago. "
            dispatch({type:actionState.RESPONSE_ERROR,message})
          })
       /* }else{
          console.log('existe')
          const answer = {formToken:answerStore}
          dispatch({type:actionState.ADD_FORM_TOKEN,answer})
          dispatch({type:actionState.ADD_PAYMENT_METHOD,operacion})
          dispatch({type:actionState.RESPONSE_SUCCESS})
        }*/
      }else{
        dispatch({type:actionState.RESPONSE_SUCCESS})
        dispatch({type:actionState.ADD_PAYMENT_METHOD,operacion})
      }
    },
    DeleteMethodPay:()=>(dispatch)=>dispatch({type:actionState.DELETE_PAYMENT_METHOD}),
    TicketCancellation:ordenServicio=>(dispatch)=>{
      dispatch({type:actionState.NEW_REQUEST})
      const dataSend = {
        Numoscab: ordenServicio.numoscab,
        Peroscab: ordenServicio.peroscab,
        Anooscab: ordenServicio.anooscab,
        Numemp: ordenServicio.numemp,
        Numsuc: ordenServicio.numsuc,
        Numtdven: ordenServicio.numtdven,
        FormaPago: ordenServicio.formaPago,
        DescPago: ordenServicio.descPago
      }
      Axios.post(urlAPI+"facturar",dataSend).then(res=>{        
        if(res.status===200) {
          const data = {...res.data, status:res.status }
          dispatch({type:actionState.REGISTER_PAYMENT,data})
          dispatch({type:actionState.RESPONSE_SUCCESS})
        }
        else{
          const message=res.data.mensaje
          dispatch({type:actionState.RESPONSE_ERROR,message})
        }
      }).catch(err=>{
        const message=err.message
        dispatch({type:actionState.RESPONSE_ERROR,message})
      })
    },
    setInitialState: ()=>(dispatch)=>dispatch({type:actionState.RESET_STATE})
}

export const reducer = (state,action)=>{
  state = state||initialState

  switch(action.type)
  {
    case actionState.NEW_REQUEST :
      return {
        ...state,
        isLoading:true,
        isShowAlert:false
      }
    case actionState.RESPONSE_ERROR :
      return {
        ...state,
        isRequestError:true,
        requestMessage:action.message,
        isLoading:false
      }
    case actionState.RESPONSE_SUCCESS :
      return {
        ...state,
        isRequestError:false,
        requestMessage:action.message||null,
        isLoading:false
      }
    case actionState.RESPONSE_REGISTER_ATC :
      return {
        ...state,
        data:action.data,
        isTicketCreated:true,
        isShowAlert:true,
        selectMethodPay:false,
        requestMessage:action.data.mensaje
      }
    case actionState.ADD_PAYMENT_METHOD :
      return {
        ...state,
        data:{
          ...state.data,
          numtdven:"02",
          formaPago:action.operacion.metodoPago.tipoPago,
          descPago:action.operacion.metodoPago.metodo
        },
        selectMethodPay:true
      }
    case actionState.DELETE_PAYMENT_METHOD :
      
      return {
        ...state,
        data:{
          ...state.data,
          formToken:"",
        },
        selectMethodPay:false
      }
    case actionState.ADD_FORM_TOKEN :
      return {
        ...state,
        data:{
          ...state.data,
          formToken:action.answer.formToken,
        }
      }
    case actionState.REGISTER_PAYMENT :
      return {
        ...state,
        data:action.data,
        isCanceledTicket:true
      }
    case actionState.RESET_STATE :
      return initialState
           
    default:
      return state
    }
}
