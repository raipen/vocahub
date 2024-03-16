export const enum ContentsType {
  LINK = 0,
  TEXT = 1,
  IMAGE = 2,
}
export const pageList = [
  {
    background: 'linear-gradient(180deg, #FFF 0%, #FFD6E0 100%)',
    title: 'VOCA HUB는 가장 효율적인 영단어 암기 서비스입니다',
    contents: [
      { type: ContentsType.LINK, src: 'https://www.youtube.com/embed/HD79q6aXjPA',text: '영상으로 보기' },
      { type: ContentsType.TEXT, src: '단어를 보고 바로 떠올릴 수 있어야합니다'.repeat(20) },
    ]
  },
  {
    background: 'linear-gradient(180deg, #FFF 0%, #FFD6E0 100%)',
    title: 'VOCA HUB를 사용해보세요',
    contents: [
      { type: ContentsType.TEXT, src: 'VOCA HUB는 영어 단어를 외우는 데 필요한 모든 기능을 제공합니다. 영어 단어장을 만들고, 단어를 외우고, 테스트를 통해 단어를 확인하세요.'.repeat(20) },
      { type: ContentsType.IMAGE, src: 'https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/1552aee2f1704b62b7e7628cff0cbc2c/9106f352eb2545a2b2c9f17c646160dc_1620190538.jpg' },
    ]
  },
];
