/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './images/logo2.png';
import { useNavigate } from 'react-router-dom';
import { postSignUp, getEmailcheck, getNicknamecheck } from '../../store/api/user';
// import { dividerClasses } from '@mui/material';
import UserImgBox from './UserImgBox';  
import Swal from 'sweetalert2'


const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-content: center;
`
const Logobox = styled.span `
   position: absolute;
  right: 0;
  top:7vh;

  img {
    height: 25vh;max-width: 800px
  }

  @media screen and (max-width: 800px) {
    top: 4vh;
    img {
    height: 12vh;
    }
  }
`

const SmallBox = styled.div `
  min-height: 100vh;

  .LoginBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    /* color: ${props => props.theme.fontColor}; */
    background-color: ${props => props.theme.inactiveBtnColor};
  }

  .SignupBtn{
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
  }


  @media screen and (max-width: 800px) {
    position: relative;
    .ConfirmBtn {
    border: none;
    width : 100%;
    height: 5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    margin-top: 0.5rem;
  }

  .LoginBtn {
    border: none;
    width : 100%;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: ${props => props.theme.inactiveBtnColor};
    margin-top: 0.5rem;
  }

  .SignupBtn {
    border: none;
    width : 100%;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
    }
  }
`

const SignupForm = styled.div `
  min-height: 100vh;
  /* width: 80%; */
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;
  
  h1 {
    display: flex;
    margin-bottom: 40px;
    justify-content: center;
    margin-right: 25px;
  }

  @media screen and (max-width: 800px) {
    /* width: 50%; */

    label {
      font-size: 0.8rem;
    }
    
    h1 {
      display: flex;
      justify-content: center;
      margin-top: 15vh;
      /* margin-bottom: 30px; */
      margin-left: 5vw;
    }
  }
`

const InputForm = styled.section`
  height: 2vh;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 2.5rem;
  width: 25vw;
  background-color: ${props => props.theme.bgColor};
  color : ${props => props.theme.fontColor};
  align-items: center;

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.fontColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }

  .ConfirmBtn {
    position: relative;
    border: none;
    width : 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: white;
    max-width: 800px;
    background-color: ${props => props.theme.activeBtnColor};
  }

  #nickChecked {
    visibility: hidden;
  }

  #emailChecked {
    visibility: hidden
  }

  @media screen and (max-width: 800px) {
    /* height: 2vh; */
    margin-bottom: 0.5rem;
    /* ???????????? ?????? ?????? ????????? */
    width: 50vw;

    .ConfirmBtn {
      position: relative;
      bottom: 0.3rem;
      font-size: 0.7rem;
    }

    input {
      font-size: 0.7rem;
      &::placeholder { 
        font-size: 0.6rem;
      }
    }
  }
`
const ImgBox = styled.div `
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: baseline;
  margin-bottom: 5vh;
`

const FormBox = styled.div `

  .LabelTitle {
    position: relative;
    bottom: 1vh;
  }

  .EmailNickBox {
    display: flex;
    justify-content: center;
    flex-flow: nowrap row;
  }

  .NickBox {
    margin-left: 4vw;
  }

  .PasswordsBox {
    display: flex;
    justify-content: center;
    flex-flow: nowrap row;
  }

  .PasswordCheckBox {
    margin-left: 4vw;
  }

  .BtnPosition {
    display: flex;
    justify-content: center;
  }

  .LoginBtnBox {
    width: 100%;
    margin-left: 4vw;
  }
  
  .SignupBtnBox {
    width: 100%;
  }

  .PasswordCheckMessage {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: red;
    font-size: 0.75rem;
  }

  .PasswordCheckMessage2 {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: blue;
    font-size: 0.75rem;
  }

  .PasswordAllowedMsg {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: blue;
    font-size: 0.75rem;
  }

  .PasswordNotAllowedMsg {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: red;
    font-size: 0.75rem;
  }

  @media screen and (max-width: 800px) {

    .LabelTitle {
      position: relative;
      bottom: 0.2vh;
    }

    .EmailNickBox {
      display: flex;
      justify-content: center;
      flex-flow: column;
    }

    .PasswordsBox {
      display: flex;
      justify-content: center;
      flex-flow: column;
      margin-left: 0;
      margin-top: 10px;

    }

    .NickBox {
      margin-left: 0;
      margin-top: 10px;
    }

    .PasswordCheckBox {
      margin-left: 0;
      margin-top: 10px;
    }

    .LoginBtnBox {
      margin-left: 0;
      margin-top: 10px;

    }

    .BtnPosition {
      display: flex;
      flex-flow: column;
      margin-top: 1rem;
    }

    .PasswordCheckMessage {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: red;
      font-size: 0.5rem;
    }

    .PasswordCheckMessage2 {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: blue;
      font-size: 0.5rem;
    }

    .PasswordAllowedMsg {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: blue;
      font-size: 0.5rem;
    }

    .PasswordNotAllowedMsg {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: red;
      font-size: 0.5rem;
    }
  }
