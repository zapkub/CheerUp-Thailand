// / <reference path="../../typings/global/mobile-detect/index.d.ts" />
import * as Setting from '../../app.config';
import * as fetch from 'isomorphic-fetch';
import * as AppActions from './app.actions';
import { push } from 'react-router-redux';
const MobileDetect = require('mobile-detect');


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
  const md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    const shareURL = `https://www.facebook.com/dialog/feed?app_id=${Setting.fbAppId}&link=${Setting.shareInfo.link}&name=${Setting.shareInfo.title}&caption=${Setting.shareInfo.caption}&description=${Setting.shareInfo.description}&picture=${'http://www.thesecretfarm.com/cheerup/result/' + resJson.filename + '.jpg'}&redirect_uri=${Setting.redirectURL}`;
    window.location.href = shareURL;
  } else {
    const uiParams = {
      method: 'feed',
      name: Setting.shareInfo.title,
      title: Setting.shareInfo.title,
      link: Setting.shareInfo.link,
      caption: Setting.shareInfo.caption,
      description: Setting.shareInfo.description,
      display: 'iframe',
      picture: 'http://www.thesecretfarm.com/cheerup/result/' + resJson.filename + '.jpg', // 'http://www.thesecretfarm.com/creativegift/star_55652e81082027.jpg'//'http://gth.co.th/startheque/result/'+res.filename+'.jpg',//'http://www.thesecretfarm.com/creativegift/star_55652e81082027.jpg'//
    } as any;
    return new Promise<any>((fulfill, reject) => {
      FB.ui(uiParams, function (response: any): void {
        fulfill(response);
      });
    });
  }
};

export const shareToFB = (canvas: HTMLCanvasElement) => async (dispatch) => {
    dispatch(AppActions.showLoading());
    const shareResult = await uploadToServer(canvas);
    dispatch(AppActions.hideLoading());
    if ( shareResult.post_id) {
      dispatch(push('/home'));
      alert('แชร์ไปที่ไทม์ไลน์แล้ว');
    } else {

    }

  };

