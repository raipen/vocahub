import createWordbook from '../assets/createWordbook.gif';
import edit from '../assets/edit.png';
import study from '../assets/study.gif';
import test from '../assets/test.gif';

export const enum ContentsType {
  LINK = 0,
  TEXT = 1,
  IMAGE = 2,
  BUTTON = 3,
}
export const pageList = [
  {
    background: 'linear-gradient(180deg, #f8f9fa 0%, #FFD6E0 100%)',
    title: '가장 효율적인 영단어 암기 서비스',
    contents: [
      { type: ContentsType.TEXT, text: '"토익독학 길잡이"님의 단어 암기 노하우를 Voca Hub로 사용해보세요.\n'+
        '단어를 자주 보는것만으로 단어를 보고 바로 떠올리는 능력을 키울 수 있습니다.\n'+
        '단어장을 만들고, 단어를 외우고, 테스트를 통해 단어를 확인하세요.\n'+ 
        '뜻을 가려두고 단어의 뜻이 떠오르지 않을 때마다 체크를 추가하고 다시 외워보세요.' },
      { type: ContentsType.LINK, src: 'https://www.youtube.com/watch?v=HD79q6aXjPA',text: '"토익독학 길잡이"님의 영단어 암기법 영상 보러가기' },
      { type: ContentsType.BUTTON, text: '시작하기', link: '/mywordbook' },
    ]
  },{
    background: "#FFD6E0",
    title: '단어장 만들기',
    contents: [
      { type: ContentsType.TEXT, text: '"내 단어장"에서 단어장을 만들어 보세요.\n'+
        '단어장은 "Day1", "Day2"처럼 암기하려는 책의 목차도 좋고, "Day 1-1회독"과 같이 암기 횟수를 표시해도 좋습니다.\n'+
        '매일 새로운 단어장을 만들고 단어를 외워보세요. 프로필에 공부한 날이 기록됩니다.' },
      { type: ContentsType.IMAGE, src: createWordbook },
    ]
  },{
    background: '#eedcff',
    title: '단어 추가하기',
    contents: [
      { type: ContentsType.TEXT, text: '단어장을 만들었다면 단어를 추가해보세요.\n'+
        '영단어와 뜻을 입력해보세요. 여러개의 뜻을 입력할 수 있지만, 비슷한 뜻은 한 칸에 ,(쉼표)로 구분해서 입력할 수도 있습니다.\n'+
        'tab키를 사용하여 더 빠르게 입력할 수 있습니다.' },
      { type: ContentsType.IMAGE, src: edit },
    ]
  },{
    background: '#d1ecff',
    title: '단어 암기하기',
    contents: [
      { type: ContentsType.TEXT, text: '단어장을 만들고 단어를 추가했다면, 단어를 외워보세요.\n'+
        '뜻을 모두 켜두고 단어를 외운 후, 뜻을 가려두고 단어의 뜻을 떠올려 보세요.\n'+
        '단어의 뜻이 떠오르지 않을 때마다 체크를 추가하고 체크한 단어들만 다시 외우는 과정을 반복해보세요.' },
      { type: ContentsType.IMAGE, src: study },
    ]
  },{
    background: '#ccfdde',
    title: '테스트',
    contents: [
      { type: ContentsType.TEXT, text: '여러번 체크한 단어들을 다 외웠다면, 테스트를 통해 전체 단어들을 확인해보세요.\n'+
        '단어를 보고 뜻을 맞추는 테스트로 당연히 뜻의 순서는 상관 없습니다.\n'+
        '뜻이 여러개인 단어는 뜻을 모두 맞추어야 통과됩니다.' },
      { type: ContentsType.IMAGE, src: test },
    ]
  },{
    background: 'linear-gradient(180deg, #ffc5d2 0%, #f8f9fa 100%)',
    title: 'Voca Hub 시작하기',
    contents: [
      { type: ContentsType.TEXT, text: '이제 Voca Hub를 시작해보세요.\n'+
        '단어장을 만들고, 단어를 추가하고, 단어를 외우고, 테스트를 통해 단어를 확인하세요.\n'+
        '단어를 외우는 방법은 다양합니다. 단어와 뜻을 소리내서 읽어보기, 단어 쓰기, 예문 찾아보기 등등 여러가지 방법을 사용해 단어를 외우고 Voca Hub을 통해 단어가 바로 떠오르는지 확인해보세요.' },
      { type: ContentsType.BUTTON, text: 'VOCA HUB 시작하기', link: '/mywordbook' },
    ]
  },
] as {
  background: string;
  title: string;
  contents: { type: ContentsType; text?: string; src?: string; link?: string }[];
}[];
