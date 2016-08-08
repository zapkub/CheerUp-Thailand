import * as ReduxActions from 'redux-actions';
import { AtheleObject } from '../components/AtheleList';
import * as AuthActions from '../actions/auth.actions';
import * as AppActions from './app.actions';


async function loadImageURL (url: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>(function(resolve, reject): void {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function(): void {
      resolve(image);
    };
    image.onerror = function(e): void {
      reject(e);
    };
    image.src = url;
  });
}

export const SET_CURRENT_ATHELE = 'SET_CURRENT_ATHELE';
export const SET_CURRENT_MESSAGE = 'SET_CURRENT_MESSAGE';
export const MESSAGE_MOVE_DOWN = 'MESSAGE_MOVE_DOWN';
export const MESSAGE_MOVE_UP = 'MESSAGE_MOVE_UP';

export const setAtheleIndex = ReduxActions.createAction<AtheleObject, AtheleObject>(SET_CURRENT_ATHELE);
export const setMessageIndex = ReduxActions.createAction<number, number>(SET_CURRENT_MESSAGE);

const drawUserInfo = (image: HTMLImageElement, positionX: number, positionY: number, UserInfo: AuthActions.IFBUserInfo, context: CanvasRenderingContext2D) => {
  context.save();
  // init constant
  const PictureSize = { w: 80, h: 80};
  const firstname = UserInfo.name.split(' ')[0];
  const middlename = UserInfo.name.split(' ')[1];
  const lastname = UserInfo.name.split(' ')[2];
  const fontSize = 38;
  context.font = fontSize + 'px thaisans_neueregular';
  const firstnameWidth = context.measureText(firstname).width;
  const lastnameWidth = context.measureText(lastname).width;
  const textWidth = (firstnameWidth > lastnameWidth) ? firstnameWidth : lastnameWidth;
  const totalWidth = textWidth + PictureSize.w;
  const offsetX = (positionX + (600 / 2)) - (totalWidth / 2);
  // console.log(textWidth);

  // draw userProfile
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowColor = 'black';
  context.shadowBlur = 20;
  context.fillStyle = 'white';
  context.textBaseline = 'top';
  context.drawImage(image, offsetX, positionY, PictureSize.w, PictureSize.h);
  context.fillText(firstname, offsetX + PictureSize.w + 20, positionY);
  context.fillText(middlename + ' ' + (lastname || ''), offsetX + PictureSize.w + 20, positionY + (fontSize + 5));
  context.restore();
};

const drawCheerMessage = (message: string, positionX: number, positionY: number, context: CanvasRenderingContext2D) => {
    context.fillStyle = 'white';
    const fontSize = 90;
    const messageWidth = 600;
    context.font = '' + fontSize + 'px thaisans_neueregular';
    let lineNumber = 0;
    if (message !== 'คุณคือ%20“ซุปเปอร์แมน”%20สัญชาติไทย') {
      message = `“ ${message} ”`;
    }
    for ( let line of message.split('%20') ){
      const lineWidth = context.measureText(line);
      context.fillText(line, (positionX + messageWidth / 2) - lineWidth.width / 2 , positionY + ((fontSize + 30) * lineNumber));
      lineNumber ++;
    }
};

export const drawResult = (canvasElement: HTMLCanvasElement) => async (dispatch, getState) => {
  dispatch(AppActions.showLoading());
  // user meta
  const Athele: AtheleObject = getState().result.athele;
  const UserInfo: AuthActions.IFBUserInfo = getState().auth.userInfo;
  const profilePictureURL = getState().auth.profilePictureURL;
  const Message = getState().result.messageIndex;

  // canvas meta
  const canvasSize = {w: 1200 / 2, h: 630 / 2};
  const canvas: HTMLCanvasElement = canvasElement;
  const context = canvas.getContext('2d');
  let textPosition = {x: 60, y: 100};
  let userInfoPosition = {x: 50, y: 80 };
  // postion 
  if (Athele.right) {
    textPosition = {x: 600, y: 140};
    userInfoPosition = {x: 560, y: 130};
  }

  // support retina
  context.scale(2, 2);
  canvas.width = canvasSize.w * 2;
  canvas.height = canvasSize.h * 2;
  // canvas.style.width = canvasSize.w + 'px';
  // canvas.style.height = canvasSize.h + 'px';

  // begin draw
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvasSize.w * 2, canvasSize.h * 2);
  context.fillStyle = 'white';

  try {

  // Draw background
  const bgImage = await loadImageURL(require(`../assets/images/${Athele.sourceURI}`));
  context.drawImage(bgImage, 0, 0);

  // Draw HUD
  // const hudImage = await loadImageURL(require(`../assets/images/hud.png`));
  // context.drawImage(hudImage, 0, 0);

  // Draw Text ( image )
  const cheerMsg = await loadImageURL(require(`../assets/images/msg/${Message + 1}.png`));
  context.drawImage(cheerMsg, textPosition.x, textPosition.y);
  // drawCheerMessage(Message, textPosition.x, textPosition.y, context);

  // UserInfo box
  const profileImage = await loadImageURL(profilePictureURL);
  drawUserInfo(profileImage, userInfoPosition.x, userInfoPosition.y, UserInfo, context);

  // Draw Athele name

  // context.font = '18px foundation-icons, Sukhumvit Set, thaisans_neueregular';
  // const footerText = `Cr.  \uf1c4  ${Athele.name}`;
  // const atheleNameWidth = context.measureText(footerText).width;
  // context.fillText(footerText, canvas.width - atheleNameWidth - 10, canvas.height - 10);
  dispatch(AppActions.hideLoading());


  } catch (e) {
    dispatch(AppActions.hideLoading());
    alert('เกิดความผิดพลาด ลอง Refresh ใหม่นะ' + e.toString());
    // TODO : Manange request exception
  }
};


