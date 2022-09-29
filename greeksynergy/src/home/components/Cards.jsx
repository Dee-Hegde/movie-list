import { Button, Col, Row } from 'antd'
import moment from 'moment/moment';
import React from 'react'
import "../../assets/Css/cards.css";
import up from "../../assets/Icons/up.png";
import down from "../../assets/Icons/down.png";

function Cards(data) {
    const releasedate1=moment(data.data.releasedDate).format("DD MMM")
  return (
    <>
        <div className='flex'>
            <Col className='col1 flex nd'>
            <img className='img-fw' src={up} alt="" />
            <h2 className='h1'>{data.data.totalVoted}</h2>
            <img className='img-fw' src={down} alt="" />
            <p>Votes</p>
            </Col>
            <Col className='col2' span={10}>
            <img className='img' src={data?.data?.poster} alt="" />
            </Col>
            <Col className='col3'>
            <h1 className='h1'>{data.data.title}</h1>
            <p>Genre:{data.data.genre}</p>
            <p>Director:{(data.data.director).map((key)=><span>{key}</span>)}</p>
            <p>Starring:{(data.data.stars).map((key)=><span>{key},</span>)}</p>
            <p><span>Mins|</span>{data.data.language}|<span>{releasedate1}</span><span></span></p>
            </Col>
        </div>
        
        <Row className='mt10'>
            <Button type='primary'>Read More</Button>
        </Row>
    </>
  )
}

export default Cards