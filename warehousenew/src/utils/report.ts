/**
 * 递归循环播放音频-解决重叠播放问题
 * @param arrAudio-多个audio
 */
const diffPlay = (arrAudio:Array<any>,playNum:number) => {
  if(playNum>=arrAudio.length) return;
  arrAudio[playNum].play();
  arrAudio[playNum].addEventListener('ended', function() {
  let  addplayNum = playNum+1;
   diffPlay(arrAudio,addplayNum)
}, false);
}

/**
 * 语音播报
 * @param str
 */
import {AUDIOGROUP} from '@/enum.config'
export function reportText(str: string) {
  const url =
    'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + encodeURI(str);
  const sound = new Audio(url);
  sound.play();
}


/**
 * 本地音频播报
 * @param str
 */
export function reportLocalAudio(arr: Array<string>) {
  const arrAudio:Array<any> = [];
  arr.forEach((item:string)=>{
    const url = AUDIOGROUP.key(item)?.audio;
    let sound;
    if(url){
      sound = new Audio(url);
    }else{
      const newUrl =
      'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + encodeURI(item);
       sound = new Audio(newUrl);
    }
    arrAudio.push(sound)
  })
    diffPlay(arrAudio,0)
}