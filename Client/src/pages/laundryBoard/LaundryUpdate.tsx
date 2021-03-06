/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { getCareLabel, getLaundryDetail, UpdateLaundry } from '../../store/api/laundry'
import { userState } from '../../store/state/user'
import ImgBox from './ImgBox'
import Label from './Label';
import Info from './Info';
import { labelState, defaultLabelState } from '../../store/state/laundry'
import { ArrowBack } from '@mui/icons-material'

const Wrapper = styled.article`
  width: 70vw;
  max-width: 1200px;
  min-width: 280px;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
  @media screen and (max-width: 800px) {
    width: 90vw;
  }
  padding-bottom: 20vh;

`
const DetailBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 650px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  margin-top: 10vh;
  @media screen and (max-width: 800px) {
    height: auto;
    margin-top: 0;
  }
`
const Top = styled.div`
  display: flex;
  img{
    height: 400px;
    width: 25vw;
    margin-left: 5vw;
    margin-top: 5vh;
  }
  @media screen and (max-width: 800px) {
    display: inline;
    margin: auto;
    img{
      height: 250px;
      width: 90%;
      margin-top: 2vh;
      margin-left: 5vw;
    }
  }
`
const InfoBox = styled.div`
  width: 100%;
  
  .inform{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 20px;
    height: 100px;
    overflow-y: auto;
    @media screen and (max-width: 800px) {
      overflow-y: visible;
    }
  }
  .title{
    text-align: center;
    /* margin-top: 30px; */
    font-size: 1.2rem;
    color : ${props => props.theme.activeBtnColor}
  }
  .content{
    margin-left: 20px;
    font-size: 1.2rem;
  }
`
const Information = styled.div`
  margin: auto;
  width: 80%;

  .gray{
    width: 100%;
    height: 80px;
    overflow-y: hidden;
    margin-top: 15px;
    text-align: center;
    font-size: 0.8rem;
    color:#a9a9a9;
  }

`
const Infos = styled.div`
  margin: auto;
  width: 80%;
  height: 120px;
  overflow-y:auto;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 50px;
  width: 80%;
  height: 200px;
  overflow-y: auto;
  @media screen and (max-width: 800px) {
      overflow-y: visible;
      min-height: 150px;
      height: auto;
  }
  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
  
`

const ButtonBox = styled.div`
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  button{
    width: 50vw;
    border: none;
    border-radius: 10px;
    height: 50px;
    font-size:1.1rem;
    cursor: pointer;
    color: white;

  }
 
  @media screen and (max-width: 800px) { 
    button{
    margin-top: 10px;
    width: 70vw;
    }
  }
  .saveBtn{
    background-color:${props => props.theme.activeBtnColor};
    &:hover{
      background-color: ${props=>props.theme.hoverActiveBtnColor};
    }
  }
`
const Memo = styled.div`
  .mtitle{
    width: 45px;
  }
  margin: auto;
  margin-top: 30px;
  width: 90%;
  display: flex;
  justify-content: center;
  .memo{
    padding-left: 10px;
    height: 50px;
    width: 200px;
    overflow-y: auto;
    word-break:break-all;
    resize: none;

  }
`
const BackKey = styled.div`
  position: fixed;
  top : 70px;
  left:30px;
 
