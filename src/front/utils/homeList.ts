import study from '../assets/study.png';

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
  },
  {
    background: "#FFD6E0",
    title: 'VOCA HUB를 사용해보세요',
    contents: [
      { type: ContentsType.TEXT, text: 'VOCA HUB는 영어 단어를 외우는 데 필요한 모든 기능을 제공합니다. 영어 단어장을 만들고, 단어를 외우고, 테스트를 통해 단어를 확인하세요.'.repeat(20) },
      { type: ContentsType.IMAGE, src: study },
    ]
  },{
    background: '#ABCDEF',
    title: 'VOCA HUB를 사용해보세요',
    contents: [
      { type: ContentsType.TEXT, text: 'VOCA HUB는 영어 단어를 외우는 데 필요한 모든 기능을 제공합니다. 영어 단어장을 만들고, 단어를 외우고, 테스트를 통해 단어를 확인하세요.'.repeat(20) },
      { type: ContentsType.IMAGE, src: study },
    ]
  },
] as {
  background: string;
  title: string;
  contents: { type: ContentsType; text?: string; src?: string; link?: string }[];
}[];
