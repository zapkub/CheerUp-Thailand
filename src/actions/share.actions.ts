import * as Setting from '../../app.config';
import * as fetch from 'isomorphic-fetch';
import * as AppActions from './app.actions';



const uploadToServer = async (canvas: HTMLCanvasElement) => {
  const data = canvas.toDataURL('image/jpeg', 0.6);
  const encodedjpg = data.substring(data.indexOf(',') + 1, data.length);

  const body = new FormData();
  body.append('filename', 'result_');
  body.append('image', encodedjpg);
  const res = await fetch('http://thesecretfarm.com/cheerup/writeImage.php', {
    method: 'POST',
    body,
  });
  const resJson = await res.json();

  const shareURL = `https://www.facebook.com/dialog/feed?app_id=${Setting.fbAppId}&link=${Setting.shareInfo.link}&name=${Setting.shareInfo.title}&caption=${Setting.shareInfo.caption}&description=${Setting.shareInfo.description}&picture=${'http://www.thesecretfarm.com/cheerup/result/' + resJson.filename + '.jpg'}&redirect_uri=${Setting.redirectURL}`;


  window.location.href = shareURL;
  // const uiParams = {
  //   method: 'feed',
  //   title: 'คุณบลาๆ ได้ทำ บลาๆ',
  //   link: 'http://www.thesecretfarm.com/cheerup/',
  //   caption: 'Cheerup Thailand',
  //   description: 'เชียร์ไรก็ว่าไป',
  //   display: 'iframe',
  //   picture: 'http://www.thesecretfarm.com/cheerup/result/' + resJson.filename + '.jpg'//'http://www.thesecretfarm.com/creativegift/star_55652e81082027.jpg'//'http://gth.co.th/startheque/result/'+res.filename+'.jpg',//'http://www.thesecretfarm.com/creativegift/star_55652e81082027.jpg'//
  // } as any;

  // FB.ui(uiParams , function (response): void {
  //   if (response) {
  //     alert('Share สำเร็จแล้ว!');
  //   }
  // });
};

export  const shareToFB = (canvas: HTMLCanvasElement) => dispatch => {
  dispatch(AppActions.showLoading());
  uploadToServer(canvas);
};