`
interface Istate{
  laundry:{
    laundryId: number
    laundryImg: string
    careLabels: {careLabelId: number, careLabelName:string, careLabel:string}[]
    laundryInfo: string[]
    laundryOwnerNick: string
    laundryOwnerId: number
    laundryMemo:string
  }
}

const LaundryUpdate = () => {
  const {laundryId} = useParams()
  const colors = ['#cffbb2','#90fdec','#f4ffac','#fea5e6','#fdce8d','#ccffa8','#90faea','#eaf69d','#fba7e5','#ffd59b']

  const [isLoading,setIsLoading] = useState(true)
  const [laundry,setLaundry] = useState<Istate['laundry']>()
  const [laundryInfo,setlaundryInfo] = useState<string[]>([])
  const [careLabels,setCareLabels] = useRecoilState(labelState)
  const [laundryMemo,setLaundryMemo] = useState('')
  const [laundryImg,setLaundryImg] = useState<string>('')
  const [user] = useRecoilState(userState)
  const [file, setFile] = useState<any>();
  const navigate = useNavigate()
  const [careLabelsstate,setCareLabelsstate] = useRecoilState(defaultLabelState)

  const submitLaundry = ()=>{
    const formdata = new FormData()
    formdata.append('laundryModifyPostRep',
      new Blob([
        JSON.stringify({
          'careLabels':careLabels,
          'laundryId':laundryId,
          'laundryInfo':laundryInfo,
          'laundryMemo':laundryMemo,
        })
      ],{type:'application/json'})
    )
    if(file!==undefined){
      formdata.append('file',file)
    }
    UpdateLaundry(formdata).then((res)=>{
      navigate(`/laundry/${laundryId}`)
    })
  }

  useEffect(()=>{
    if (!!sessionStorage.getItem('token')) {
      getLaundryDetail(Number(laundryId))
      .then((res)=>{
        setLaundry(res.list)
        setlaundryInfo(res.list.laundryInfo)
        setLaundryImg(res.list.laundryImg)
        setCareLabels(res.list.careLabels)
        setLaundryMemo(res.list.laundryMemo)
      })
      .then(() => {
        if (!careLabelsstate.length) {
          getCareLabel().then((res)=>{
            setCareLabelsstate(res.list)
          })
        }
      })
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(()=>{
    const newarr =careLabels.filter((care)=>care!==null)
    setCareLabels(newarr)
    setIsLoading(false)
  }, [laundry])

  return (
    <Wrapper>
       <BackKey>
        <ArrowBack onClick={()=>{ navigate(-1)}}/>
      </BackKey>
      {isLoading ? <div>?????????</div>:
      <DetailBox>
        <Top>
          <ImgBox laundryImg={`/images/${laundryImg}`}  file={file} setFile={setFile}   />
          <InfoBox>
            <LabelBox>
              <div className='title'>
                ?????? ?????? ??????
              </div>
              <div className='careLabel'>
              {careLabels.map((label,idx)=>{
                if (label!==null){
                return(<Label idx={idx} color={colors[idx%10]} careLabels={careLabels} key={idx} label={label} setCareLabels={setCareLabels}/>  )}})}
              <Label color='#f7d9a2' careLabels={careLabels} 
              label={{careLabelId: 0,careLabelName: '',careLabel: ''}} idx={-1} setCareLabels={setCareLabels}/>
              </div>
            </LabelBox>
            <Information>
              <Infos>
              <div className='title'>?????? ?????? ??????</div>
              <div className='inform'>
                {laundryInfo.map((info,idx)=>{
                  return(
                    <Info infos={laundryInfo} key={idx} info={info} idx={idx} setInfos={setlaundryInfo} />
                  )
                })}
                <Info infos={laundryInfo} info={''} idx={-1} setInfos={setlaundryInfo} />
              </div>
              </Infos>
              <div className='gray'>
                <p>??? ????????? ?????? ??????????????? ????????? ???????????????.</p>
                <p>?????? ?????? ?????? ?????? ??????????????? ????????? ????????? ?????????.</p>
              </div>
            </Information>
          <Memo>
            <div className='mtitle'>?????? : </div>
              <textarea className='memo' value={laundryMemo} onChange={(e)=>{setLaundryMemo(e.target.value)}}/>
          </Memo>
            
          </InfoBox>
        </Top>
        <ButtonBox>
          <button onClick={()=>{submitLaundry()}} className='saveBtn'>??? ????????? ??????</button>
        </ButtonBox>
      </DetailBox>}
    </Wrapper>
  )
}
  
  export default LaundryUpdate