`


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")

  const [usingEmail, setUsingEmail] = useState('!@#$Q!@#QWER')
  const [usingNickname, setUsingNickname] = useState('!@#$Q!@#QWER')
  
  const [emailChecked, setEmailChecked] = useState(false)
  const [nickChecked, setNickChecked] = useState(false)
  const [paswordChecked, setPaswordChecked] = useState(false)

  const [allowedPassword, setAllowedPassword] = useState(false)

  const [file, setFile] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!!sessionStorage.getItem('token')) {
      navigate('/home')
    }
  }, [])

  const isValid = () => {
    var check = false
    const chkEmail =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (email.match(chkEmail)) {
      check = true
    } else {
      check = false
    } 
    return check
  } 

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    isValid()
  }

  const onSubmit = () => {
    if (!emailChecked) {
      alert('???????????? ??????????????????')
    } else {
      if (!nickChecked) {
        alert('???????????? ??????????????????')
      } else {
        if (!paswordChecked) {
          alert('??????????????? ??????????????????')
        } else {
          requireBtn()
        }
      }
    }
  }


  const requireBtn = () => {
    const formdata = new FormData()
    formdata.append('userRegisterInfo',
      new Blob([
        JSON.stringify({
          'userEmail': email,
          'userNick': nickname,
          'password': password,
        })
      ],{type:'application/json'})
    )
    if(file!==undefined){
      formdata.append('file', file)
    }
    postSignUp(formdata)
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: '???? ????????????????????? ????',
        showConfirmButton: false,
        timer: 1000
      })
      navigate('/login')
      }
    )
  } 

  const onHandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailChecked(false)
    if (usingEmail === e.target.value) {
      setEmailChecked(true)
    }
  }

  // ????????? ?????? ??????
  const emailDuplicationCheck = () => {
    if (isValid()) {
      getEmailcheck(email)
      .then((res) => {
        const emailCheckMessage = res.message
        if (email) {
          if (emailCheckMessage === 'Unavailable') {
            setEmailChecked(false)
            alert('?????? ????????? ????????? ?????????.')
          } else {
            setEmailChecked(true)
            setUsingEmail(email)
            alert('??????????????? ????????? ?????????.')
          }
        } else {
          alert('???????????? ??????????????????')
          setEmailChecked(false)
        } 
      })
      .catch((err) => {
        setEmailChecked(false)
      })
    } else {
      alert('???????????? ??????????????????')
    }
  }

  const onHandelNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setNickChecked(false)
    if (usingNickname === e.target.value) {
      setNickChecked(true)
    }
  }
  // ????????? ?????? ??????
  const nicknameDuplicationCheck = () => {
    if (nickname.length > 6 || nickname.length < 2) {
      alert('2?????? ?????? 6?????? ????????? ??????????????????')
    } else {
      getNicknamecheck(nickname)
      .then((res) => {
        const nickCheckMessage = res.message
        if (nickname) {
          if (nickCheckMessage === 'Unavailable') {
            setNickChecked(false)
            alert('???????????? ????????? ?????????.')
          } else {
            setNickChecked(true)
            setUsingNickname(nickname)
            alert('??????????????? ????????? ?????????.')
          }
        } else {
          alert('???????????? ??????????????????')
          setNickChecked(false)
        }
      })
      .catch((err) => {
        setNickChecked(false)
      })
    }
  }

  // ???????????? ????????? ??????
  const passwordVaildCheck = (pwd: string) => {
    setAllowedPassword(false)
    const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    if (regPass.test(pwd)) {
      setAllowedPassword(true)
    }
  }

  // ???????????? ??????
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    passwordVaildCheck(e.target.value)
    setPaswordChecked(false)
    if (confirmPassword === e.target.value && allowedPassword) {
      setPaswordChecked(true)
    }
  }

  // ???????????? ?????? ??????
  const onConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    setPaswordChecked(false)
    if (password === e.target.value && allowedPassword) {
      setPaswordChecked(true)
    }
  }

  return (
    <Wrapper>
      <Logobox>
        <img src={logo} alt="?????????" />
      </Logobox>
      <SmallBox>
        <SignupForm>
          <h1>SIGNUP</h1>
          <ImgBox>
            <UserImgBox userImg='' file={file} setFile={setFile} />
          </ImgBox>
          {/* <section> */}
          <FormBox>
              {/* ????????? */}
              <div className='EmailNickBox'>
              <form onSubmit={(e) => onSignup(e)}>
                <div className='EmailBox'>
                  <label htmlFor='email'>
                    <span className='LabelTitle'>?????????</span>
                    <InputForm>
                      <input type='email' id='email' value={email} onChange={(e) => onHandleEmail(e)} 
                        placeholder='???????????? ???????????????'
                      />
                      <button className='ConfirmBtn' id={emailChecked ? 'emailChecked': ''} onClick={() => emailDuplicationCheck()}>??????</button>
                    </InputForm>
                  </label>
                </div>
              </form>
              
                

                <div className='NickBox'>
                  <label htmlFor='nickName'>
                  <span className='LabelTitle'>?????????</span>
                    <InputForm>
                      <input type='text' id='nickName'
                        placeholder='???????????? ???????????????'
                        value={nickname}
                        onChange={(e) => onHandelNick(e)}
                      />
                      <button className='ConfirmBtn' id={nickChecked ? 'nickChecked': ''} onClick={() => nicknameDuplicationCheck()}>??????</button>
                    </InputForm>
                  </label>
                </div>
              </div>

              <div className='PasswordsBox'>
                <div className='PasswordBox'>
                  <label htmlFor='password'>
                    <span className='LabelTitle'>????????????</span>
                    <InputForm>
                      <input 
                        type='password' 
                        id='password' 
                        value={password} 
                        onChange={(e) => onPasswordHandler(e)} 
                        placeholder='??????????????? ???????????????'
                      />
                    </InputForm>
                      {!password ? <p></p> : allowedPassword ? <p className='PasswordAllowedMsg'>??????????????? ???????????? ?????????</p> : <p className='PasswordNotAllowedMsg'>??????, ??????, ???????????? ?????? 8?????? ?????? ????????? ?????????</p>}
                  </label>
                </div>

                <div className='PasswordCheckBox'>
                  <label htmlFor='passwordCheck'>
                    <span className='LabelTitle'>???????????? ??????</span> 
                    <InputForm >
                      <input 
                        type='password' 
                        id='passwordCheck' 
                        placeholder='??????????????? ??? ??? ??? ???????????????'
                        value={confirmPassword}
                        onChange={e => onConfirmPasswordHandler(e)}
                      />
                    </InputForm>
                      {/* ?????? ????????? ?????? ????????? ????????? ????????? ??????(????????????) */}
                      {!confirmPassword ? <p></p>: paswordChecked ? <div className="PasswordCheckMessage2">??????????????? ???????????????</div> : <div className="PasswordCheckMessage">??????????????? ???????????? ????????????</div>}
                  </label>
                </div>
              </div>
                {/* </form> */}
              <div className='BtnPosition'>
                <div className='SignupBtnBox'>
                  <button className="SignupBtn" id='SignupBtn' onClick={() => onSubmit()}>????????????</button>
                </div>
                <div className='LoginBtnBox'>
                  <button className="LoginBtn" onClick={() => navigate('/login')} >??????</button>
                </div>
              </div>
          </FormBox>
        </SignupForm>
      </SmallBox>
    </Wrapper>
  )
}

export default Signup