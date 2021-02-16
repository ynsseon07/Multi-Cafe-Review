import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Table } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';
class ReviewPage extends Component {
  // createListOfFiles() {
  //   let listOfFiles = [];
  //   for (let i = 0; i < this.files.length; ++i) {
  //     listOfFiles.push(<p key={i}>{this.files[i].name}</p>);
  //   }
  //   return listOfFiles;
  // }
  constructor(props) {
    super(props);
    this.state = {
      myLike: false,
      menuReivew: [],
      selectMenu: [],
      similarMenuByKeyWord: [],
      isLoaded: false,
    };
    this.onlikeChanged.bind(this);
  }

  onlikeChanged = (e) => {
    const menuId = localStorage.getItem('menuId');
    const userId = localStorage.getItem('userId');
    const changeLikeUrl = axios.get(`http://localhost:9090/multicafe/api/user/${userId}/menu/${menuId}/like`);
    const likeCheckUrl = axios.get(`http://localhost:9090/multicafe/api/user/${userId}/${menuId}/likecheck`);
    Promise.all([changeLikeUrl, likeCheckUrl])
      .then(([res1, res2]) => {
        console.log(res1.data);
        console.log(res2.data);
        this.setState({
          myLike: res2.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const menuId = localStorage.getItem('menuId');
    const userId = localStorage.getItem('userId');
    const menuReivewUrl = axios.get(`http://localhost:9090/multicafe/api/review/${menuId}`);
    const selectMenuUrl = axios.get(`http://localhost:9090/multicafe/api/menu/check/${menuId}/${userId}`);
    const similarMenuByKeyWordUrl = axios.get(`http://localhost:9090/multicafe/api/menu/${menuId}/recommend/keyword`);
    const similarMenuByTasteUrl = axios.get(`http://localhost:9090/multicafe/api/menu/${menuId}/recommend/taste`);
    const likeCheckUrl = axios.get(`http://localhost:9090/multicafe/api/user/${userId}/${menuId}/likecheck`);

    Promise.all([menuReivewUrl, selectMenuUrl, similarMenuByKeyWordUrl, similarMenuByTasteUrl, likeCheckUrl])
      .then(([res, res2, res3, res4, res5]) => {
        this.setState({
          menuReivew: res.data,
          selectMenu: res2.data,
          similarMenuByKeyWord: res3.data,
          similarMenuByTaste: res4.data,
          myLike: res5.data,
          isLoaded: true,
        });

        localStorage.setItem('myLike', this.state.myLike);
        console.log(this.state.mylike);
        console.log(this.state.similarMenuByKeyWord);
        console.log(this.state.selectMenu);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleClick = (value) => () => {
    localStorage.setItem('menuId', value);
    window.location.replace('/review');
  };

  similarcreateListOfsimilarMenuByKeyword() {
    let list = [];
    for (let i = 0; i < this.state.similarMenuByKeyWord.length; ++i) {
      list.push(
        <SwiperSlide>
          <a onClick={this.handleClick(this.state.similarMenuByKeyWord[i].menuId)} style={{ textAlign: 'center' }}>
            <img src={this.state.similarMenuByKeyWord[i].image} alt='...' style={{ width: 200, height: 200 }} />
            <div>{this.state.similarMenuByKeyWord[i].name}</div>
          </a>
        </SwiperSlide>
      );
    }
    return list;
  }
  similarcreateListOfsimilarMenuByTaste() {
    let list = [];
    for (let i = 0; i < this.state.similarMenuByTaste.length; ++i) {
      list.push(
        <SwiperSlide>
          <a style={{ textAlign: 'center' }}>
            <img src={this.state.similarMenuByTaste[i].image} className='cafeImg' alt='...' style={{ width: 200, height: 200 }} />
            <div>{this.state.similarMenuByTaste[i].name}</div>
          </a>
        </SwiperSlide>
      );
    }
    return list;
  }
  createListOfFiles() {
    let listOfFiles = [];
    for (let i = 0; i < this.files.length; ++i) {
      listOfFiles.push(<p key={i}>{this.files[i].name}</p>);
    }
    return listOfFiles;
  }
  createListOfReview() {
    let list = [];
    for (let i = 0; i < this.state.menuReivew.length; ++i) {
      list.push(
        <tr>
          <td>{this.state.menuReivew[i].userId}</td>
          <td>{this.state.menuReivew[i].content}</td>
          <td>
            <ReactStars edit={false} activeColor='#ffc107' value={this.state.menuReivew[i].sweet} size={20} isHalf={true} />
          </td>
          <td>
            <ReactStars edit={false} activeColor='#ffc107' value={this.state.menuReivew[i].bitter} size={20} isHalf={true} />
          </td>
          <td>
            <ReactStars edit={false} activeColor='#ffc107' value={this.state.menuReivew[i].sour} size={20} isHalf={true} />
          </td>
        </tr>
      );
    }
    return list;
  }

  render() {
    const { selectMenu, isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div id='loader' style={{ position: 'absolute', top: '50%', left: '50%' }}>
          <CircularProgress />
        </div>
      );
    } else {
      let showsimimenukeyword = this.state.similarMenuByKeyWord.length;
      if (showsimimenukeyword > 5) {
        showsimimenukeyword = 5;
      }
      let showsimimenutaste = this.state.similarMenuByTaste.length;
      if (showsimimenutaste > 5) {
        showsimimenutaste = 5;
      }

      return (
        <div>
          <div>
            {/*Main layout*/}

            <main className='mt-5 pt-4'>
              <div className='container dark-grey-text mt-5'>
                {/*Grid row*/}
                <div className='row wow fadeIn'>
                  {/*Grid column*/}
                  <span className='col-md-6 mb-4'>
                    <div>
                      <div style={{ fontSize: 30 }}>총점:{selectMenu.grade}</div>

                      <ReactStars edit={false} activeColor='#ffc107' value={selectMenu.grade} size={35} isHalf={true} />
                    </div>

                    <img src={selectMenu.image} className='img-fluid' style={{ width: '80%', height: '80%' }} alt />
                  </span>
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className='col-md-6 mb-4' st>
                    {/*Content*/}
                    <div className='p-4' style={{ fontSize: 20 }}>
                      <span className='lead font-weight-bold'>{selectMenu.name} </span>

                      <a className='btn' onClick={() => this.onlikeChanged()}>
                        <i style={{ color: 'red' }} className={this.state.myLike ? 'fa fa-heart' : 'far fa-heart'}></i>
                      </a>

                      <p className='lead font-weight-bold'>
                        <span>{selectMenu.price}원 </span>
                      </p>
                      <p>{selectMenu.description}</p>
                      <br />
                      <br />
                      <br />
                      <br />
                      <div className='col-md-6 text-right'>
                        <div className='rating-wrap mb-3'>
                          단맛: &nbsp;
                          <ul className='rating-stars'>
                            <ReactStars edit={false} activeColor='#ffc107' value={selectMenu.sweet} size={25} isHalf={true} />
                          </ul>
                        </div>
                        <div className='rating-wrap mb-3'>
                          쓴맛: &nbsp;
                          <ul className='rating-stars'>
                            <ReactStars edit={false} activeColor='#ffc107' value={selectMenu.bitter} size={25} isHalf={true} />
                          </ul>
                        </div>
                        <div className='rating-wrap mb-3'>
                          신맛: &nbsp;
                          <ul className='rating-stars'>
                            <ReactStars edit={false} activeColor='#ffc107' value={selectMenu.sour} size={25} isHalf={true} />
                          </ul>
                        </div>
                      </div>
                      <form className='d-flex justify-content-left'>{/* Default input */}</form>
                    </div>
                    {/*Content*/}
                  </div>
                  {/*Grid column*/}
                </div>
                {/*Grid row*/}
                <hr />
                {/*Grid row*/}
                <div className='row d-flex justify-content-center wow fadeIn'>
                  {/*Grid column*/}

                  <Link to='/writereview'>
                    <button className='btn btn-primary btn-md my-0 p' type='submit' style={{ height: '70px' }}>
                      리뷰 작성
                    </button>
                  </Link>

                  {/*Grid column*/}
                </div>
                <br />
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>리뷰내용</th>
                      <th>단맛</th>
                      <th>쓴맛</th>
                      <th>신맛</th>
                      <th>좋아요</th>
                    </tr>
                  </thead>
                  <tbody>{this.createListOfReview()}</tbody>
                </Table>

                {/* <BootstrapTable keyField='id' data={products} columns={this.state.columns} /> */}

                {/*Grid row*/}
                {/*Grid row*/}

                <Swiper spaceBetween={0} slidesPerView={showsimimenukeyword} onSlideChange={() => console.log('slide change')} on Swiper={(swiper) => console.log('swiper')}>
                  {/*Grid column*/}
                  {this.similarcreateListOfsimilarMenuByKeyword()}

                  {/*Grid column*/}
                </Swiper>

                <div className='row wow fadeIn'>
                  <Swiper spaceBetween={0} slidesPerView={showsimimenutaste} onSlideChange={() => console.log('slide change')} on Swiper={(swiper) => console.log('swiper')}>
                    {/*Grid column*/}
                    {this.similarcreateListOfsimilarMenuByTaste()}

                    {/*Grid column*/}
                  </Swiper>
                </div>

                {/*Grid row*/}
              </div>
            </main>
            {/*Main layout*/}
            {/*Footer*/}
            <footer className='page-footer text-center font-small mt-4 wow fadeIn'>
              {/*Call to action*/}
              <div className='pt-4'>
                <a className='btn btn-outline-white' href='https://mdbootstrap.com/docs/jquery/getting-started/download/' target='_blank' role='button'>
                  Download MDB
                  <i className='fas fa-download ml-2' />
                </a>
                <a className='btn btn-outline-white' href='https://mdbootstrap.com/education/bootstrap/' target='_blank' role='button'>
                  Start free tutorial
                  <i className='fas fa-graduation-cap ml-2' />
                </a>
              </div>
              {/*/.Call to action*/}
              <hr className='my-4' />
              {/* Social icons */}
              <div className='pb-4'>
                <a href='https://www.facebook.com/mdbootstrap' target='_blank'>
                  <i className='fab fa-facebook-f mr-3' />
                </a>
                <a href='https://twitter.com/MDBootstrap' target='_blank'>
                  <i className='fab fa-twitter mr-3' />
                </a>
                <a href='https://www.youtube.com/watch?v=7MUISDJ5ZZ4' target='_blank'>
                  <i className='fab fa-youtube mr-3' />
                </a>
                <a href='https://plus.google.com/u/0/b/107863090883699620484' target='_blank'>
                  <i className='fab fa-google-plus-g mr-3' />
                </a>
                <a href='https://dribbble.com/mdbootstrap' target='_blank'>
                  <i className='fab fa-dribbble mr-3' />
                </a>
                <a href='https://pinterest.com/mdbootstrap' target='_blank'>
                  <i className='fab fa-pinterest mr-3' />
                </a>
                <a href='https://github.com/mdbootstrap/bootstrap-material-design' target='_blank'>
                  <i className='fab fa-github mr-3' />
                </a>
                <a href='http://codepen.io/mdbootstrap/' target='_blank'>
                  <i className='fab fa-codepen mr-3' />
                </a>
              </div>
              {/* Social icons */}
              {/*Copyright*/}
              <div className='footer-copyright py-3'>
                © 2019 Copyright:
                <a href='https://mdbootstrap.com/education/bootstrap/' target='_blank'>
                  {' '}
                  MDBootstrap.com{' '}
                </a>
              </div>
              {/*/.Copyright*/}
            </footer>
          </div>
        </div>
      );
    }
  }
}

export default ReviewPage;
