# 키워드로 공유하는 회의 노트 knock

## 서비스 개요

회의를 할 때, 키워드를 간단하게 적어가면서 회의 내용을 정리하곤 하는데, 노트에 적어두기에는 정리하는 것에 한계가 있기 때문에, 키워드만 간단하게 입력할 수 있는 문서 공유 서비스를 기획하였습니다.

## 서비스 고려사항

- Problem

1. 키워드를 input 하고 submit 하면, 새로운 페이지를 rendering 하는 것이 아니라, 현재 페이지에서 입력한 키워드를 바로 볼 수 있게 해야한다. django는 form을 제출할 경우, 변경사항을 반영하기 위하여 우선 queryset을 불러오고 html을 재랜더링 해야한다.

2. 키워드를 submit해서 페이지에 반영이 되었다면, 작성한 유저와 동일한 페이지에 머물고 있는 다른 유저 또한 변경사항을 reload 없이 조회 가능해야 한다.

- Solve

1. 키워드를 제출함과 동시에, js로 keyword와 관련한 element를 insert한다. 제출한 키워드는 REST API를 request하여 db에 저장한다.

2. WebSocket을 사용한다.

## 주요 성과

서비스 고려사항의 1번 방식을 활용하고자 하니 django에서 template의 활용도가 떨어지는 점을 발견할 수 있었다. 따라서 template의 사용도를 최소화 하다보니 자연스럽게 하나의 index.html만 두고 js로 element를 insert하는 방식으로 구현하게 되었다. React를 해보진 않았지만 해당 방식과 가장 유사한 것이 SPA라는 것을 확인하였고, static file에서 js Component를 만들어 app.js에서 render하도록 하는 구조를 만들어 보았다. React 소스코드를 직접 보면서 React의 개념을 간접적으로 파악할 수 있었다는 점이 좋았다.
