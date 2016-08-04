import * as ResultActions from '../src/actions/result.actions';
import { IFBUserInfo } from '../src/actions/auth.actions';
import Assets from '../src/assets';


const result = document.createElement('div');
result.id = 'result';
document.getElementById('mocha').appendChild(result);

describe('Result Actions', () => {
  it('Should able to draw result correctly', (done) => {
    const UserInfo: IFBUserInfo = { id: '1035661829797688', name: 'Tester Naja', email: 'tester@test.com' };
    Assets.messageList.map((msg, index) => {
      Assets.athleleList.map(item => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        result.appendChild(canvas);
        const getState = () => {
          return {
            result: {
              athele: item,
              message: msg,
              messageIndex: index,
            },
            auth: {
              userInfo: UserInfo,
              profilePictureURL: `https://graph.facebook.com/1035661829797688/picture?type=large&width=720&height=720`,
            },
          };
        };


        // init thunk action
        const thunk = ResultActions.drawResult(canvas);
        thunk((action) => { console.log('Dispatch action' + action.type); }, getState);
        canvas.style.width = '300px';
        canvas.style.height = 'auto';
        canvas.style.margin = '10px 10px';
      });
    });
    done();
  });
});
